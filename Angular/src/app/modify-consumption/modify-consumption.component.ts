import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-modify-consumption',
  templateUrl: './modify-consumption.component.html',
  styleUrls: ['./modify-consumption.component.css']
})
export class ModifyConsumptionComponent implements OnInit {

  instance: string = 'instance';
  dataBank: any[] = [];
  columns: any[] = [];
  flag: boolean = false;
  hotInstance: any;
  public model: object = {}
  public dataset = [];
  public headers = [];
  dataBack: string;
  totalRows:number;
  rows_containing_data:number;

  edited_consumption_list: any[] = [];

  show:boolean;
  display_sheet:string='none';

  private colHeaders: string[] = ['Date of Consumption', 'Product Name', 'Consumed Quantity'];

  isErrorMessage: boolean;
  errorMessage: string;

  constructor(private http: Http, private hotRegisterer: HotTableRegisterer) {
    this.columns = [];
    this.display_sheet='none';
    this.show = true;

    this.http.get('http://localhost:9090/getAllConsumption').pipe(map(res => res.json())).subscribe(res => {
      //console.log("data: ", res);

      let data = [];

      

      res.forEach(element => {
        data.push(element);
      });


      this.dataBank = data;

      //console.log("data bank ",this.dataBank);

      this.headers = Object.keys(data[0]);

      //console.log("Headers ",this.headers);

      for (let num = 0; num < this.headers.length; num++) {
        this.columns.push({ data: this.headers[num] });
      };

      this.display_sheet='block';
      this.show = false;
    }, err => {
      this.show = false;
      this.isErrorMessage = true;

      this.errorMessage = "No Records Found";

      console.log(this.errorMessage)
    })
   }

  ngOnInit() {
  }

  settings = {
    minRows: 1000,
    minCols: 256,
    stretchH: 'all',
    rowHeaders: true,
    colHeaders: true,
    colWidths: 165,
    rowHeights: 30,
    rowHeaderWidth: 55,
    filters: true,
    dropdownMenu: true
  };

  saveData(){
    this.totalRows=this.hotRegisterer.getInstance('instance').countSourceRows();
    this.rows_containing_data=this.totalRows-this.hotRegisterer.getInstance('instance').countEmptyRows();

    for(let i=0;i<this.rows_containing_data;i++){
      //console.log("Data at row ",i," is "+this.hotRegisterer.getInstance('instance').getDataAtRow(i));
      this.edited_consumption_list.push(this.hotRegisterer.getInstance('instance').getDataAtRow(i));
    }
    
    let formData = new FormData();
    
    console.log("Stringified json "+JSON.stringify(this.edited_consumption_list));
    //formData.append('formdata',amountString);

    formData.append('formdata',JSON.stringify(this.edited_consumption_list));

    var temp:string = 'http://localhost:9090/addEditedConsumption';
   
    console.log("Formdata ",formData);

    this.http.post(temp,formData).subscribe(data => {
      console.log("Data is ",data);
      alert("Updated successfully!!!")
    });
    this.edited_consumption_list.splice(0);
  }
}
