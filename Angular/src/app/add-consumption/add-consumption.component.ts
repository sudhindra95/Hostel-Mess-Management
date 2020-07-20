import { Component, OnInit } from '@angular/core';
import { Consumption } from './add-consumption';
import { Http, HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.css'],
  providers: [DatePipe]
})
export class AddConsumptionComponent implements OnInit {

  consumptions:Consumption[];
  public model: object = {};
  display_dropdown:string;
  public product_name_on_submit:string;
  productList:any[]
  mydate: string;

  myDate = new Date();

  constructor(private http: Http, private datePipe: DatePipe) {
    this.mydate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

   }

  ngOnInit() {
  }


  onKey(event: any) {

    this.display_dropdown= 'block';

    let formData = new FormData();

    this.product_name_on_submit=event.target.value;
    
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
   
    this.model['productname']=val;
    this.display_dropdown= 'none';
    this.product_name_on_submit=val;

  }

  postAddConsumptionData(testForm){

    let formData = new FormData();
    
    formData.append('formdata',JSON.stringify(this.model));

    var temp:string = 'http://localhost:9090/addConsumptionDetails';
   
    console.log("Formdata ",JSON.stringify(this.model));

    this.http.post(temp,formData).subscribe(data => {
      console.log("Data is ",data);
      
    });
    alert("Data added successfully !!")
    testForm.reset();
    
  }

}
