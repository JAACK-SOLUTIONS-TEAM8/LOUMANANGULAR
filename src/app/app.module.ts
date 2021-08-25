import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { CommonModule, DatePipe } from '@angular/common';
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
import { AddProductComponent } from './product-sub-system/add-product/add-product.component';
import { AddProductSizeComponent } from './product-sub-system/add-product-size/add-product-size.component';
import { AddProductTypeComponent } from './product-sub-system/add-product-type/add-product-type.component';
import { ProductListComponent } from './product-sub-system/product-list/product-list.component';
import { ProductSizeDetailComponent } from './product-sub-system/product-size-detail/product-size-detail.component';
import { ProductTypeDetailComponent } from './product-sub-system/product-type-detail/product-type-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './Home/home/home.component';
import { AttendanceReportComponent } from './report-sub-system/attendance-report/attendance-report.component';
import { ClientReportComponent } from './report-sub-system/client-report/client-report.component';
import { EmployeeRegisterReportComponent } from './report-sub-system/employee-register-report/employee-register-report.component';
import { HalfYearlyEmployeeReportComponent } from './report-sub-system/half-yearly-employee-report/half-yearly-employee-report.component';
import { MonthlyEmployeeRegisterReportComponent } from './report-sub-system/monthly-employee-register-report/monthly-employee-register-report.component';
import { MonthlySalesReportComponent } from './report-sub-system/monthly-sales-report/monthly-sales-report.component';
import { MonthlyStockReportComponent } from './report-sub-system/monthly-stock-report/monthly-stock-report.component';
import { AddTeamComponent } from './Admin/Team/add-team/add-team.component';
import { AttendanceComponent } from './Admin/Team/attendance/attendance.component';
import { ManageTeamComponent } from './Admin/Team/manage-team/manage-team.component';
import { TeamsDetailComponent } from './Admin/Team/teams-detail/teams-detail.component';
import { ClientMeetingComponent } from './client-sub-system/meetings/client-meeting/client-meeting.component';
import { ClientMeetingSlotsComponent } from './client-sub-system/meetings/client-meeting-slots/client-meeting-slots.component';





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
    AddProductComponent,
    AddProductSizeComponent,
    AddProductTypeComponent,
    ProductListComponent,
    ProductSizeDetailComponent,
    ProductTypeDetailComponent,
    HomeComponent,
    AttendanceReportComponent,
    ClientReportComponent,
    EmployeeRegisterReportComponent,
    HalfYearlyEmployeeReportComponent,
    MonthlyEmployeeRegisterReportComponent,
    MonthlySalesReportComponent,
    MonthlyStockReportComponent,
    AddTeamComponent,
    AttendanceComponent,
    ManageTeamComponent,
    TeamsDetailComponent,
    ClientMeetingComponent,
    ClientMeetingSlotsComponent,  
  ],
    imports: [
      CommonModule,
      BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule
      ],
    providers: [DatePipe],

    bootstrap: [AppComponent]
})
export class AppModule { }
