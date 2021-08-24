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
        
        ]
      }
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



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
