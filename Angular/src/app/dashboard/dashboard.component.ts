import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  fromdate: string;
  todate: string;
  display_mode: string;
  public model: object = {};
  stockList: any[]
  errorMessage: string = "";
  isErrorMessage: boolean = false;
  mydate: string;
  lessthan12:boolean;
  greaterthan12:boolean;
  display_filtertextbox:string;
  show: boolean;

  margin_top_onclick:string;
  table_container_marg_top:string;

  onKeydown(event) {
    this.display_mode = 'none';
  }

  myDate = new Date();

  constructor(private http: Http, private datePipe: DatePipe) {
    this.display_mode = 'none';
    this.isErrorMessage=false;
    this.display_filtertextbox='none';
    this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit() {
  }

  changeItem(){
    
    this.display_mode='none';
    this.show=false;
    this.isErrorMessage=false;

  }

  Dates = {
    fromDate: '',
    toDate: ''
  }


  checkDate() {
    this.fromdate = new DatePipe('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
    this.todate = new DatePipe('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');

    //alert("From date "+this.fromdate+" To date "+this.todate);
  }



  findStockData() {
    this.checkDate();
    //alert("From date "+this.fromdate+" todate "+this.todate);


    this.show = true;


    var temp: string = 'http://localhost:9090/stock?fromdate=' + this.fromdate + '&todate=' + this.todate;


    this.http.get(temp).pipe(map(res => res.json())).subscribe(res => {
      console.log("purchase data: ", res);
      this.stockList = res;


      if (!this.stockList.length) {
        //alert("Empty list")

        this.show = false;
        this.display_mode = 'none';
        this.isErrorMessage = true;
        this.errorMessage = "No Records Found";
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      }else if(this.stockList.length<12){
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.lessthan12=true;
        this.greaterthan12=false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      } 
      else {
        this.lessthan12=false;
        this.greaterthan12=true;
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';
      }

    }, err => {
      this.show = false;
      this.display_mode = 'none';
      this.isErrorMessage = true;
      this.display_filtertextbox='none';

      this.errorMessage = "No Records Found";

      console.log(this.errorMessage)
    })


  }

  clearResultField(){
    this.isErrorMessage=false;

    this.display_mode='none';
  }


  filterProductName(){
    //this.popup.show();
    this.display_filtertextbox='block';
    this.margin_top_onclick='20px';
    this.table_container_marg_top='384px';

  }


  getFilteredList(val){
    var temp: string = 'http://localhost:9090/filteredList?productname=' + val;

    this.http.get(temp).pipe(map(res => res.json())).subscribe(res => {
      console.log("purchase data: ", res);
      this.stockList = res;


      if (!this.stockList.length) {
        //alert("Empty list")

        this.show = false;
        this.display_mode = 'none';
        this.isErrorMessage = true;
        this.errorMessage = "No Records Found";
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      }else if(this.stockList.length<12){
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.lessthan12=true;
        this.greaterthan12=false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      } 
      else {
        this.lessthan12=false;
        this.greaterthan12=true;
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';
      }

    }, err => {
      this.show = false;
      this.display_mode = 'none';
      this.isErrorMessage = true;
      this.display_filtertextbox='none';

      this.errorMessage = "No Records Found";

      console.log(this.errorMessage)
    })

  }


  sortByProductName(){
    
    var temp: string = 'http://localhost:9090/sortListByName';

    this.http.get(temp).pipe(map(res => res.json())).subscribe(res => {
      console.log("sorted data: ", res);
      this.stockList = res;


      if (!this.stockList.length) {
        //alert("Empty list")

        this.show = false;
        this.display_mode = 'none';
        this.isErrorMessage = true;
        this.errorMessage = "No Records Found";
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      }else if(this.stockList.length<12){
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.lessthan12=true;
        this.greaterthan12=false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';

      } 
      else {
        this.lessthan12=false;
        this.greaterthan12=true;
        this.isErrorMessage=false;
        this.display_mode = "block";
        this.show = false;
        this.display_filtertextbox='none';
        this.margin_top_onclick='0px';
        this.table_container_marg_top='343px';
      }

    }, err => {
      this.show = false;
      this.display_mode = 'none';
      this.isErrorMessage = true;
      this.display_filtertextbox='none';

      this.errorMessage = "No Records Found";

      console.log(this.errorMessage)
    })


  }

}
