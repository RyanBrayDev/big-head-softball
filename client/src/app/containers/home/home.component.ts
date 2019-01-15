import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from '@services/team.service';
import {Team} from '@models/team.model';
import {Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs';

@Component({
  selector: 'bh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teams$: Observable<Team[]>;

  constructor(private teamService: TeamService, private router: Router) {
  }

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
  }

  onTeamSelected(team: Team) {
    console.log('You selected: ' + team.name);
    this.router.navigate(['team', team._id]);
  }
}
