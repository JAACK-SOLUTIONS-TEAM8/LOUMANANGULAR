import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  clientData:any={}
  clientId!:number;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private clientService:ClientService
  ) { 
    this.route.params.subscribe(params=>{
      this.clientId=params["id"];
    })
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.clientId).subscribe(response=>{
      this.clientData=response.client
    })
  }

}
