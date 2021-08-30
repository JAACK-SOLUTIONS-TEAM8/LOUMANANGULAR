import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(
    private dataService:DataService
  ) { }

  getAllSlots() {
    debugger
    return this.dataService.genericCaller("get", "Meeting/Slot/All", "");
  }

  addSlot(slotData: any) {
    debugger
    return this.dataService.genericCaller("post", "Meeting/Slot/Add", slotData);
  }

  getSlotById(slotId: number) {
    debugger
    return this.dataService.genericCaller("get", `Meeting/Slot/${slotId}`, "");
  }

  deleteSlot(slotId: number) {
    debugger
    return this.dataService.genericCaller("get", `Meeting/Slot/Delete/${slotId}`, "");
  }

  searchSlotByDate(searchDate:string)
  {
    return this.dataService.genericCaller("get","Meeting/Slot/Search?date="+searchDate,"");
  }

  bookSlot(slotId:number,clientId:number)
  {
    return this.dataService.genericCaller("get",`Meeting/Slot/Book?slotId=${slotId}&clientUserId=${clientId}`,"");

  }

  getBookedSlotsByAdmin(adminUserId:number)
  {
    return this.dataService.genericCaller("get",`Meeting/AdminSlots/BookedSlots/${adminUserId}`,"");
  }

  getBookedSlotsByClient(clientUserId:number)
  {
    return this.dataService.genericCaller("get",`Meeting/ClientSlots/BookedSlots/${clientUserId}`,"");
  }

  cancelMeeting(slotId:number)
  {
    return this.dataService.genericCaller("get",`Meeting/BookedSlots/Cancel/${slotId}`,"");
  }
  
  searchBookedSlotsByAdmin(adminUserId:number,date:string)
  {
    return this.dataService.genericCaller("get",`Meeting/AdminSlots/SearchSlots?userId=${adminUserId}&date=${date}`,"");
  }

  searchBookedSlotsByClient(clientUserId:number,date:string)
  {
    return this.dataService.genericCaller("get",`Meeting/ClientSlots/SearchSlots?userId=${clientUserId}&date=${date}`,"");
  }
}
