import { Component, OnInit } from '@angular/core';
import { ViewConsumption } from './view-consumption';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-consumption',
  templateUrl: './view-consumption.component.html',
  styleUrls: ['./view-consumption.component.css'],
  providers: [DatePipe]
})
export class ViewConsumptionComponent implements OnInit {

  public fromDate:string;
  public toDate:string;
  public product_name_on_submit:string;
  consumptionLists:any[]
  consumptionList:ViewConsumption[];
  public model: object = {};
  public productName:string;
  public product_name:string;
  productList:any[]
  display_dropdown:string;
  errorMessage:string="";
  isErrorMessage:boolean=false;
  totalconsumed:number;

  productNameIsNotEntered:boolean=false;
  productNameIsNotEntered_1:boolean=true;

  display_mode:string;

  download_url:string;

  productNameIsEntered:boolean=false;

  productNameIsEntered_1:boolean=false;

  display_table_header:string;
  mydate: string;

  myDate = new Date();

  lessthan12: boolean;
  greaterthan12: boolean;

  fewthan12: boolean;
  morethan12: boolean;

  margin_top_onclick: string;

  product_name_typed:string;

  show: boolean;


  constructor(private http: Http,private datePipe: DatePipe) {
    this.display_dropdown= 'none';
    this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.display_table_header='none';
    this.display_mode='none';
   }

  ngOnInit() {
  }


  Dates={
    fromDate:'',
    toDate:''
  }

  checkDate() {
    this.fromDate = new DatePipe('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
    this.toDate=new DatePipe('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');

    //alert("From date "+this.fromdate+" To date "+this.todate);
  }


  onKey(event: any) {

    this.display_dropdown= 'block';

    let formData = new FormData();

    this.product_name_on_submit=event.target.value;


    if(this.product_name_on_submit==''){
      this.display_dropdown = 'none';
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


  getUrlText(val){
    
    //alert(val);
   
    this.model['productName']=val;
    this.display_dropdown= 'none';
    this.product_name_on_submit=val;

  }

  changeItem(){
    this.display_mode='none';
    this.isErrorMessage=false;
  }

  erase(){
    this.display_mode='none';
    this.isErrorMessage=false;
   }


  findConsumptionData(val){

    this.checkDate();

    let fromDate:string;
    let toDate:string;
    let productName:string;
    
    this.totalconsumed=0;

    
    this.productName=val;
    this.show=true;


    var temp:string = 'http://localhost:9090/getConsumptionDetails?pname='+this.productName+'&fromdate='+this.fromDate+'&todate='+this.toDate;


    
    this.http.get(temp).pipe(map(res => res.json())).subscribe(res => {

      if(this.productName==''){
        this.productNameIsNotEntered=true;
        this.productNameIsNotEntered_1=true;
        this.productNameIsEntered=false;
        this.productNameIsEntered_1=false;
        this.product_name_typed='All Products';
        this.display_mode='block';

      }else{
        this.productNameIsNotEntered=false;
        this.productNameIsNotEntered_1=false;
        this.productNameIsEntered=true;
        this.productNameIsEntered_1=true;
        this.product_name_typed=this.productName;
        this.display_mode='block';
      }

      console.log("Data: ",res);
      this.consumptionList = res;

      this.show=false;

      if (!this.consumptionList.length) {
        //alert("Empty list")
        this.display_table_header='block';

        this.isErrorMessage = true;
        this.errorMessage = "No Records Found";
        //this.margin_top_onclick = '0px';

      } else if (this.consumptionList.length < 12) {
        this.isErrorMessage = false;
        this.display_table_header='block';
        this.lessthan12 = true;
        this.greaterthan12 = false;
        this.display_mode='block';
        this.fewthan12 = true;
        this.morethan12 = false;

      }
      else if (this.consumptionList.length >= 12) {
        this.display_mode='block';
        this.lessthan12 = false;
        this.greaterthan12 = true;
        this.fewthan12 = false;
        this.morethan12 = true;
        this.isErrorMessage = false;
        this.display_table_header='block';
        //this.margin_top_onclick = '0px';
        
      }

      for (let obj of this.consumptionList) {
        for (let key in obj) {
          if(key=='consumedquantity'){
            this.totalconsumed+= obj[key];
          }
        }
    }
      
     }, err =>{
       this.show=false;
      this.isErrorMessage = true;
       this.errorMessage = "No Records Found";
       this.display_mode='none';
       console.log(this.errorMessage)
     })

     

  }

  downloadFile(){

    if(this.productName==''){
      
      this.download_url= 'http://localhost:9090/webapp/downloadConsumptionReport/allProducts';
   
    
    }else{
      this.download_url = 'http://localhost:9090/webapp/downloadConsumptionReport/'+this.productName;
    }
    

  }

 

}
