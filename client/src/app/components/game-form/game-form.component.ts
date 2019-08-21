import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Game} from '@models/game.model';
import {TeamMember} from '@models/team-member.model';
import {TeamService} from '@app/services/team/team.service';

@Component({
  selector: 'bh-add-game',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  gameForm: FormGroup;

  @Input() game: Game;
  @Output() submitted = new EventEmitter<TeamMember>();
  @Output() closeRequested = new EventEmitter<TeamMember>();

  constructor() {
  }

  ngOnInit() {
    this.gameForm = new FormGroup({
      location: new FormControl(this.game ? this.game.location : ''),
      fieldNumber: new FormControl(this.game ? this.game.fieldNumber : ''),
      opponent: new FormControl(this.game ? this.game.opponent : ''),
      date: new FormControl(this.game ? this.game.date : ''),
      time: new FormControl(this.game ? this.game.time : ''),
      id: new FormControl(this.game ? this.game.id : ''),
    });
  }

  close() {
    console.log('form cancelled');
    this.closeRequested.emit(null);
  }

  onSubmit() {
    console.log('Updating game submitted');
    this.submitted.emit(this.gameForm.value);
    // if (this.game) {
    //   this.teamService.updateGame(this.gameForm.value);
    // } else {
    //   this.teamService.createGame(this.gameForm.value);
    // }
    this.close();
  }

}
