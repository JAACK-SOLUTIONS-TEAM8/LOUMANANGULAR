import { OrderHistoryComponent } from './client-sub-system/order-history/order-history.component';
import { OrderDetailComponent } from './client-sub-system/order-detail/order-detail.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-sub-system/login/login.component';
import { HomeComponent } from './Home/home/home.component';
import { AdminDetailComponent } from './Admin/components/admin-detail/admin-detail.component';
import { AddAdminComponent } from './Admin/components/add-admin/add-admin.component';
import { DialogComponent } from './Shared/Components/dialog/dialog.component';
import { TeamsDetailComponent } from './Admin/Team/teams-detail/teams-detail.component';
import { AddTeamComponent } from './Admin/Team/add-team/add-team.component';
import { LocationDetailComponent } from './Admin/Location/location-detail/location-detail.component';
import { AddLocationComponent } from './Admin/Location/add-location/add-location.component';
import { EmployeeTeamsComponent } from './Employee/employee-teams/employee-teams.component';
import { EmployeeTeamDetailComponent } from './Employee/employee-team-detail/employee-team-detail.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { MeetingDetailComponent } from './Admin/Meeting/meeting-detail/meeting-detail.component';
import { ClientListComponent } from './Admin/Client/client-list/client-list.component';
import { EnquiryTypeDetailComponent } from './Admin/EnquiryType/enquiry-type-detail/enquiry-type-detail.component';
import { AddEnquiryTypeComponent } from './Admin/EnquiryType/add-enquiry-type/add-enquiry-type.component';
import { ClientOrderDetailComponent } from './Admin/Order/client-order-detail/client-order-detail.component';
import { ViewClientOrderDetailComponent } from './Admin/Order/view-client-order-detail/view-client-order-detail.component';
import { StockDetailComponent } from './Admin/Stock/stock-detail/stock-detail.component';
import { WireOffStockComponent } from './Admin/Stock/wire-off-stock/wire-off-stock.component';
import { ProductListComponent } from './product-sub-system/product-list/product-list.component';
import { AddProductComponent } from './product-sub-system/add-product/add-product.component';
import { ResetPasswordInitialStepComponent } from './user-sub-system/reset-password-initial-step/reset-password-initial-step.component';
import { AddClientComponent } from './client-sub-system/add-client/add-client.component';
import { ClientProfileComponent } from './client-sub-system/client-profile/client-profile.component';
import { EmployeeProfileComponent } from './employee-sub-system/employee-profile/employee-profile.component';
import { UpdateEmployeeProfileComponent } from './employee-sub-system/update-employee-profile/update-employee-profile.component';
import { EmployeeTeamListComponent } from './employee-sub-system/employee-team-list/employee-team-list.component';
import { MonthlySalesReportComponent } from './report-sub-system/monthly-sales-report/monthly-sales-report.component';
import { MonthlyStockReportComponent } from './report-sub-system/monthly-stock-report/monthly-stock-report.component';
import { HalfYearlyEmployeeReportComponent } from './report-sub-system/half-yearly-employee-report/half-yearly-employee-report.component';
import { EmployeeRegisterReportComponent } from './report-sub-system/employee-register-report/employee-register-report.component';
import { MonthlyEmployeeRegisterReportComponent } from './report-sub-system/monthly-employee-register-report/monthly-employee-register-report.component';
import { ClientReportComponent } from './report-sub-system/client-report/client-report.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductTypeComponent } from './product-sub-system/add-product-type/add-product-type.component';
import { AddProductSizeComponent } from './product-sub-system/add-product-size/add-product-size.component';
import { AddSlotComponent } from './Admin/Meeting/add-slot/add-slot.component';
import { SlotsDetailComponent } from './Admin/Meeting/slots-detail/slots-detail.component';
import { ClientMeetingComponent } from './client-sub-system/meetings/client-meeting/client-meeting.component';
import { ClientMeetingSlotsComponent } from './client-sub-system/meetings/client-meeting-slots/client-meeting-slots.component';
import { EnquiryComponent } from './client-sub-system/Enquiries/enquiry/enquiry.component';
import { AddEnquiryComponent } from './client-sub-system/Enquiries/add-enquiry/add-enquiry.component';
import { ClientEnquiryComponent } from './Admin/ClientEnquiry/client-enquiry/client-enquiry.component';
import { ClientEnquiryDetailComponent } from './Admin/ClientEnquiry/client-enquiry-detail/client-enquiry-detail.component';
import { ProductTypeDetailComponent } from './product-sub-system/product-type-detail/product-type-detail.component';
import { ProductSizeDetailComponent } from './product-sub-system/product-size-detail/product-size-detail.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { ManageTeamComponent } from './Admin/Team/manage-team/manage-team.component';
import { AttendanceComponent } from './Admin/Team/attendance/attendance.component';
import { DatePipe } from '@angular/common';
import { ViewEmployeeProfileComponent } from './employee-sub-system/view-employee-profile/view-employee-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AttendanceReportComponent } from './report-sub-system/attendance-report/attendance-report.component';
import { TeamsAttendanceHistoryComponent } from './Admin/teams-attendance-history/teams-attendance-history.component';
import { ClientSignUpComponent } from './user-sub-system/client-sign-up/client-sign-up.component';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './Employee/employee-detail/employee-detail.component';
import { OrderProductComponent } from './order-sub-system/order-product/order-product/order-product.component';
import { ShoppingCartComponent } from './order-sub-system/shopping-cart/shopping-cart/shopping-cart.component';
import { DeliveryTypeComponent } from './order-sub-system/delivery-type/delivery-type/delivery-type.component';
import { AddDeliveryTypeComponent } from './order-sub-system/add-delivery-type/add-delivery-type/add-delivery-type.component';
import { CheckoutComponent } from './order-sub-system/checkout/checkout/checkout.component';
import { InvoiceComponent } from './order-sub-system/invoice/invoice/invoice.component';
import { CountdownModule } from 'ngx-countdown';
import { CompleteStockComponent } from './Admin/Stock/complete-stock/complete-stock.component';
import { TimerConfigurationComponent } from './Admin/timer/timer-configuration/timer-configuration.component';
import { ChartsModule } from 'ng2-charts';
import { EmailVerficationComponent } from './user-sub-system/email-verfication/email-verfication.component';
import {WebcamModule} from 'ngx-webcam';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddRoleComponent } from './Admin/Role/add-role/add-role.component';
import { RolesDetailComponent } from './Admin/Role/roles-detail/roles-detail.component';
import { UserRoleComponent } from './Admin/components/user-role/user-role.component';
import { AddFeatureComponent } from './Admin/features/add-feature/add-feature.component';
import { FeatureDetailComponent } from './Admin/features/feature-detail/feature-detail.component';
import { RoleFeatureComponent } from './Admin/components/role-feature/role-feature.component';
import { MonthlyTransactionalReportComponent } from './report-sub-system/monthly-transactional-report/monthly-transactional-report.component';
import { ManagementReportComponent } from './report-sub-system/management-report/management-report.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminDetailComponent,
    AddAdminComponent,
    DialogComponent,
    AddEmployeeComponent,
    EmployeeDetailComponent,
    TeamsDetailComponent,
    AddTeamComponent,
    LocationDetailComponent,
    AddLocationComponent,
    EmployeeTeamsComponent,
    EmployeeTeamDetailComponent,
    EmployeeRegisterComponent,
    MeetingDetailComponent,
    ClientListComponent,
    EnquiryTypeDetailComponent,
    AddEnquiryTypeComponent,
    ClientOrderDetailComponent,
    ViewClientOrderDetailComponent,
    StockDetailComponent,
    WireOffStockComponent,
    ProductListComponent,
    AddProductComponent,
    ResetPasswordInitialStepComponent,
    AddClientComponent,
    ClientProfileComponent,
    ClientEnquiryComponent,
    ClientMeetingComponent,
    ClientMeetingSlotsComponent,
    EmployeeProfileComponent,
    UpdateEmployeeProfileComponent,
    EmployeeTeamListComponent,
    CheckoutComponent,
    InvoiceComponent,
    MonthlySalesReportComponent,
    MonthlyStockReportComponent,
    HalfYearlyEmployeeReportComponent,
    EmployeeRegisterReportComponent,
    MonthlyEmployeeRegisterReportComponent,
    ClientReportComponent,
    AddProductTypeComponent,
    AddProductSizeComponent,
    AddSlotComponent,
    SlotsDetailComponent,
    ClientMeetingSlotsComponent,
    EnquiryComponent,
    AddEnquiryComponent,
    ClientEnquiryDetailComponent,
    ProductTypeDetailComponent,
    ProductSizeDetailComponent,
    OrderProductComponent,
    ShoppingCartComponent,
    DeliveryTypeComponent,
    AddDeliveryTypeComponent,
    AuditComponent,
    ManageTeamComponent,
    AttendanceComponent,
    ViewEmployeeProfileComponent,
    AttendanceReportComponent,
    TeamsAttendanceHistoryComponent,
    ClientSignUpComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    CompleteStockComponent,
    TimerConfigurationComponent,
    EmailVerficationComponent,
    AddRoleComponent,
    RolesDetailComponent,
    UserRoleComponent,
    AddFeatureComponent,
    FeatureDetailComponent,
    RoleFeatureComponent,
    MonthlyTransactionalReportComponent,
    ManagementReportComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    CommonModule,
    CountdownModule,
    ChartsModule,
    WebcamModule,
    NgxQRCodeModule,
    BrowserAnimationsModule
    ],
  providers: [    
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
