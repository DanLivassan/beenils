
export class Params{


  constructor() {
  }

  static readonly baseUrl = 'http://api.beenews.localhost';
  static readonly frontUrl = 'http://beenews.localhost';
  static getBaseUrl(){
    return Params.baseUrl;
  }
  static getFrontUrl(){
    return Params.frontUrl;
  }
  static readonly UserTypes ={
    'Leitor':1,
    'Jornalista': 5,
    'Moderador': 10,
    'Editor':30,
    'Colunista': 60,
    'Administrador':100
  };
  static readonly UserStatus = {
    'Ativo':1,
    'Inativo': 2,
  };

}

