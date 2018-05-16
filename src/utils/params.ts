
import {Platform} from "ionic-angular";


export class Params{


  constructor() {
  }

  static readonly baseUrl = 'api';
  static readonly frontUrl = 'front-api';
  static getBaseUrl(){
    return Params.baseUrl;
    //return 'http://beenils.com.br:8000';
  }
  static getFrontUrl(){
    return Params.frontUrl;
    //return 'http://beenils.com.br';
  }

  static getWebSocketUrl(){
    return 'http://localhost:3000';
  }
  static readonly UserTypes ={
    'leitor':1,
    'jornalista': 5,
    'moderador': 10,
    'editor':30,
    'colunista': 60,
    'administrador':100
  };





}

