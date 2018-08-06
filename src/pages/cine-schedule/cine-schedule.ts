import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Movie} from "../../models/movie";
import {CineinsiteProvider} from "../../providers/cineinsite/cineinsite";
import {CineSchedule} from "../../models/cine-schedule";
import {CineRoom} from "../../models/cine-room";

/**
 * Generated class for the CineSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cine-schedule',
  templateUrl: 'cine-schedule.html',
})
export class CineSchedulePage {

  movie:Movie;
  rooms:Array<{room:CineRoom, schedules:Array<CineSchedule>}>
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cineProvider:CineinsiteProvider
  ) {
    this.movie = this.navParams.get('movie')
  }


  ionViewDidLoad() {
    this.cineProvider.getMovieSchedule(this.movie.id).subscribe((data:Array<any>)=>{
      data.forEach(d=>{
        console.log(d);
        this.rooms = this.cineProvider.extractScheduleData(d);
      });

    });
  }

}
