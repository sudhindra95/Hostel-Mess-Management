import { Component, NgModule, OnInit } from '@angular/core';
import { Http } from '@angular/http';
//import { ViewPurchase } from './view-purchase';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-view-purchase',
  templateUrl: './view-purchase.component.html',
  styleUrls: ['./view-purchase.component.css'],
  providers: [DatePipe]
})
export class ViewPurchaseComponent implements OnInit {

  public fromDate: string;
  public toDate: string;
  public vendor_name: string;
  public vendor_name_on_submit: string;
  public model: object = {};
  purchaseList: any[]
  display_mode: string;
  searchValue: string = '';

  mydate: string;

  myDate = new Date();

  errorMessage: string = "";
  isErrorMessage: boolean = false;

  lessthan12: boolean;
  greaterthan12: boolean;

  margin_top_onclick: string;
  table_container_marg_top: string;

  display_dropdown: string;

  vendorList: any[];
  opacity_property: string;
  color_property: string;
  cursor_property: string;

  show: boolean;



  constructor(private http: Http, private datePipe: DatePipe) {
    this.display_mode = 'none';
    this.display_dropdown = 'none';
    this.opacity_property = '0.5';
    this.color_property = '#ccc';
    this.cursor_property = 'none';

    this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }


  ngOnInit() {
  }

  Dates = {
    fromDate: '',
    toDate: ''
  }

  checkDate() {
    this.fromDate = new DatePipe('en-US').transform(this.Dates.fromDate, 'dd-MM-yyyy');
    this.toDate = new DatePipe('en-US').transform(this.Dates.toDate, 'dd-MM-yyyy');

    //alert("From date "+this.fromdate+" To date "+this.todate);
  }

  openFile() {
    // alert("Hello");
  }

  changeItem(){
    this.display_mode='none';
    this.isErrorMessage=false;

  }

  textAreaEmpty(event) {
    this.opacity_property = '0.5';
    this.color_property = '#ccc';
    this.cursor_property = 'none';
    this.display_mode = 'none';
  }

  onKey(event: any) {

    this.display_dropdown = 'block';

    let formData = new FormData();

    this.vendor_name = event.target.value;

    var temp: string = 'http://localhost:9090/webapp/getVendors/' + this.vendor_name;

    this.http.get(temp).pipe(map(res => res.json())).subscribe(data => {
      console.log("Data is ", data);
      this.vendorList = data;

      if (!this.vendorList.length) {
        //alert("Empty list")
        // this.border_top_dimension='0px';
        this.display_dropdown = 'none';

      }

      console.log("vendors list ", this.vendorList);
    });


  }

  onKeydown(event) {
    this.display_mode = 'none';
  }

  closeDiv() {
    alert('Hi Sudeendra');
  }


  // textAreaEmpty(){
  //     //console.log('Value in search field '+this.searchValue);
  //     if (this.searchValue == "") {
  //       console.log("Value cleared");
  //       this.display_dropdown= 'none';
  //     }
  // }

  getUrlText(val) {

    //alert(val);

    this.model['search'] = val;
    this.display_dropdown = 'none';
    this.vendor_name_on_submit = val;
    this.color_property = 'blue';
    this.cursor_property = 'auto';
    this.opacity_property = '1';

  }




  findPurchaseData() {

    this.checkDate();

    let vendor_name: string;

    //alert("Vendor name "+this.vendor_name_on_submit);
    this.show=true;

    var temp: string = 'http://localhost:9090/getPurchase/' + this.vendor_name_on_submit + '?fromdate=' + this.fromDate + '&todate=' + this.toDate;

    this.http.get(temp).pipe(map(res => res.json())).subscribe(res => {
      console.log("purchase data: ", res);
      this.purchaseList = res;
      this.show=false;

      if (!this.purchaseList.length) {
        //alert("Empty list")

        this.display_mode = 'none';
        this.isErrorMessage = true;
        this.errorMessage = "No Records Found";
        this.margin_top_onclick = '0px';
        this.table_container_marg_top = '273px';

      } else if (this.purchaseList.length < 12) {
        this.isErrorMessage = false;
        this.display_mode = "block";
        this.lessthan12 = true;
        this.greaterthan12 = false;
        this.margin_top_onclick = '0px';
        this.table_container_marg_top = '273px';

      }
      else if (this.purchaseList.length >= 12) {
        this.lessthan12 = false;
        this.greaterthan12 = true;
        this.isErrorMessage = false;
        this.display_mode = "block";
        this.margin_top_onclick = '0px';
        this.table_container_marg_top = '273px';
      }

    }, err => {
      this.display_mode = 'none';
      this.isErrorMessage = true;
      this.show=false;
      this.errorMessage = "No Records Found";
      
      console.log(this.errorMessage)
    })


  }
}
