
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

  public admob_id = 'ca-app-pub-6068620621300147~7023827753';
  public home_banner_ad = 'ca-app-pub-6068620621300147/3642560914';

  static getBannerAdMobId(){
    //return Params.frontUrl;
    return 'ca-app-pub-6068620621300147/3642560914';
  }

  static readonly UserTypes ={
    'leitor':1,
    'jornalista': 5,
    'moderador': 10,
    'editor':30,
    'colunista': 60,
    'administrador':100
  };

  static readonly Citys =['Salvador']; //TODO Desenvolver no backend endpoint para pegar as cidades





}

