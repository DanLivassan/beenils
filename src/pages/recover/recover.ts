import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the RecoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recover',
  templateUrl: 'recover.html',
})
export class RecoverPage {

  recoverForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder:FormBuilder,
    private userProvider:UserProvider,
    private toastCtrl:ToastController
  ) {
    this.recoverForm = this.formBuilder.group(
      {
        'email':['',[Validators.email, Validators.required]],
      });
  }

  ionViewDidLoad() {

  }

  recover(){
    let data = this.recoverForm.value;
    this.userProvider.recoverPassword(data['email']).subscribe((data)=>{
      this.presentToast("Siga as instruções em seu email para recuperar a senha", 3000, "BOTTOM")
    });
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
