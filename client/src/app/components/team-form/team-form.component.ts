import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Team } from '@app/models/team.model';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'bh-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  @Input() team: Team;
  @Output() closeRequested = new EventEmitter<Team>();
  @Output() submitted = new EventEmitter<Team>();
  teamForm: FormGroup;
  readonly DEFAULT_MANAGER = 'Ryan Bray';

  constructor() {
  }

  ngOnInit() {
    this.teamForm = new FormGroup({
      _id: new FormControl(this.team._id ? this.team._id : ''),
      name: new FormControl(this.team ? this.team.name : ''),
      manager: new FormControl(this.team ? this.team.manager : this.DEFAULT_MANAGER),
    });
  }

  close() {
    console.log('Team form closed');
    this.closeRequested.emit(null);
  }

  onSubmit() {
    console.log('Updating team form submitted');
    this.submitted.emit(this.teamForm.value);
    this.close();
  }
}