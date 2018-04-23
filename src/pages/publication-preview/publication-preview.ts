import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Publication} from "../../models/publication";
import {Params} from "../../utils/params";

/**
 * Generated class for the PublicationPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-publication-preview',
  templateUrl: 'publication-preview.html',
})
export class PublicationPreviewPage {

  publication:Publication;
  front_url = Params.getFrontUrl();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.publication = this.navParams.get('publication');
  }

  ionViewWillLoad() {

  }

}
