import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataService: DataService) { }

  getUserTypes() {
    return this.dataService.genericCaller("get", "User/UserTypes/All", "");
  }

  getAudit() {
    return this.dataService.genericCaller("get", "User/Audit", "");
  }
}
