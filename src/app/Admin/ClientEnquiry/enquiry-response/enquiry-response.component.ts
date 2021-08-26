import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enquiry-response',
  templateUrl: './enquiry-response.component.html',
  styleUrls: ['./enquiry-response.component.css']
})
export class EnquiryResponseComponent implements OnInit {

  enquiry
  constructor(
    private route:ActivatedRoute
  ) { 
    this
  }

  ngOnInit(): void {
  }

}
