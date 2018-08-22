import {Component, ViewChild} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Select} from 'ionic-angular';
import {User} from "../../models/user";
import {isArray} from "rxjs/util/isArray";
import {UserProvider} from "../../providers/user/user";
import {Params} from "../../utils/params"
import {Address} from "../../models/address";

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
  citys:Array<Address>;
  my_city:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userProvider:UserProvider,
    private events:Events,
  ) {
    this.user = this.navParams.get('user');
    this.icons = [
      'fa fa-thumbs-up',
      'fa fa-heart',
      'fa fa-comment',
      'fa fa-comment',
      'fa fa-share-alt',
    ];


    this.userProvider.getAllCitys().subscribe((citys:Array<Address>)=>{
      this.citys = citys;
    })
    this.my_city = this.userProvider.getCityPreference().city;
  }

  ionViewDidLoad() {

    this.userProvider.pointsHistory(this.userProvider.getToken()).subscribe((data:Array<any>)=>{
      this.reactions = [];
      console.log(data);
      data.forEach((reaction, index)=>{

        this.reactions.push({icon:this.icons[index], item:reaction});
      });
    });


  }

  openSelect(){
    this.city_select.open();
  }
  changeCity(){
    this.events.publish('user:set_address_preferences',this.userProvider.getUser(), this.my_city);
    this.userProvider.setCityPreference(this.filterCity());
  }

  filterCity():Address{
    return this.citys.find((city:Address)=>{
      return city.city == this.my_city;
    });
  }

}
