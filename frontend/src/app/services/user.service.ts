import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject(<User>(this.getUserFromLocalStorage()));
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService: ToastrService, private router: Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Loggin Successful'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'LoginFailed');
        }
      })
    )
  }

  register(userRegister:IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          //notify all observables
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Registered Successfully'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'RegisterFailed');
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User);
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/login');
    window.location.reload;
  }

  private setUserToLocalStorage(user:User):void {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
