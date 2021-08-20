import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  domain: string = "";
  constructor(private http: HttpClient, private domainService: DomainService) {

    this.domain = this.domainService.getDomain();
  }


  genericCaller(mehtod: string, endpoint: string, data: any): Observable<any> {
    var url = `${this.domain}/api/${endpoint}`;
    debugger
    if (mehtod.toLocaleLowerCase() == "get") {
      return this.http.get(url, { responseType: "json" })
    }
    else if (mehtod.toLocaleLowerCase() == "post") {
      return this.http.post(url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    }
    return new Observable();

  }
}
