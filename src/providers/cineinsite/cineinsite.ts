import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Movie} from "../../models/movie";
import {UserProvider} from "../user/user";
import {Params} from "../../utils/params";
import {Cine} from "../../models/cine";
import {CineRoom} from "../../models/cine-room";
import {CineSchedule} from "../../models/cine-schedule";
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

  films:Movie[]=[];
  constructor(public http: HttpClient, private userProvider:UserProvider) {
    let movie_1 = new Movie(
      'Uma Quase Dupla',
      'Português',
      '11/07/2018',
      true)
    movie_1.picture ='http://fw.atarde.com.br/cineinsite/2018/07/200x300_uma-quase-dupla_2018718142555148.jpg';
    movie_1.synopsis ='Quando uma série de assassinatos abala a rotina da cidade de Joinlândia, o calmo e pacato subdelegado Claudio (Cauã Reymond) receberá a ajuda da destemida e experiente investigadora Keyla (Tatá Werneck) nas investigações. No entanto, a diferença de ritmo e a falta de química dos dois só atrapalhará a solução do caso.';

    let movie_2 = new Movie(
      'Arranha-Céu Coragem Sem Limites',
      'Português',
      '11/07/2018',
      true)
    movie_2.picture ='http://fw.atarde.com.br/cineinsite/2018/07/200x300_arranhaceu-coragem-sem-limites_2018711144523183.jpg';
    movie_2.synopsis ='Responsável pela segurança de arranha-céus, o veterano de guerra americano e ex-líder da operação de resgate do FBI, Will Ford (Dwayne Johnson), é acusado de ter colocado o edifício mais alto e mais seguro da China em chamas. Cabe ao agente achar os culpados pelo incêndio, salvar sua família que está presa dentro do prédio e limpar seu nome';

    let movie_3 = new Movie(
      'Hotel Transilvânia 3: Férias Monstruosas',
      'Português',
      '15/07/2018',
      true)
    movie_3.picture ='http://fw.atarde.com.br/cineinsite/2018/07/140x210_hotel-transilvania-3-ferias-monstruosas_2018711143841220.jpg';
    movie_3.synopsis ='Agora que Dennis, o neto de Drácula, é um completo vampiro, as coisas não poderiam estar melhores no Hotel Transilvânia, até que um milionário ganancioso ameaça destruir a propriedade para construir um resort e a família de Drácula e os monstros precisam se unir para garantir que ele nunca complete os seus planos.';

    this.films.push(movie_1, movie_2, movie_3);

  }

  getAll(){

    let url = Params.getBaseUrl() + '/v1/cine/movie/releases';

    let params = new HttpParams();
    params = params.set('limit','20');
    const httpOptions = {
      params: params
    };
    return this.http.get(url, httpOptions);


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
