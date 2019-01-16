import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '@models/team.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bh-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  @Input() teams: Team[];
  @Input() selectedTeam: Team;
  @Output() teamSelected = new EventEmitter<Team>();

  constructor() {
  }

  ngOnInit() {
    console.log("selecting in header" + this.selectedTeam);
  }

  onSelected(team: Team) {
    if (team) {
      this.teamSelected.emit(team);
    }
  }
}
