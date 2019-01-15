import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '@models/team.model';

@Component({
  selector: 'bh-team-selector',
  templateUrl: './team-selector.component.html',
  styleUrls: ['./team-selector.component.scss']
})
export class TeamSelectorComponent implements OnInit {
  @Input() teams: Team[];

  @Output() teamSelected = new EventEmitter<Team>();

  selectedTeam: Team;

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(team: Team) {
    if (team) {
      this.teamSelected.emit(team);
    }
  }
}
