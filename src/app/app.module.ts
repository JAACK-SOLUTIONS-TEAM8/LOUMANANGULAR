import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { CommonModule } from '@angular/common';
import { AddSlotComponent } from './Admin/Meeting/add-slot/add-slot.component';
import { MeetingDetailComponent } from './Admin/Meeting/meeting-detail/meeting-detail.component';
import { SlotsDetailComponent } from './Admin/Meeting/slots-detail/slots-detail.component';
import { StockDetailComponent } from './Admin/Stock/stock-detail/stock-detail.component';
import { WireOffStockComponent } from './Admin/Stock/wire-off-stock/wire-off-stock.component';
import { ClientListComponent } from './admin/Client/client-list/client-list.component';
import { AddLocationComponent } from './Admin/Location/add-location/add-location.component';
import { LocationDetailComponent } from './Admin/Location/location-detail/location-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AuditComponent,
    AddSlotComponent,
    MeetingDetailComponent,
    SlotsDetailComponent,
    StockDetailComponent,
    WireOffStockComponent,
    ClientListComponent,
    AddLocationComponent,
    LocationDetailComponent,
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
