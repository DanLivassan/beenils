import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {User} from "../../models/user";
import {isArray} from "rxjs/util/isArray";
import {UserProvider} from "../../providers/user/user";
import {Params} from "../../utils/params"

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('city_select') city_select: Select;
  user:User;
  icons:Array<string>;
  reactions:Array<any>;
  citys = ['Salvador'];
  my_city = localStorage.getItem('city');
  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider:UserProvider) {
    this.user = this.navParams.get('user');
    this.icons = [
      'fa fa-thumbs-up',
      'fa fa-heart',
      'fa fa-comment',
      'fa fa-comment',
      'fa fa-share-alt',
    ];


  }

  ionViewDidLoad() {

    this.userProvider.pointsHistory(this.userProvider.getToken()).subscribe((data:Array<any>)=>{
      this.reactions = [];
      data.forEach((reaction, index)=>{

        this.reactions.push({icon:this.icons[index], item:reaction});
      });
    });


  }

  openSelect(){
    this.city_select.open();
  }
  changeCity(){
    this.userProvider.setCityPreference(this.my_city);
  }

}
