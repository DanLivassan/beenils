import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Cine} from "../../models/cine";
import {CineinsiteProvider} from "../../providers/cineinsite/cineinsite";


@Component({
  selector: 'page-cine-list',
  templateUrl: 'cine-list.html',
})
export class CineListPage {

  cines:Cine[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cineProvider:CineinsiteProvider
  ) {
      this.cineProvider.getAllCines().subscribe((data)=>{
        this.cines = this.cineProvider.extractDataCine(data['items']);
      });

  }

  ionViewDidLoad() {

  }

}
