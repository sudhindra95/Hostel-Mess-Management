import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { Routes, RouterModule } from "@angular/router";
import { ViewPurchaseComponent } from './view-purchase/view-purchase.component';
import { AddConsumptionComponent } from './add-consumption/add-consumption.component';
import { ViewConsumptionComponent } from './view-consumption/view-consumption.component';
import { HotTableModule} from '@handsontable/angular';
import { ModifyPurchaseComponent } from './modify-purchase/modify-purchase.component';
import { ModifyConsumptionComponent } from './modify-consumption/modify-consumption.component';
import { AngularFontAwesomeModule} from 'angular-font-awesome';


const routes:Routes = [
  {path: 'add-purchase', component:AddPurchaseComponent},
  {path: 'add-consumption', component:AddConsumptionComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'view_purchase', component: ViewPurchaseComponent},
  {path: 'consumption', component: AddConsumptionComponent},
  {path: 'view_consumption', component: ViewConsumptionComponent},
  {path: 'modify_purchase',component:ModifyPurchaseComponent},
  {path: 'modify_consumption',component:ModifyConsumptionComponent},
  {path: '**', component: DashboardComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddPurchaseComponent,
    ViewPurchaseComponent,
    AddConsumptionComponent,
    ViewConsumptionComponent,
    ModifyPurchaseComponent,
    ModifyConsumptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HotTableModule.forRoot() ,
    HotTableModule,
    HttpModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
