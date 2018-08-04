import {Cine} from "./cine";

export class CineRoom{

  private _id:number;
  private _cine:Cine;
  private _description:string;
  private _capacity:string;
  private _tags:Array<string>;


  constructor(cine: Cine, description: string, capacity: string) {
    this._cine = cine;
    this._description = description;
    this._capacity = capacity;
  }


  get tags(): Array<string> {
    return this._tags;
  }

  set tags(value: Array<string>) {
    this._tags = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get cine(): Cine {
    return this._cine;
  }

  set cine(value: Cine) {
    this._cine = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get capacity(): string {
    return this._capacity;
  }

  set capacity(value: string) {
    this._capacity = value;
  }
}
