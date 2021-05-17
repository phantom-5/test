import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Cookies from 'universal-cookie'

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate {
  isLoggedIn = false
  currentUsername = ''
  
  constructor(private router: Router) { }

  setIsLoggedIn(val: boolean){
    this.isLoggedIn = val
  }
  setCurrentUser(val: string){
    this.currentUsername=val
  }

  canActivate(){
    const cookie = new Cookies()
    if (this.isLoggedIn || cookie.get('tcsangular')){
      console.log(cookie.get('tcsangular'))
      var exprDate = new Date(new Date().getTime()+(10*60*1000));
      cookie.set('tcsangular', true, { path: '/',expires:exprDate });
      return true
    }else{
      this.router.navigate(['/'])
      return false
    }
  }
}
