import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {CommentaryProvider} from "../../providers/commentary/commentary";
import {Commentary} from "../../models/commentary";
import * as moment from "moment";
import "moment-timezone";
import {Params} from "../../utils/params";
import {PublicationViewPage} from "../publication-view/publication-view";
import {PublicationProvider} from "../../providers/publication/publication";

/**
 * Generated class for the ApproveCommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-approve-comments',
  templateUrl: 'approve-comments.html',
})
export class ApproveCommentsPage {

  private baseUrl = Params.getFrontUrl();
  private comments:Commentary[]=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider:UserProvider,
    private commentsProvider:CommentaryProvider,
    private pubProvider:PublicationProvider,
    private toastCtrl:ToastController
  ) {
  }

  ionViewCanEnter() {
    return this.userProvider.getUser().is('editor') ||this.userProvider.getUser().is('moderador');
  }

  ionViewWillLoad(){
  this.refreshData();
  }

  refreshData(){
    this.comments=[];
    this.commentsProvider.getPendingComments().subscribe((data:any)=>{
      data.forEach((comment)=>{
        this.comments.push(new Commentary(
          comment.id,
          this.userProvider.formatUser(comment.commented_by),
          comment.publication,
          comment.commentary,
          moment(comment.commented_at).tz('America/Sao_paulo').format()
        ));
      });
    });
  }

  publicationView(id:number){
    if(id != null){
      this.pubProvider.get(id).subscribe((pub)=>{
        let publication = this.pubProvider.formatResponse(pub);
        this.navCtrl.push(PublicationViewPage, {'publication':publication});
      });
    }
    else{
      this.presentToast("Notícia não encontrada", 3000, 'top');
    }
  }

  approveComment(comment:Commentary){
    this.commentsProvider.approveComment(comment.id, comment.publication_id).subscribe(
      (data)=>{
        console.log(data);
        this.presentToast('Comentário Aprovado!', 3000, 'bottom');
        this.refreshData();
      },
      (err)=>{
        console.error(err);
        this.presentToast('Erro ao tentar aprovar!', 3000, 'bottom');
        this.refreshData();
      }
    )
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
