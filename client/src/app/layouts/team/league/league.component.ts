import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '@app/services/team.service';
import { League } from '@app/models/league.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bh-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  @Input() league: League;

  constructor(private teamService: TeamService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const teamId = params['teamId'];
      const leagueId = params['leagueId'];
      if (teamId && leagueId) {
        this.league = this.teamService.findLeague(teamId, leagueId);
      }
    });
  }

}
