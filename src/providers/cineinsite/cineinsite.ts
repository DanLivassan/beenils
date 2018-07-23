import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(public http: HttpClient) {
    console.log('Hello CineinsiteProvider Provider');
  }

}
