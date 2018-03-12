import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  styleUrls:[
   /* '../../assets/styles/style.css',
    '../../assets/styles/framework.css',
    '../../assets/styles/font-awesome.css',*/
  ],
})
export class SigninPage {
  private loginForm:FormGroup;

  constructor(public navCtrl: NavController, private userProvider:UserProvider, private formBuilder:FormBuilder) {
    this.loginForm = this.formBuilder.group(
      {
        'email':['',[Validators.email, Validators.required]],
        'password':['',Validators.required]
      }
    );
  }
  login(){
    let credentials = this.loginForm.value;
    this.userProvider.login(credentials['email'], credentials['password']);
    if(this.userProvider.isAuthenticated()){
      this.navCtrl.push(HomePage);
    }

  }

  ionViewDidLoad() {

  }

}
