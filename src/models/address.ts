export class Address{
  private _id:number;
  private _city:string;
  private _state:string;


  constructor(id: number, city: string, state: string) {
    this._id = id;
    this._city = city;
    this._state = state;
  }


  get id(): number {
    return this._id;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }
}
