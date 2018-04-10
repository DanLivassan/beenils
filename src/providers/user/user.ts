import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User} from "../../models/user";
import {Params} from "../../utils/params";
import 'rxjs/Rx';
import {Editorial} from "../../models/editorial";
import {Events} from "ionic-angular";
import {Address} from "../../models/address";



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
      if(typeof this.user==='undefined'){
        this.restoreLocalUser(localStorage.getItem('user'));
      }
      return true;
    }
    return false;

    //return this.isLogged;
  }

  setUser(user:User){
    this.user = user;
    let string_user = {
      id:user.id,
      name:user.name,
      last_name:user.last_name,
      type:user.type,
      status:user.status,
      points:user.points,
      picture:user.picture,
      address:user.address,
      about:user.about,
      email:user.email,
      editorials:user.editorials,
    };
    localStorage.setItem('user', JSON.stringify(string_user));
  }

  getUser():User{
    return this.user;
  }

  refreshPoints(id:number){
    let url =Params.getBaseUrl()+'/v1/user/'+id+'/points';
    return this.http.get(url);
  }

  restoreLocalUser(user:string):User{
    try{

      let u = JSON.parse(user);
      this.user = new User(u.id,u.name,u.last_name,u.type, u.status);
      this.user.points = u.points;

      if(typeof u.editorials !== 'undefined'){
        u.editorials.forEach((edt)=>{
          this.user.setEditorial(new Editorial(edt._id, edt._name));
        });
      }
      this.user.address = new Address(u.address._id, u.address._city, u.address._state);
      this.user.picture = u.picture;
      this.user.about = u.about;
      this.user.email = u.email;
      this.events.publish('user:logged',this.user);
    }
    catch(e){
      console.error(e);
      return null;
    }
  }


  formatUser(u:any):User{
    let user:User;
    try{
      user = new User(u.id, u.name, u.last_name, u.type.id, u.status.id);
      user.points = u.points;
      user.picture = u.picture;
      return user;
    }
    catch (e){
      console.error(e);
    }
    return null;
  }
}
