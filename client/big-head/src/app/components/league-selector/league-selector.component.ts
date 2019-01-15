import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {League} from '@models/league.model';

@Component({
  selector: 'bh-league-selector',
  templateUrl: './league-selector.component.html',
  styleUrls: ['./league-selector.component.scss']
})
export class LeagueSelectorComponent implements OnInit {

  @Input() leagues: League[];

  @Output() leagueSelected = new EventEmitter<League>();

  selectedLeague: League;

  constructor() {
  }

  ngOnInit() {
  }

  onSelected(league: League) {
    if (league) {
      this.leagueSelected.emit(league);
    }
  }
}
