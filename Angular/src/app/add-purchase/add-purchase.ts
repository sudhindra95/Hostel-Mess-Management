export class Purchase{
    date:string;
    billnumber:number;
    productname:string;
    vendorname:string;
    price:number;
    quantity:number;
    amount:number;

    public model: object = {}

    

    constructor(date: string, billnumber: number, productname:string, vendorname: string , price:number, quantity: number, amount:number) {
      this.date = date;
      this.billnumber = billnumber;
      this.productname=productname;
      this.vendorname = vendorname;
      this.price = price;
      this.quantity = quantity;
      this.amount = amount;
    }



}