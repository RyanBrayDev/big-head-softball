import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeamService } from '@services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Team } from '@models/team.model';
import { League } from '@app/models/league.model';

@Component({
  selector: 'bh-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public team$: BehaviorSubject<Team>;
  public league: League;

  constructor(private teamService: TeamService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.team$ = this.teamService.selectedTeam$;
    this.route.params.subscribe(params => console.log(params));
    this.route.params.subscribe(params => {
      const teamId = params['teamId'];
      if (teamId && (!this.team$.value || this.team$.value._id !== teamId)) {
        this.teamService.selectTeamById(teamId);
        console.log('selecting teamid:' + teamId);
      }
    });
  }

  onLeagueSelected(league: League) {
    console.log('You selected: ' + league.description);
    console.log(this.route);
    //this.router.navigate(['../league', league.id], { relativeTo: this.route });
    this.league = league;
  }
}
