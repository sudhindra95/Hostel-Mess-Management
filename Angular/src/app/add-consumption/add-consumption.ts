export class Consumption{
    productname:string;
    consumedquantity:number;
    dateofconsumption:string;

    public model: object = {}
    
    constructor(productname:string, consumedquantity:number, dateofconsumption:string){
        this.productname=productname;
        this.consumedquantity=consumedquantity;
        this.dateofconsumption=dateofconsumption;
    }
}