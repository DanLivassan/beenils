
import {Platform} from "ionic-angular";


export class Params{


  constructor() {
  }

  static readonly baseUrl = 'api';
  static readonly frontUrl = 'front-api';
  static getBaseUrl(){
    //return Params.baseUrl;
    return 'http://198.211.109.67:8000';
  }
  static getFrontUrl(){
    //return Params.frontUrl;
    return 'http://198.211.109.67';
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

