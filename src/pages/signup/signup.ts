import {Component, Renderer2} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private loginForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider:UserProvider,
    private formBuilder:FormBuilder,
    private toastCtrl:ToastController,
    private events:Events
  ) {
      this.loginForm = this.formBuilder.group(
      {
        'email':['',[Validators.email, Validators.required]],
        'name':['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        'last_name':['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        'password':['',[Validators.required, Validators.minLength(5)]],
        'password_repeat':['',[Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signUp(){
    console.log(this.loginForm.value);
  }

}
