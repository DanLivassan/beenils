export class Cine{

  private _name:string;
  private _picture:string;
  private _information:string;


  constructor(name: string, picture: string, information: string) {
    this._name = name;
    this._picture = picture;
    this._information = information;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }

  get information(): string {
    return this._information;
  }

  set information(value: string) {
    this._information = value;
  }
}
