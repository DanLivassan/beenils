import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditorialProvider} from "../../providers/editorial/editorial";
import {Editorial} from "../../models/editorial";
import {EditorialPublicationsViewPage} from "../editorial-publications-view/editorial-publications-view";

/**
 * Generated class for the EditorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editorial',
  templateUrl: 'editorial.html',
})
export class EditorialPage {

  private editoriais;
  private new_editorial = new Editorial(0,'');
  private listing = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private edtProvider:EditorialProvider) {
    this.refreshData();
    this.editoriais = edtProvider.getAll();
  }

  changeAction(){
    this.listing=!this.listing;
  }
  ionViewWillLoad(){

  }

  refreshData() {
    this.edtProvider.refreshData();
  }

  addEditorial(){
    this.edtProvider.set(this.new_editorial);
    this.new_editorial = new Editorial(0,"");
    this.listing = true;
    this.refreshData();
  }

  openNews(editorial:Editorial){
    this.navCtrl.push(EditorialPublicationsViewPage,{'editorial':editorial});

  }

}
