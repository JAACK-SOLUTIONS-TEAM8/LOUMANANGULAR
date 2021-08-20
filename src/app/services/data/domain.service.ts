import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  domain: string = "https://localhost:44357"
  constructor() { }

  getDomain() {
    return this.domain;
  }
}