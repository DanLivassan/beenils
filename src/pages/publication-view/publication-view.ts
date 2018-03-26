import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Publication} from "../../models/publication";

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.publication = this.navParams.get('publication');

  }
  ionViewDidLoad() {

  }

}
