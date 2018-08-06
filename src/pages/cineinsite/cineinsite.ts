import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {Cine} from "../../models/cine";
import {CineinsiteProvider} from "../../providers/cineinsite/cineinsite";
import {Movie} from "../../models/movie";
import {UserProvider} from "../../providers/user/user";
import {CineinsiteViewPage} from "../cineinsite-view/cineinsite-view";
import {CineSchedulePage} from "../cine-schedule/cine-schedule";
import {CineListPage} from "../cine-list/cine-list";

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

  movies:Array<Movie>=[];
  constructor(
    public navCtrl: NavController,
    public cineProvider:CineinsiteProvider,
    public userProvider:UserProvider
  ) {
  }

  ionViewDidLoad() {
    this.movies =[]
    this.cineProvider.getAll().subscribe((data:Array<any>)=>{
      //data = data['items'];
      console.log(data);
      data.forEach((movie)=>{
        this.movies.push(this.cineProvider.extractData(movie))
      });
    });
  }

  ionViewCanEnter(){
    return this.userProvider.isAuthenticated();
  }
  movieView(movie:Movie){
    this.navCtrl.push(CineinsiteViewPage, {'movie':movie})
  }

  movieSchedule(movie:Movie){
    this.navCtrl.push(CineSchedulePage, {'movie':movie})
  }

  goToCineList(){
    this.navCtrl.push(CineListPage);
  }





}
