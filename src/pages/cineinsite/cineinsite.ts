import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {Cine} from "../../models/cine";
import {CineinsiteProvider} from "../../providers/cineinsite/cineinsite";

/**
 * Generated class for the CineinsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-cineinsite',
  templateUrl: 'cineinsite.html',
})
export class CineinsitePage {

  films:Array<Cine>=[];
  constructor(public navCtrl: NavController, public cineProvider:CineinsiteProvider) {
  }

  ionViewDidLoad() {
    this.films = this.cineProvider.getAll();
  }

}
