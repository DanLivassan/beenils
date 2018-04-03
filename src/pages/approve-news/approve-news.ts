import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PublicationProvider} from "../../providers/publication/publication";
import {Publication} from "../../models/publication";
import {UserProvider} from "../../providers/user/user";
import {Editorial} from "../../models/editorial";
import {Params} from "../../utils/params";
import {PublicationViewPage} from "../publication-view/publication-view";

/**
 * Generated class for the ApproveNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approve-news',
  templateUrl: 'approve-news.html',
})
export class ApproveNewsPage {
  private baseUrl = Params.getFrontUrl();
  private unapproved_news=[];
  editorials:Editorial[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pubProvider:PublicationProvider,
    public userProvider:UserProvider,
    public toastCtrl:ToastController
  ) {
  }

  ionViewCanEnter(){
    return this.userProvider.getUser().is('editor');
  }
  ionViewWillLoad(){
    this.editorials= this.userProvider.getUser().editorials;

    this.editorials.forEach((edt)=>{
      let unapproved_news = [];
      this.pubProvider.getPendingNews(edt.id.toString()).subscribe((pubs:Array<any>)=>{
        pubs.forEach((pub)=>{
          unapproved_news.push(this.pubProvider.formatResponse(pub));
        });

      });
      this.unapproved_news.push({editorial:edt, publications:unapproved_news});
    });
  }

  publicationView(id:number){
    let publication = this.pubProvider.get(id);
    if(publication != null){
      this.navCtrl.push(PublicationViewPage, {'publication':publication});
    }
    else{
      this.presentToast("Notícia não encontrada", 3000, 'top');
    }
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
