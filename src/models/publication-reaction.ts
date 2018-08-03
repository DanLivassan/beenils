
export class PublicationReaction{
  private _user_id;
  private _publication_id;
  private _type;

  static readonly ReactionTypes = {
    'curtir':1,
    'curtir-comentario':2,
    'comentario-curtido':3,
    'comentario-aprovado':4,
    'publicacao-aprovada':5,
    'publicacao-comentada':6,
    'publicacao-curtida':7,
    'aprovar-comentario':8,
    'aprovar-publicacao':9,
    'convidar':10
  };




  constructor(user_id, publication_id, type) {
    this._user_id = user_id;
    this._publication_id = publication_id;
    this._type = type;
  }

  get user_id() {
    return this._user_id;
  }

  set user_id(value) {
    this._user_id = value;
  }

  get publication_id() {
    return this._publication_id;
  }

  set publication_id(value) {
    this._publication_id = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }
}
