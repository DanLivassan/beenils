import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Publication} from "../../models/publication";
import {UserProvider} from "../../providers/user/user";
import {PublicationProvider} from "../../providers/publication/publication";
import {Params} from "../../utils/params";
import {PublicationReactionProvider} from "../../providers/publication-reaction/publication-reaction";
import {PublicationReaction} from "../../models/publication-reaction";
import {CommentaryProvider} from "../../providers/commentary/commentary";
import {Commentary} from "../../models/commentary";
import {SocialSharing} from "@ionic-native/social-sharing";



/**
 * Generated class for the PublicationViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-publication-view',
  templateUrl: 'publication-view.html',
  providers:[PublicationReactionProvider, CommentaryProvider],
})
export class PublicationViewPage {

  publication:Publication;
  publication_reactions:PublicationReaction[]=[];
  new_comment:string='';
  publication_comments:Commentary[]=[];

  is_liked:boolean;

  private front_url = Params.getFrontUrl();
  constructor(
    public navCtrl: NavController,
    private pubProvider:PublicationProvider,
    public navParams: NavParams,
    private userProvider:UserProvider,
    private reactionsProvider:PublicationReactionProvider,
    private commentsProvider:CommentaryProvider,
    public events:Events,
    public toastCtrl:ToastController,
    public socialSharing:SocialSharing,
  ) {
    this.publication = this.navParams.get('publication');
    this.pubProvider.getOnServer(this.publication.id).subscribe((publication)=>{
      this.publication = this.pubProvider.formatResponse(publication);
    });

  }
  ionViewDidLoad() {
    this.refreshReacts();
    this.refreshComments();
  }

  refreshReacts(){
    this.reactionsProvider.refreshData(this.publication.id).subscribe(
      (data)=>{
        this.publication_reactions = this.reactionsProvider.extractData(data);
        this.is_liked = this.reactionsProvider.isLiked(this.userProvider.getUser().id);
      },
      this.reactionsProvider.handleError
    );
  }

  refreshComments(){
    this.commentsProvider.refreshPublicationData(this.publication.id).subscribe(
      (data:Array<any>)=>{
        this.commentsProvider.extractData(data);
      },
      this.commentsProvider.handleError
    );
    this.publication_comments = this.commentsProvider.getAll();
  }
  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }

  performLike(){
    this.reactionsProvider.performLike(this.publication.id).subscribe((data)=>{
      this.refreshReacts();
      this.events.publish('user:refresh_points', this.userProvider.getUser());
    },
      this.reactionsProvider.handleError);
  }

  performComment(){
    this.commentsProvider.performComment(this.publication.id, this.new_comment).subscribe(
      (data)=>{
        if(data[0]=='saved'){
          this.refreshComments();
          this.presentToast("Comentário Salvo", 2000, 'bottom');
          this.new_comment='';
        }
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  presentToast(message:string, duration:number, position:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });

    toast.present();
  }

  shareFacebook(){
    this.socialSharing.shareViaFacebook(
      "shareViaFacebook",
      this.publication.cover_image,
      this.pubProvider.getUrl(this.publication.id)
    );
  }

  shareWhatsApp(){

    this.socialSharing.shareViaWhatsApp(
      'shareViaWhatsApp',
      this.publication.cover_image,
      this.pubProvider.getUrl(this.publication.id)
    );
  }

  shareTwitter(){
    this.socialSharing.shareViaTwitter(
      'shareViaTwitter',
      this.publication.cover_image,
      this.pubProvider.getUrl(this.publication.id)
    );
  }

  shareInstagram(){
    this.socialSharing.shareViaInstagram(
      'shareViaInstagram',
      this.publication.cover_image
    );
  }

  share(){
    this.socialSharing.share(
      'share',
      this.publication.title,
      null,
      this.pubProvider.getUrl(this.publication.id
      ));
  }

}
