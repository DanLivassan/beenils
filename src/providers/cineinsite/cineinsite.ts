import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cine} from "../../models/cine";

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

  films:Cine[]=[];
  constructor(public http: HttpClient) {
    this.films.push(
      new Cine(
        'Uma Quase Dupla',
        'http://fw.atarde.com.br/cineinsite/2018/07/200x300_uma-quase-dupla_2018718142555148.jpg',
        'Quando uma série de assassinatos abala a rotina da cidade de Joinlândia, o calmo e pacato subdelegado Claudio (Cauã Reymond) receberá a ajuda da destemida e experiente investigadora Keyla (Tatá Werneck) nas investigações. No entanto, a diferença de ritmo e a falta de química dos dois só atrapalhará a solução do caso.'
      ),
      new Cine(
        'Arranha-Céu Coragem Sem Limites',
        'http://fw.atarde.com.br/cineinsite/2018/07/200x300_arranhaceu-coragem-sem-limites_2018711144523183.jpg',
        'Responsável pela segurança de arranha-céus, o veterano de guerra americano e ex-líder da operação de resgate do FBI, Will Ford (Dwayne Johnson), é acusado de ter colocado o edifício mais alto e mais seguro da China em chamas. Cabe ao agente achar os culpados pelo incêndio, salvar sua família que está presa dentro do prédio e limpar seu nome'
      ),
      new Cine(
        'Hotel Transilvânia 3: Férias Monstruosas',
        'http://fw.atarde.com.br/cineinsite/2018/07/140x210_hotel-transilvania-3-ferias-monstruosas_2018711143841220.jpg',
        'Agora que Dennis, o neto de Drácula, é um completo vampiro, as coisas não poderiam estar melhores no Hotel Transilvânia, até que um milionário ganancioso ameaça destruir a propriedade para construir um resort e a família de Drácula e os monstros precisam se unir para garantir que ele nunca complete os seus planos.'
      ),
    )
  }

  getAll():Cine[]{

    return this.films;
  }

}
