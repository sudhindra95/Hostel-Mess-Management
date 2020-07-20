export class Dashboard{
    
    fromdate:string;
    todate:string

    public model: object = {}

    

    constructor(fromdate: string,todate:string) {

      this.fromdate=fromdate;
      this.todate=todate;

    }



}