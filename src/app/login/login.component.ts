import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import bcrypt from 'bcryptjs'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie';
import { DbserviceService } from '../dbservice.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private dbService:DbserviceService, private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    this.initForm()
    //check loggedin
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
              this.userAuthService.setIsLoggedIn(true)
              const cookie = new Cookies()
              cookie.set('tcsangular-name', username, { path: '/'});
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
