import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './Admin/components/add-admin/add-admin.component';
import { AdminDetailComponent } from './Admin/components/admin-detail/admin-detail.component';
import { LoginComponent } from './user-sub-system/login/login.component';
import { AddLocationComponent } from './Admin/Location/add-location/add-location.component';
import { LocationDetailComponent } from './Admin/Location/location-detail/location-detail.component';
import { EmployeeTeamsComponent } from './Employee/employee-teams/employee-teams.component';
import { EmployeeTeamDetailComponent } from './Employee/employee-team-detail/employee-team-detail.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { MeetingDetailComponent } from './Admin/Meeting/meeting-detail/meeting-detail.component';
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
import { ClientListComponent } from './Admin/Client/client-list/client-list.component';
import { SlotsDetailComponent } from './Admin/Meeting/slots-detail/slots-detail.component';
import { AddSlotComponent } from './Admin/Meeting/add-slot/add-slot.component';
import { AddEnquiryComponent } from './client-sub-system/Enquiries/add-enquiry/add-enquiry.component';
import { EnquiryComponent } from './client-sub-system/Enquiries/enquiry/enquiry.component';
import { ClientEnquiryComponent } from './Admin/ClientEnquiry/client-enquiry/client-enquiry.component';
import { ClientEnquiryDetailComponent } from './Admin/ClientEnquiry/client-enquiry-detail/client-enquiry-detail.component';
import { EnquiryResponseComponent } from './client-sub-system/Enquiries/enquiry-response/enquiry-response.component';
import { AddProductSizeComponent } from './product-sub-system/add-product-size/add-product-size.component';
import { AddProductTypeComponent } from './product-sub-system/add-product-type/add-product-type.component';
import { ProductSizeDetailComponent } from './product-sub-system/product-size-detail/product-size-detail.component';
import { ProductTypeDetailComponent } from './product-sub-system/product-type-detail/product-type-detail.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { EmployeeService } from './services/employee/employee.service';
import { EmployeeProfileComponent } from './employee-sub-system/employee-profile/employee-profile.component';
import { ViewEmployeeProfileComponent } from './employee-sub-system/view-employee-profile/view-employee-profile.component';
import { ClientSignUpComponent } from './user-sub-system/client-sign-up/client-sign-up.component';
import { EmployeeDetailComponent } from './Employee/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { IsLoggedInGuard } from './user-sub-system/is-logged-in.guard';
import { AttendanceComponent } from './Admin/Team/attendance/attendance.component';
import { AddTeamComponent } from './Admin/Team/add-team/add-team.component';
import { ManageTeamComponent } from './Admin/Team/manage-team/manage-team.component';
import { TeamsDetailComponent } from './Admin/Team/teams-detail/teams-detail.component';
import { TeamsAttendanceHistoryComponent } from './Admin/teams-attendance-history/teams-attendance-history.component';
import { ClientMeetingSlotsComponent } from './client-sub-system/meetings/client-meeting-slots/client-meeting-slots.component';
import { ClientMeetingComponent } from './client-sub-system/meetings/client-meeting/client-meeting.component';
import { HomeComponent } from './Home/home/home.component';
import { AddDeliveryTypeComponent } from './order-sub-system/add-delivery-type/add-delivery-type/add-delivery-type.component';
import { CheckoutComponent } from './order-sub-system/checkout/checkout/checkout.component';
import { DeliveryTypeComponent } from './order-sub-system/delivery-type/delivery-type/delivery-type.component';
import { OrderProductComponent } from './order-sub-system/order-product/order-product/order-product.component';
import { ShoppingCartComponent } from './order-sub-system/shopping-cart/shopping-cart/shopping-cart.component';
import { AttendanceReportComponent } from './report-sub-system/attendance-report/attendance-report.component';
import { ClientReportComponent } from './report-sub-system/client-report/client-report.component';
import { HalfYearlyEmployeeReportComponent } from './report-sub-system/half-yearly-employee-report/half-yearly-employee-report.component';
import { MonthlyEmployeeRegisterReportComponent } from './report-sub-system/monthly-employee-register-report/monthly-employee-register-report.component';
import { MonthlySalesReportComponent } from './report-sub-system/monthly-sales-report/monthly-sales-report.component';
import { MonthlyStockReportComponent } from './report-sub-system/monthly-stock-report/monthly-stock-report.component';
import { OrderHistoryComponent } from './client-sub-system/order-history/order-history.component';
import { OrderDetailComponent } from './client-sub-system/order-detail/order-detail.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent
  },
  {
    path:"signup",
    component:ClientSignUpComponent
  },
  {
    path:"reset",
    children:[
      {
        path:"initial",
        component:ResetPasswordInitialStepComponent
      }
    ]
  },
  {
    path:"order",
    canActivate:[IsLoggedInGuard],
    children:[
      {
        path:"deliveryType",
        children:[
          {
            path:"detail",
            component:DeliveryTypeComponent
          },
          {
            path:"add/:id",
            component:AddDeliveryTypeComponent
          }
        ]
      }
    ]
  },
  {
    path: "client",
    canActivate:[IsLoggedInGuard],
    children: [
      {
        path: "list",
        component: ClientListComponent
      },
      {
        path: "add/:id",
        component: AddClientComponent
      },
      {
        path: "profile",
        component: ClientProfileComponent
      },
      {
        path: "enquiry",
        component: ClientEnquiryComponent
      },
      {
        path:"cart",
        component:ShoppingCartComponent
      },
      {
        path:"checkout",
        component:CheckoutComponent
      },
      {
        path:"meeting",
        children:[
          {
            path:"slots",
            component:ClientMeetingSlotsComponent
          },
          {
            path: "detail",
            component: ClientMeetingComponent
          },    
        ]
      },
      {
        path:"enquiry",
        children:[
          {
            path:"add/:id",
            component:AddEnquiryComponent
          },
          {
            path:"detail",
            component:EnquiryComponent
          },
          {
            path:"response/:id",
            component:EnquiryResponseComponent
          }
        ]
      },
      {
        path:"product",
        children:[
          {
            path:"list",
            component:OrderProductComponent
          }
        ]
      },
      {
        path:"orders",
        children:[
          {
            path:"history",
            component:OrderHistoryComponent
          },
          {
            path:"detail/:id",
            component:OrderDetailComponent
          }
        ]
      },

    ]
  },
  {
    path: "admin",
    canActivate:[IsLoggedInGuard],
    children: [
      {
        path:"audit",
        component:AuditComponent
      },
      {
        path: "detail",
        component: AdminDetailComponent
      },
      {
        path: "add/:id",
        component: AddAdminComponent
      },
      {
        path: "teams-detail",
        component: TeamsDetailComponent
      },
      {
        path: "add-team/:id",
        component: AddTeamComponent
      },
      {
        path: "add-location/:id",
        component: AddLocationComponent
      },
      {
        path: "location-detail",
        component: LocationDetailComponent
      },
      {
        path: "meeting-detail",
        component: MeetingDetailComponent
      },
      {
        path: "client-list",
        component: ClientListComponent
      },
      {
        path: "enquiry-type-detail",
        component: EnquiryTypeDetailComponent
      },
      {
        path: "add-enquiry-type/:id",
        component: AddEnquiryTypeComponent
      },
      {
        path: "client-order-detail",
        component: ClientOrderDetailComponent
      },
      {
        path: "view-client-order-detail/:id",
        component: ViewClientOrderDetailComponent
      },
      {
        path: "stock-detail",
        component: StockDetailComponent
      },{
        path: "wire-off-stock",
        component: WireOffStockComponent
      },
      {
        path:"report",
        children:[
          {
            path:"monthly-stock",
            component:MonthlyStockReportComponent
          },
          {
            path:"monthly-sales",
            component:MonthlySalesReportComponent
          },
          {
            path:"registration-report",
            component:MonthlyEmployeeRegisterReportComponent
          },
          {
            path:"half-yearly-employee-report",
            component:HalfYearlyEmployeeReportComponent
          }
          ,
          {
            path:"client-report",
            component:ClientReportComponent
          }
          ,
          {
            path:"attendance-report",
            component:AttendanceReportComponent
          }
        ]
      }
      ,
      {
        path:"location",
        children:[
          {
            path:"add/:id",
            component:AddLocationComponent
          },
          {
            path:"detail",
            component:LocationDetailComponent
          }
        ]
      },
      {
        path:"team",
        children:[
          {
            path:"add/:id",
            component:AddTeamComponent
          },
          {
            path:"detail",
            component:TeamsDetailComponent
          }
          ,
          {
            path:"manage/:id",
            component:ManageTeamComponent
          },
          {
            path:"attendance/:id",
            component:AttendanceComponent
          },
          {
            path:"attendanceHistory",
            component:TeamsAttendanceHistoryComponent
          }
        ]
      },
      {
        path:"meeting",
        children:[
          {
            path:"slot-detail",
            component:SlotsDetailComponent
          },
          {
            path:"add-slot/:id",
            component:AddSlotComponent
          },
          {
            path:"detail",
            component:MeetingDetailComponent
          }
        ]
      },
      {
        path:"enquiry",
        children:[
          {
            path:"detail",
            component:ClientEnquiryComponent
          }
          ,
          {
            path:"view/:id",
            component:ClientEnquiryDetailComponent
          }
        ]
      },
      {
        path: "product",
        children: [
          {
            path: "add/:id",
            component: AddProductComponent
          },
          {
            path: "list",
            component: ProductListComponent
          },
          {
            path:"size",
            children:[
              {
                path:"add/:id",
                component:AddProductSizeComponent
              },
              {
                path:"detail",
                component:ProductSizeDetailComponent
              }
            ]
          },
          {
            path:"type",
            children:[
              {
                path:"add/:id",
                component:AddProductTypeComponent
              },
              {
                path:"detail",
                component:ProductTypeDetailComponent
              }
            ]
          }
        ]
      },
      {
        path:"orders",
        children:[
          {
            path:"all",
            component:ClientOrderDetailComponent
          },
          {
            path:"detail/:id",
            component:ViewClientOrderDetailComponent
          }
        ]
      }
      ,
     {
      path:"stock",
      children:[
        {
          path:"detail",
          component:StockDetailComponent
        },
        {
          path:"wireoff/:id",
          component:WireOffStockComponent
        }
      ]
     }
    ]
  },
  {
    path: "employee",
    canActivate:[IsLoggedInGuard],
    children: [
      {
        path: "detail",
        component: EmployeeDetailComponent
      },
      {
        path: "add/:id",
        component: AddEmployeeComponent
      }
      ,
      {
        path: "teams",
        component: EmployeeTeamsComponent
      },
      {
        path: "team-detail",
        component: EmployeeTeamDetailComponent
      },
      {
        path: "register",
        component: EmployeeRegisterComponent
      },
      {
        path:"profile/:teamId/:employeeId",
        component:EmployeeProfileComponent
      },
      {
        path:"viewProfile/:employeeUserId",
        component:ViewEmployeeProfileComponent
      }
    ]
  },
  {
    path: "home",
    canActivate:[IsLoggedInGuard],
    component: HomeComponent
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
