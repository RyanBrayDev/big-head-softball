import { Injectable } from '@angular/core';
import { Team } from '@app/models/team.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedTeamService {
  selectedTeam$: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);

  constructor() { }

  selectTeam(team: Team): void {
    console.log(`Selecting team: ${team.name}`);
    this.selectedTeam$.next(team);
  }
}
