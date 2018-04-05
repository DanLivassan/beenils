import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Publication} from "../../models/publication";
import {UserProvider} from "../../providers/user/user";
import {PublicationProvider} from "../../providers/publication/publication";
import {Params} from "../../utils/params";
import {PublicationReactionProvider} from "../../providers/publication-reaction/publication-reaction";
import {PublicationReaction} from "../../models/publication-reaction";



/**
 * Generated class for the PublicationViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-view',
  templateUrl: 'publication-view.html',
  providers:[PublicationReactionProvider],
})
export class PublicationViewPage {

  publication:Publication;
  publication_reactions:PublicationReaction[]=[];
  is_liked:boolean;

  private front_url = Params.getFrontUrl();
  constructor(
    public navCtrl: NavController,
    private pubProvider:PublicationProvider,
    public navParams: NavParams,
    private userProvider:UserProvider,
    private reactionsProvider:PublicationReactionProvider,
    public events:Events
  ) {
    this.publication = this.navParams.get('publication');
    this.pubProvider.getOnServer(this.publication.id).subscribe((publication)=>{
      this.publication = this.pubProvider.formatResponse(publication);
    });

  }
  ionViewDidLoad() {
    this.refreshReacts();
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

}
