import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Movie} from "../../models/movie";

/**
 * Generated class for the CineinsiteViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cineinsite-view',
  templateUrl: 'cineinsite-view.html',
})
export class CineinsiteViewPage {
  movie:Movie;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
      this.movie = navParams.get('movie');
  }

  ionViewDidLoad() {

  }

}
