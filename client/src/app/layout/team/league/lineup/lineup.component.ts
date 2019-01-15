import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Player} from '@models/player.model';
import {TeamMember} from '@models/team-member.model';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'bh-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.scss']
})
export class LineupComponent implements OnInit {
  @Input() lineup: Player[];
  @Output() closeRequested = new EventEmitter<TeamMember>();

  positions = ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'LC', 'RC', 'RF'];

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    console.log('form cancelled');
    this.closeRequested.emit(null);
  }

  onSubmit() {
    console.log('Updating game submitted');
    this.close();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lineup, event.previousIndex, event.currentIndex);
  }

}
