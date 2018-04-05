import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {Params} from "../../utils/params";
import 'rxjs/Rx';
import {Editorial} from "../../models/editorial";
import {Events} from "ionic-angular";



/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  user:User;
  private isLogged = false;
  constructor(public http: HttpClient, public events:Events) {

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
    localStorage.removeItem('user');
  }

  getToken(){
    if(localStorage.getItem('token')!='undefined'){
      return localStorage.getItem('token');
    }
    return false;
  }

  isAuthenticated():boolean{
    if(localStorage.getItem('user')!=null && localStorage.getItem('token')!=null){
      //this.user = JSON.parse(localStorage.getItem('user'));
      this.formatLocalUser(localStorage.getItem('user'));
      return true;
    }
    return false;

    //return this.isLogged;
  }

  setUser(user:User){
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser():User{
    return this.user;
  }

  refreshPoints(id:number){
    let url =Params.getBaseUrl()+'/v1/user/'+id+'/points';
    return this.http.get(url);
  }

  formatLocalUser(user:string):User{
    try{
      let u = JSON.parse(user);
      let recover_user = new User(u._id,u._name,u._last_name,u._type, u._status);
      recover_user.points = u._points;
      /*recover_user.editorials = u._editorials.forEach((edt)=>{
        return new Editorial(edt._id, edt._name);
      });*/
      recover_user.picture = u._picture;
      this.user = recover_user;
      this.events.publish('user:logged',this.user);
    }
    catch(e){
      console.log(e);
      return null;
    }
  }

}
