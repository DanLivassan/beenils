export class Editorial{
  private _id:number;
  private _name:string;

  static readonly NOTICIAS_ID = 1;
  static readonly ESPORTES_ID = 2;
  static readonly ENTRETENIMENTO_ID = 3;
  static readonly CULTURA_ID = 4;


  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }
}
