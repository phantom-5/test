import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate {
  isLoggedIn = false
  
  constructor(private router: Router) { }

  setIsLoggedIn(val: boolean){
    this.isLoggedIn = val
  }

  canActivate(){
    if (this.isLoggedIn){
      return true
    }else{
      this.router.navigate(['/'])
      return false
    }
  }
}
