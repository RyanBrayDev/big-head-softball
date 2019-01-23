import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { League } from '@models/league.model';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'bh-league-selector',
  templateUrl: './league-selector.component.html',
  styleUrls: ['./league-selector.component.scss']
})
export class LeagueSelectorComponent implements OnInit {

  @Input() leagues: League[];
  @Output() leagueSelected = new EventEmitter<League>();
  selectedLeague: League;

  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  constructor() {
  }

  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  onSelected(leagues: League[]) {
    if (leagues && leagues.length > 0) {
      this.leagueSelected.emit(leagues[0]);
    }
  }

  addLeague(){
    
  }
}
