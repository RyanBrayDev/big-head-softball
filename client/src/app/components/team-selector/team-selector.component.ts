import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Team } from '@models/team.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectedTeamService } from '@app/services/selected-team.service';
import { TeamService } from '@app/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bh-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  teams$: Observable<Team[]>;
  selectedTeam$: Observable<Team>;

  constructor(
    private teamService: TeamService,
    private selectedTeamService: SelectedTeamService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.selectedTeam$ = this.selectedTeamService.selectedTeam$;
  }

  onSelected(team: Team) {
    if (team) {
      this.selectedTeamService.selectTeam(team);
      this.router.navigate(['team', team._id]);
    }
  }
}
