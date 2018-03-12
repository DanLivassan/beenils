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
  public isLogged = false;
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  login(email:string, password:string){
    let route = '/access/login';
    let form_data:FormData=new FormData();
    form_data.append('email', email);
    form_data.append('password', password);
    this.http.post(
      'http://api.beenews.localhost/access/login',
      form_data)
      .
    subscribe(
      (data)=>{
        if(data[0]=='logged'){
          this.user = new User(1,"Danilo", "Santana",100,1);
          //TODO retornar dados do usuário quando logar
          localStorage.setItem('token', data[1]);
          this.isLogged = true;
        }
    });
  }
  logout(){
    this.isLogged=false;
    localStorage.removeItem('token');
  }

  getToken(){
    if(localStorage.getItem('token')!='undefined'){
      return localStorage.getItem('token');
    }
    return false;
  }

}
