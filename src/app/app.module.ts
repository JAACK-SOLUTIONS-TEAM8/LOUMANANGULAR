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
import { ClientEnquiryComponent } from './Admin/ClientEnquiry/client-enquiry/client-enquiry.component';
import { ClientEnquiryDetailComponent } from './Admin/ClientEnquiry/client-enquiry-detail/client-enquiry-detail.component';
import { EnquiryResponseComponent } from './Admin/ClientEnquiry/enquiry-response/enquiry-response.component';
import { AddAdminComponent } from './Admin/components/add-admin/add-admin.component';
import { AdminDetailComponent } from './Admin/components/admin-detail/admin-detail.component';
import { AddEnquiryTypeComponent } from './Admin/add-enquiry-type/add-enquiry-type.component';
import { EnquiryTypeDetailComponent } from './Admin/enquiry-type-detail/enquiry-type-detail.component';
import { AddTeamComponent } from './Admin/add-team/add-team.component';
import { AttendanceComponent } from './Admin/attendance/attendance.component';
import { ManageTeamComponent } from './Admin/manage-team/manage-team.component';
import { TeamsDetailComponent } from './Admin/teams-detail/teams-detail.component';


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
    ClientEnquiryComponent,
    ClientEnquiryDetailComponent,
    EnquiryResponseComponent,
    AddAdminComponent,
    AdminDetailComponent,
    AddEnquiryTypeComponent,
    EnquiryTypeDetailComponent,
    AddTeamComponent,
    AttendanceComponent,
    ManageTeamComponent,
    TeamsDetailComponent,
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
