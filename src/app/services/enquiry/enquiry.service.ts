import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(
    private dataService:DataService
  ) { }

  getAllEnquiryTypes() {
    debugger
    return this.dataService.genericCaller("get", "Enquiry/EnquiryType/All", "");
  }

  addEnquiryType(enquiryData: any) {
    debugger
    return this.dataService.genericCaller("post", "Enquiry/EnquiryType/Add", enquiryData);
  }

  getEnquiryTypeById(enquiryTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/EnquiryType/${enquiryTypeId}`, "");
  }

  deleteEnquiryType(enquiryTypeId: number) {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/EnquiryType/Delete/${enquiryTypeId}`, "");
  }

  searchEnquiryTypeByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Enquiry/EnquiryType/Search?name="+searchTerm,"");
  }


  

  getAllEnquiry() {
    debugger
    return this.dataService.genericCaller("get", "Enquiry/All", "");
  }

  getAllClientEnquiry(clientUserId:number) {
    debugger
    return this.dataService.genericCaller("get", "Enquiry/ClientEnquiry/All?clientUserId="+clientUserId, "");
  }

  addEnquiry(enquiryData: any) {
    debugger
    return this.dataService.genericCaller("post", "Enquiry/Add", enquiryData);
  }

  getEnquiryById(enquiryId: number) {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/${enquiryId}`, "");
  }

  deleteEnquiry(enquiryId: number) {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/Delete/${enquiryId}`, "");
  }

  searchEnquiryByName(searchTerm:string)
  {
    return this.dataService.genericCaller("get","Enquiry/Search?name="+searchTerm,"");
  }


  getAllAdminEnquiries() {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/AdminEnquries`, "");
  }

  getAllAdminEnquiriesByTypeId(enquiryTypeId:number) {
    debugger
    return this.dataService.genericCaller("get", `Enquiry/AdminEnquriesById?enquiryTypeId=${enquiryTypeId}`, "");
  }

  submitEnquiryResponse(enquiryDetail:any)
  {
    return this.dataService.genericCaller("post", `Enquiry/Response/Add`, enquiryDetail);
  }

  getEnquiryWithResponseById(enquiryId:number)
  {
    return this.dataService.genericCaller("get", `Enquiry/WithResponse/${enquiryId}`, "");
  }
}
