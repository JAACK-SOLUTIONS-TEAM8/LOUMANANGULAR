import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean=false;
  user:string=null;

  isLoggedInSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(this.isLoggedIn);
  isLoggedIn$:Observable<boolean>=this.isLoggedInSubject.asObservable();

  userSubject:BehaviorSubject<string>=new BehaviorSubject<string>(this.user);
  user$:Observable<string>=this.userSubject.asObservable();

  constructor(
    private dataService:DataService
  ) { }

  login(userData:any) {
    debugger
    return this.dataService.genericCaller("post", "Auth/Login", userData);
  }

  logout(userId:number) {
    debugger
    return this.dataService.genericCaller("get", "Auth/Logout/"+userId, "");
  }

  verify(data:any) {
    debugger
    return this.dataService.genericCaller("post", "Auth/VerifyCode", data);
  }

  resetPasswordInitial(userData: any) {
    debugger
    return this.dataService.genericCaller("post", "Auth/ResetPassword", userData);
  }

  forgetPassword(email: string) {
    debugger
    return this.dataService.genericCaller("get", `Auth/${email}`, "");
  }

}
