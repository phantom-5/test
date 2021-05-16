import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private http:HttpClient) { }

  getUsers(): Observable<Object>{
    return this.http.get('https://angulartcs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json')
  }
  postUsers(username: string, hashedPass: string): Observable<Object>{
    return this.http.post('https://angulartcs-default-rtdb.asia-southeast1.firebasedatabase.app/users.json',{
              username,
              password: hashedPass
            })
  }
  getUserData(username: string): Observable<Object>{
    return this.http.get('https://angulartcs-default-rtdb.asia-southeast1.firebasedatabase.app/'+username+'.json')
  }
  postUserData(username: string, studentDetails: any ): Observable<Object>{
    return this.http.post('https://angulartcs-default-rtdb.asia-southeast1.firebasedatabase.app/'+username+'.json',{username:studentDetails})
  }
}
