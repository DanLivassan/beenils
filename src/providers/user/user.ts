import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {Params} from "../../utils/params";
import 'rxjs/Rx';



/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user:User;
  private isLogged = false;
  constructor(public http: HttpClient) {

  }

  signUp(user:User){
    let route = Params.baseUrl+'/create';
  }

  delete(user:User){
    let route = Params.baseUrl+'/delete';
  }

  login(email:string, password:string){

    let url =Params.getBaseUrl()+'/access/login';
    this.user=null;
    let headers = new HttpHeaders();
    let form_data:FormData=new FormData();
    form_data.append('email', email);
    form_data.append('password', password);

    return this.http.post(
      url,
      form_data,
      {headers:headers}
    );

  }

  successLogin(){
    this.isLogged = true;
  }

  erroLogin(){
    this.isLogged = false;
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

  setUser(user:User){
    this.user = user;
  }

  getUser():User{
    return this.user;
  }

  refreshPoints(id:number){
    let url =Params.getBaseUrl()+'/v1/user/'+id+'/points';
    return this.http.get(url);
  }

}
