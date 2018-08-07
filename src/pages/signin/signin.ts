import { Component, Renderer2 } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Toast, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";
import {Push} from "@ionic-native/push";
import {RecoverPage} from "../recover/recover";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  private loginForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    private userProvider:UserProvider,
    private formBuilder:FormBuilder,
    private toastCtrl:ToastController,
    private renderer: Renderer2,
    private events:Events,
    private push:Push
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
        this.userProvider.extractData(data);
        if(this.userProvider.isAuthenticated()){
          this.presentToast(
            'Bem vindo, '+this.userProvider.getUser().get_full_name(),
            2000,
            'bottom'
          );
          this.userProvider.setCityPreference('Salvador');
          this.events.publish('user:logged',this.userProvider.getUser());
          this.navCtrl.setRoot(HomePage);
        }


      },(error)=>{
        console.error(JSON.stringify(error));
        this.presentToast(
          'Erro, '+error['error']['message'],
          //JSON.stringify(error),
          2000,
          'bottom'
        );

          this.userProvider.erroLogin();

      });
  }

  ionViewDidLoad() {

  }

  ionViewWillLoad(){




  }

  goToRecover(){
    this.navCtrl.push(RecoverPage);
  }


  presentToast(message:string, duration:number, position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.present();
  }

  goToSingUp(){
    this.navCtrl.push(SignupPage);
  }



}
