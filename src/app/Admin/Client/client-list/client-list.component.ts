import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  selectedClient: any;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  clientData: any[] = []
  searchTerm:string;
  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    debugger
    this.clientService.getAllClients().subscribe(data => {
      console.log(data);
      this.clientData = data.clients;
    });
  }

  editClient(client: any) {
    this.router.navigateByUrl(`/client/add/${client.clientId}`);
  }


  addClient() {
    this.router.navigateByUrl(`/client/add/0`);
  }

  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'Search field is empty!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    this.clientService.searchClientByName(this.searchTerm).subscribe(response=>{
      if(response.clients.length!=null&&response.clients.length!=0)
        this.clientData = response.clients;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: 'No search result found!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  confirmDeleteion() {
    console.log(this.selectedClient);
    this.clientService.deleteClient(this.selectedClient.userId).subscribe(response => {
      if(response.statusCode==200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'client deleted successfully!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.getAllClients();
      }
      console.log(response);
    });
  }

  deleteClient(client: any)
  {
    this.selectedClient=client;
  }
  


}
