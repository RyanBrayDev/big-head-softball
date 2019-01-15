import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Team} from '../../../models/team.model';
import {TeamService} from '../../../services/team.service';
import {Subscription} from 'rxjs';
import {League} from '@models/league.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'bh-team-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() team: Team;

  constructor() {
  }

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   const teamId = params['teamId'];
    //   if (teamId) {
    //     this.team = this.teamService.getTeam(teamId);
    //   }
    // });
  }

  // ngOnDestroy() {
  //   this.teamSubscription.unsubscribe();
  // }

  // onLeagueSelected(league: League) {
  //   console.log('You selected: ' + league.description);
  //   this.router.navigate(['league', league.id]);
  // }

}
