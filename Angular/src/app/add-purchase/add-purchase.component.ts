import { Component, NgModule, OnInit } from '@angular/core';
import { Purchase } from './add-purchase';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';

import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css'],
  providers: [DatePipe]
})
export class AddPurchaseComponent implements OnInit {

  public date:string;
  public billnumber:number;
  public productname:string;
  public product_name_on_submit:string;
  productList:any[]
  public vendor_name:string;
  public vendor_name_on_submit:string;
  vendorList:any[];

  public vendorname:string;
  public bgcolor: string;
  public backcolor:string;
  public price:number ;
  public quantity:number ;
  public amount:number;
  purchases:Purchase[];
  public model: object = {};
  display_dropdown:string;

  display_dropdown1:string;

  mydate: string;

  myDate = new Date();

  constructor(private http: Http, private datePipe: DatePipe) {
    this.display_dropdown= 'none';
    this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.display_dropdown1='none';

  }



  onPriceKey(value:string){
    this.price=parseFloat(value);
    this.amount=this.price * this.quantity;
  }



  PriceChange(value:string){
    this.price=parseFloat(value);
    this.amount=this.price * this.quantity;
  }



  onQuantityKey(value: string) { 
    this.quantity=parseFloat(value)
    this.amount=this.price * this.quantity;
    //alert(this.amount);
  }



  QuantityChange(value: string){
    this.quantity=parseFloat(value)
    this.amount=this.price * this.quantity;
    //alert(this.amount)
  }



  changeBgColorAddPurchase(){
    this.bgcolor='#f7f7f7';
    this.backcolor='#005cab';
  }



  getUrlText(val){
    
    //alert(val);
   
    this.model['productname']=val;
    this.display_dropdown= 'none';
    this.product_name_on_submit=val;

  }



  getUrlTextForVendors(val){
    
    //alert(val);
   
    this.model['vendorname']=val;
    this.display_dropdown1= 'none';
    this.vendor_name_on_submit=val;

  }
  


  ngOnInit() {
  }



  searchProducts(event: any) {

    this.display_dropdown= 'block';

    let formData = new FormData();

    this.product_name_on_submit=event.target.value;

    if(this.product_name_on_submit==''){
      this.display_dropdown='none'
    }  


    
    var temp:string = 'http://localhost:9090/webapp/getAllProducts/'+this.product_name_on_submit;
   
    this.http.get(temp).pipe(map(res => res.json())).subscribe(data => {
      console.log("Data is ",data);
      this.productList = data;

      if (!this.productList.length) {
        //alert("Empty list")
        
        this.display_dropdown = 'none';
    
      }

      console.log("Product list ",this.productList);
    });


  }


  searchVendors(event: any) {

    this.display_dropdown1= 'block';

    let formData = new FormData();

    

    this.vendor_name=event.target.value;
    
    if(this.vendor_name==''){
      this.display_dropdown1='none'
    }    
    var temp:string = 'http://localhost:9090/webapp/getVendors/'+this.vendor_name;
   
    this.http.get(temp).pipe(map(res => res.json())).subscribe(data => {
      console.log("Data is ",data);
      this.vendorList = data;

      if (!this.vendorList.length) {
        //alert("Empty list")
        
        this.display_dropdown1 = 'none';
    
      }

      console.log("vendors list ",this.vendorList);
    });


  }


  


  postPurchaseData(testForm:NgForm){
    
    let formData = new FormData();
    let amountString=this.amount.toString();
    console.log("Amount ",amountString);
    
    //formData.append('formdata',amountString);

    formData.append('formdata',JSON.stringify(this.model));

    var temp:string = 'http://localhost:9090/register/'+amountString;
   
    console.log("Formdata ",JSON.stringify(this.model));

    this.http.post(temp,formData).subscribe(data => {
      console.log("Data is ",data);
      
    });
    
    alert("Data added successfully !!")
    
    

    testForm.reset();

    
  }

  


}
