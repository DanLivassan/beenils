import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Firebase} from "@ionic-native/firebase";
import { Platform } from 'ionic-angular';
import {Http} from "@angular/http";
import {Params} from "../../utils/params";
import {UserProvider} from "../user/user";



/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  public firebase_token:string='';

  constructor(
    public http: HttpClient,
    public firebase:Firebase,
    private platform: Platform,
    private userProvider:UserProvider
  ) {

  }

  // Get permission from the user
  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken()
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }

    return this.sendTokenToBack(token)
  }

  // Save the token to firestore
  private sendTokenToBack(token) {
    if (!token) return;

    if(this.userProvider.isAuthenticated()){
      let url = Params.getBaseUrl()+'/v1/user/add-fcm-token';
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.userProvider.getToken(),
      });
      let form_data:FormData=new FormData();
      form_data.append('fcm_token',token);
      this.http.post(url,form_data,{headers:headers}).subscribe((response)=>{
        console.log(response);
        return token;
      });
    }


  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebase.onNotificationOpen();
  }
  refreshToken(){
    this.firebase.onTokenRefresh().subscribe((token)=>{
      this.firebase_token = token;
      this.getToken()
    });
  }

}
