import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CineinsiteMovietheatersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cineinsite-movietheaters',
  templateUrl: 'cineinsite-movietheaters.html',
})
export class CineinsiteMovietheatersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CineinsiteMovietheatersPage');
  }

}
