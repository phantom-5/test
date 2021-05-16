import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private dbService:DbserviceService) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    let username = ""
    let password = ""

    this.loginForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required)
    })
  }

  formSubmit(){
    let username = this.loginForm.value['username']
    let password = this.loginForm.value['password']
    this.dbService.getUsers().subscribe(
      async responseData => {
        let noUser = true
        for (var key in responseData){
          let user = responseData[key]
          if (user.username===username){
            noUser = false
            const validPass = await bcrypt.compare(password,user.password)
            if(validPass){
              this.router.navigate(['/dashboard',username],{relativeTo: this.route})
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Username or Password is wrong',
              })
            }
          }
        }
        if(noUser){
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Username or Password is wrong',
          })
        }
      }
    )
  }

}
