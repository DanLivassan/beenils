export class Functions{

  static formatPoints(value:number):string{
    let value_formated = value+' pts';
    let multiplies:Array<{multiplie:number, l:string}> = [
      {multiplie:1000000, l:'mi'},
      {multiplie:1000, l:'k'},
      ];

    for(let i=0;i<multiplies.length;i++){
      if(value>=multiplies[i].multiplie){
        value_formated = (value/multiplies[i].multiplie).toFixed(1);
        value_formated = value_formated +multiplies[i].l;
        break;
      }
    }

    return value_formated;
  }

}
