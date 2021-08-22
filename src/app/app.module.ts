import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuditComponent } from './Admin/Audit/audit/audit.component';
import { CommonModule } from '@angular/common';
import { AddSlotComponent } from './Admin/Meeting/add-slot/add-slot.component';
import { MeetingDetailComponent } from './Admin/Meeting/meeting-detail/meeting-detail.component';
import { SlotsDetailComponent } from './Admin/Meeting/slots-detail/slots-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AuditComponent,
    AddSlotComponent,
    MeetingDetailComponent,
    SlotsDetailComponent,
    
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
