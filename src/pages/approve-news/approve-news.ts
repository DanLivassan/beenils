import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {PublicationProvider} from "../../providers/publication/publication";
import {Publication} from "../../models/publication";
import {UserProvider} from "../../providers/user/user";
import {Editorial} from "../../models/editorial";
import {Params} from "../../utils/params";
import {PublicationViewPage} from "../publication-view/publication-view";
import {isArray} from "rxjs/util/isArray";
import {Functions} from "../../utils/functions";
import {PublicationPreviewPage} from "../publication-preview/publication-preview";

/**
 * Generated class for the ApproveNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-approve-news',
  templateUrl: 'approve-news.html',
})
export class ApproveNewsPage {
  private baseUrl = Params.getFrontUrl();
  private unapproved_news=[];
  private user_points;
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
    this.refreshNews();

  }

  refreshNews(){
    let unapproved_news = [];
    this.pubProvider.getPendingNews('5').subscribe((pubs:Array<any>)=>{
      if(isArray(pubs)){
        pubs.forEach((pub)=>{
          unapproved_news.push(this.pubProvider.formatResponse(pub));
        });
      }
    });
    this.unapproved_news = unapproved_news;


    this.user_points = Functions.formatPoints(this.userProvider.getUser().points);
  }

  publicationView(publication:Publication){

    if(publication != null){
      this.navCtrl.push(PublicationPreviewPage, {'publication':publication});
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

  approvePublication(publicationId:number){
    this.pubProvider.approvePublication(publicationId).subscribe((msg)=>{
      this.refreshNews();
      this.presentToast("Publicação aprovada",3000, "bottom");
    },
      (error)=>{
        this.presentToast("Publicação não aprovada",3000, "bottom");
        console.error(error);
      });
  }

}
