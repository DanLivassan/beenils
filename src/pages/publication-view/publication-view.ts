import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Publication} from "../../models/publication";
import {UserProvider} from "../../providers/user/user";
import {PublicationProvider} from "../../providers/publication/publication";
import {Params} from "../../utils/params";



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
})
export class PublicationViewPage {

  publication:Publication;
  private front_url = Params.getFrontUrl();
  constructor(public navCtrl: NavController, private pubProvider:PublicationProvider,public navParams: NavParams, private userProvider:UserProvider) {
    this.publication = this.navParams.get('publication');
    this.pubProvider.getOnServer(this.publication.id).subscribe((publication)=>{
      this.publication = this.pubProvider.formatResponse(publication);
    });

  }
  ionViewDidLoad() {

  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }

}
