import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  user:User;
  baseUrl:string = 'http://api.beenews.localhost/';
  private isLogged = false;
  constructor(public http: HttpClient) {

  }

  signUp(user:User){
    let route = baseUrl+'/create';
  }

  delete(user:User){
    let route = baseUrl+'/delete';
  }

  login(email:string, password:string):User{

    let route = baseUrl+'/access/login';
    this.user=null;

    let form_data:FormData=new FormData();
    form_data.append('email', email);
    form_data.append('password', password);
    this.http.post(
      route,
      form_data)
      .
    subscribe(
      (data)=>{
        if(data[0]=='logged'){
          this.user = new User(
            data['user']['id'],
            data['user']['name'],
            data['user']['last_name'],
            data['user']['type'],
            data['user']['status'],
          );
          localStorage.setItem('token', data[1]);
          this.isLogged = true;
        }
    });
    return this.user;
  }
  logout(){
    this.isLogged=false;
    this.user=null;
    localStorage.removeItem('token');
  }

  getToken(){
    if(localStorage.getItem('token')!='undefined'){
      return localStorage.getItem('token');
    }
    return false;
  }

  isAuthenticated():boolean{
    return this.isLogged;
  }

}
