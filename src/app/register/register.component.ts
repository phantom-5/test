import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import bcrypt from 'bcryptjs'
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';
import { UserAuthService } from '../user-auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  userExists: boolean

  constructor(private router: Router, private route: ActivatedRoute, private dbService:DbserviceService, private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    let username = ''
    let password = ''
    let rePassword = ''
    this.registerForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,Validators.required),
      'rePassword': new FormControl(null,Validators.required)
    })
  }

  async formSubmit(){
    this.userExists = false
    let username = this.registerForm.value['username']
    let password = this.registerForm.value['password']
    let rePassword = this.registerForm.value['rePassword']
    console.log(username+" "+password,rePassword)
    if (password === rePassword){
      
      //hash pass
      const SALT = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(password, SALT)
      console.log('hashed pass is: ',hashedPass)
      //check if user already exists
      this.dbService.getUsers().subscribe(
        responseData=>{
          for(var key in responseData){
            let user = responseData[key]
            if (user.username===username){
              console.log('usernames matched')
              this.userExists=true
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Username already exists',
              })
              break
            }
          }
           //register user
          if(!this.userExists){
            this.dbService.postUsers(username,hashedPass).subscribe(responseData => {
              console.log('response of regsitration POST',responseData)
              this.userAuthService.setIsLoggedIn(true)
              this.router.navigate(['/dashboard',username],{relativeTo: this.route})
            })
            Swal.fire({
              icon: 'success',
              title: 'Hi!',
              text: 'Registration successful',
            })
          }
        }
      )
      console.log(this.userExists)
     
     
        
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Passwords don\'t match',
      })
    }
  }

}
