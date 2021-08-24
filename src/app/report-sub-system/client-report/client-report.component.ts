import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2PDF from 'jspdf-html2canvas';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.css']
})
export class ClientReportComponent implements OnInit {

  selectedClient: any={};

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


  generateReport(client: any)
  {
    debugger
    this.selectedClient=client;
    setTimeout(() => {
    var element=document.getElementById("clientData");
        html2PDF(element, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      output: `${this.selectedClient.initials}'s_Report.pdf`
    });
}, 1000);

    
  }

}

