import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team/team.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teams-detail',
  templateUrl: './teams-detail.component.html',
  styleUrls: ['./teams-detail.component.css']
})
export class TeamsDetailComponent implements OnInit {

  selectedTeam: any;
  teamData:any[]=[];

  searchTerm!:string;

  constructor(
    private router: Router,
    private teamService:TeamService
  ) { }

  ngOnInit(): void {
    this.getAllTeams();
  }
  getAllTeams()
  {
    this.teamService.getAllTeams().subscribe(response=>{
      console.log(response)
        this.teamData=response.teams;
    });
  }

  deleteTeam(team:any)
  {
    this.selectedTeam=team;
  }

  confirmDeleteion()
  {
    this.teamService.deleteTeam(Number(this.selectedTeam.teamId)).subscribe(reponse=>{
      if(reponse.statusCode ==200)
      {
        console.log("team deleted successfully")
        this.getAllTeams();
      }
      else
      {
        console.log("team deletion failed")
        this.getAllTeams();
      }
    });
  }

  editTeam(team:any)
  {
      this.router.navigateByUrl(`/admin/team/add/${team.teamId}`);
  }


  searchByName()
  {
    if(this.searchTerm=="" || this.searchTerm==null)
    {
      Swal.fire({
        title: 'Warning!',
        text: 'search bar field is empty',
        icon: 'info',
        confirmButtonText: 'Ok'
      })
      return 
    }
    this.teamService.searchTeamByName(this.searchTerm).subscribe(response=>{
      console.log("search result")
      console.log(response)
      if(response.teams!=null&&response.teams.length!=0)
        this.teamService = response.teams;
      else
      {
        Swal.fire({
          title: 'Warning!',
          text: 'No search result found!',
          icon: 'info',
          confirmButtonText: 'Ok'
        })
        this.teamData = response.teams;
      }
    });
  }

  addTeamMembers(team:any)
  {
    this.router.navigateByUrl("/admin/team/manage/"+team.teamId)
  }

}
