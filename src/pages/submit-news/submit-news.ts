import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Functions} from "../../utils/functions";
import {isArray} from "rxjs/util/isArray";
import {PublicationViewPage} from "../publication-view/publication-view";
import {Editorial} from "../../models/editorial";
import {Params} from "../../utils/params";
import {PublicationProvider} from "../../providers/publication/publication";
import {UserProvider} from "../../providers/user/user";

/**
 * Generated class for the SubmitNewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-submit-news',
  templateUrl: 'submit-news.html',
})
export class SubmitNewsPage {

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
    return this.userProvider.getUser().is('jornalista');
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

  submitPublication(publicationId:number){
    this.pubProvider.submitPublication(publicationId).subscribe((msg)=>{
        this.presentToast('Publicação submetida para o editor',3000,'bottom');
        this.refreshNews();
      },
      (error)=>{
        this.presentToast('Erro. Publicação não submetida',3000,'bottom');
      });
  }

}
