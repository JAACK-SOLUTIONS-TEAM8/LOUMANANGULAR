import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { CommonModule } from '@angular/common';
import { AddSlotComponent } from './Admin/Meeting/add-slot/add-slot.component';
import { MeetingDetailComponent } from './Admin/Meeting/meeting-detail/meeting-detail.component';
import { SlotsDetailComponent } from './Admin/Meeting/slots-detail/slots-detail.component';
import { StockDetailComponent } from './Admin/Stock/stock-detail/stock-detail.component';
import { WireOffStockComponent } from './Admin/Stock/wire-off-stock/wire-off-stock.component';
import { ClientListComponent } from './Admin/Client/client-list/client-list.component';
import { AddLocationComponent } from './Admin/Location/add-location/add-location.component';
import { LocationDetailComponent } from './Admin/Location/location-detail/location-detail.component';
import { ClientEnquiryComponent } from './Admin/ClientEnquiry/client-enquiry/client-enquiry.component';
import { ClientEnquiryDetailComponent } from './Admin/ClientEnquiry/client-enquiry-detail/client-enquiry-detail.component';
import { EnquiryResponseComponent } from './Admin/ClientEnquiry/enquiry-response/enquiry-response.component';
import { AddAdminComponent } from './Admin/components/add-admin/add-admin.component';
import { AdminDetailComponent } from './Admin/components/admin-detail/admin-detail.component';
import { TeamsAttendanceHistoryComponent } from './Admin/teams-attendance-history/teams-attendance-history.component';
import { AddEnquiryTypeComponent } from './Admin/EnquiryType/add-enquiry-type/add-enquiry-type.component';
import { EnquiryTypeDetailComponent } from './Admin/EnquiryType/enquiry-type-detail/enquiry-type-detail.component';
import { AddClientComponent } from './client-sub-system/add-client/add-client.component';
import { ClientProfileComponent } from './client-sub-system/client-profile/client-profile.component';
import { AddEnquiryComponent } from './client-sub-system/Enquiries/add-enquiry/add-enquiry.component';
import { EnquiryComponent } from './client-sub-system/Enquiries/enquiry/enquiry.component';
import { ClientSignUpComponent } from './user-sub-system/client-sign-up/client-sign-up.component';
import { LoginComponent } from './user-sub-system/login/login.component';
import { ResetPasswordInitialStepComponent } from './user-sub-system/reset-password-initial-step/reset-password-initial-step.component';



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
    TeamsAttendanceHistoryComponent,
    AddEnquiryTypeComponent,
    EnquiryTypeDetailComponent,
    AddClientComponent,
    ClientProfileComponent,
    AddEnquiryComponent,
    EnquiryComponent,
    ClientSignUpComponent,
    LoginComponent,
    ResetPasswordInitialStepComponent,
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
