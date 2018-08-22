import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Movie} from "../../models/movie";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import {Cine} from "../../models/cine";
import {CineRoom} from "../../models/cine-room";
import {CineSchedule} from "../../models/cine-schedule";
import 'rxjs/add/operator/catch';
/*
  Generated class for the CineinsiteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/*
* BACKEND ACTIONS
*
'GET v1/cine/all'  Todos os filmes
'GET v1/cine/movie-genre/all' Todos os gêneros de filmes
'GET v1/cine/movie/one/<movieId:\d+>' Retorna Filme pelo id
'GET v1/cine/room/all' Retorna todas as salas cadastradas
'GET v1/cine/room-tags/all' Retorna todas as tags cadastradas
'GET v1/cine/schedule/week/<movieID:\d+>' Retorna os filmes em cartaz na semana
'GET v1/cine/schedule-tags/all'
* */
@Injectable()
export class CineinsiteProvider {

  constructor(public http: HttpClient, private userProvider:UserProvider) {


  }

  getAll(){

    let url = Params.getBaseUrl() + '/v1/cine/movie/releases';

    let params = new HttpParams();
    params = params.set('limit','20');
    const httpOptions = {
      params: params
    };
    return this.http.get(url, httpOptions).map((data:Array<any>)=>{
      let movies:Movie[]=[];
      data.forEach((movie)=>{
        movies.push(this.extractData(movie));
      });
      return movies
    });


  }
  handleError(error:Response){

  }

  getMovieSchedule(id:number){
    let url = Params.getBaseUrl() + '/v1/cine/schedule/week/'+id;
    let params = new HttpParams();
    params = params.set('limit','10');
    const httpOptions = {
      params: params
    };
    return this.http.get(url, httpOptions);
  }

  extractScheduleData(data:any):Array<{room:CineRoom, schedules:Array<CineSchedule>}>{
    let cine = new Cine(data['name'],data['picture'],data['information']);
    let rooms:Array<{room:CineRoom, schedules:Array<CineSchedule>}> = [];
    let schedules:Array<CineSchedule> = [];
    data['rooms'].forEach((room)=>{
      let sche:{room:CineRoom, schedules:Array<CineSchedule>} = {room:new CineRoom(cine, room['description'], room['capacity']),schedules:[] };
      rooms.push();
      room['schedules'].forEach((schedule)=>{
        sche.schedules.push(new CineSchedule(schedule['displayed_at']))
      });
      rooms.push(sche)
    });
    return(rooms);
  }

  extractData(data):Movie{
    let m = new Movie(data['title_original'], data['idiom'], data['created_at'], data['is_national'])
    m.id = data['id'];
    m.censorship = data['censorship'];
    m.duration = data['duration'];
    //m.genres = data['genres'];
    m.media = data['media'];
    m.nationality = data['nationality'];
    m.picture = data['picture'];
    m.released_at = data['released_at'];
    m.site = data['site'];
    m.synopsis = data['synopsis'];
    m.title = data['title'];
    return m
  }

  extractDataCine(data:Array<any>):Cine[]{
    let cines:Cine[]=[];
    data.forEach((cine)=>{
      cines.push(new Cine(cine['name'], cine['picture'], cine['information']))
    });
    return cines;
  }
  getAllCines(){
    let url = Params.getBaseUrl() + '/v1/cine/all';
    let params = new HttpParams();
    params = params.set('limit','50');
    const httpOptions = {
      params: params
    };
    return this.http.get(url, httpOptions);
  }

}
