import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService } from '@app/services/team.service';
import { Router } from '@angular/router';
import { Team } from '@app/models/team.model';

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  teams$: Observable<Team[]>;
  selectedTeam$: Observable<Team>;

  constructor(private teamService: TeamService, private router: Router) {
  }

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.selectedTeam$ = this.teamService.selectedTeam$;
  }

  onTeamSelected(team: Team) {
    console.log('You selected: ' + team.name);
    this.router.navigate(['team', team._id]);
  }

}
