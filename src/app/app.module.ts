import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { OrderComponent } from './admin/Order/order/order.component';
import { ClientOrderDetailComponent } from './admin/Order/client-order-detail/client-order-detail.component';
import { ViewClientOrderDetailComponent } from './admin/Order/view-client-order-detail/view-client-order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AuditComponent,
    OrderComponent,
    ClientOrderDetailComponent,
    ViewClientOrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
