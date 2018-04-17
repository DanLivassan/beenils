import {Component, Renderer2} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {User} from "../../models/user";
import {SigninPage} from "../signin/signin";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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
        'password_repeat':['',[Validators.required]],
        'phone_number':['', [Validators.required]],
        'photo':[],
        'about':[],
      });
  }

  ionViewDidLoad() {

  }

  signUp(){
    let formData = this.loginForm.value;
    let u:User = new User(0,formData.name, formData.last_name, 0, 0);
    u.about = formData.about;
    u.email = formData.email;
    u.phone_number = formData.phone_number;
    u.picture = formData.photo;
    let credentials:{password:string, password_repeat:string}={password:formData.password, password_repeat:formData.password_repeat};

    this.userProvider.signUp(u, credentials).subscribe((resp)=>{
      this.presentToast(
        "Vá até a sua caixa de entrada ("+u.email+") para ativar sua conta",
        4000,
        'bottom'
      );
    });
    this.navCtrl.setRoot(SigninPage);

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
