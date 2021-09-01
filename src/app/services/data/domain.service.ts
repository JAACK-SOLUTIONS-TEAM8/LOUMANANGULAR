import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  //domain: string = "https://localhost:44383"
  domain:string="https://loumanapi.azurewebsites.net"
  constructor() { }

  getDomain() {
    return this.domain;
  }
}
