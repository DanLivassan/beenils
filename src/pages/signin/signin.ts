import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Toast, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {User} from "../../models/user";
import {Address} from "../../models/address";

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

  constructor(
    public navCtrl: NavController,
    private userProvider:UserProvider,
    private formBuilder:FormBuilder,
    private toastCtrl:ToastController
  ) {
    this.loginForm = this.formBuilder.group(
      {
        'email':['',[Validators.email, Validators.required]],
        'password':['',Validators.required]
      }
    );

    this.navCtrl.setRoot(HomePage);
  }
  login(){
    let credentials = this.loginForm.value;
    this.userProvider.login(credentials['email'], credentials['password']).subscribe(
      (data)=>{
        if(data['token']!=='undefined'){
          this.userProvider.setUser(new User(
            data['user']['id'],
            data['user']['name'],
            data['user']['last_name'],
            data['user']['type']['id'],
            data['user']['status']['id'],
          ));
          localStorage.setItem('token', data['token']);
          this.userProvider.successLogin();
          this.presentToast(
            'Bem vindo, '+this.userProvider.getUser().get_full_name(),
            2000,
            'bottom'
            );

          this.navCtrl.goToRoot({});

        }

      },(error)=>{

        this.presentToast(
          'Erro, '+error['error']['message'],
          2000,
          'bottom'
        );
          this.userProvider.erroLogin();

      });
  }

  ionViewDidLoad() {

  }

  presentToast(message:string, duration:number, position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.present();
  }

}
