import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private dataService:DataService,
    
  ) { }


  getAllClients() {
    debugger
    return this.dataService.genericCaller("get", "Client/All", "");
  }

  addClient(clientData: any) {
    debugger
    return this.dataService.genericCaller("post", "Client/Add", clientData);
  }


}
