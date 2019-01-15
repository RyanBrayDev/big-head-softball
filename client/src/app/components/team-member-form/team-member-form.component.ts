import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TeamMember} from '@models/team-member.model';
import {TeamService} from '@services/team.service';

@Component({
  selector: 'bh-add-team-member',
  templateUrl: './team-member-form.component.html',
  styleUrls: ['./team-member-form.component.scss']
})
export class TeamMemberFormComponent implements OnInit {
  @Input() teamMember: TeamMember;
  @Output() closeRequested = new EventEmitter<TeamMember>();
  @Output() submitted = new EventEmitter<TeamMember>();
  teamMemberForm: FormGroup;
  playingStatuses = ['Full Time', 'Part Time', 'Sub'];

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamMemberForm = new FormGroup({
      name: new FormControl(this.teamMember ? this.teamMember.name : ''),
      status: new FormControl(this.teamMember ? this.teamMember.status : ''),
      amountOwed: new FormControl(this.teamMember ? this.teamMember.amountOwed : ''),
      amountPaid: new FormControl(this.teamMember ? this.teamMember.amountPaid : ''),
      email: new FormControl(this.teamMember ? this.teamMember.email : ''),
      phone: new FormControl(this.teamMember ? this.teamMember.phone : ''),
      id: new FormControl(this.teamMember ? this.teamMember.id : ''),
    });
  }

  close() {
    console.log('form cancelled');
    this.closeRequested.emit(null);
  }

  onSubmit() {
    console.log('Updating team form submitted');
    this.submitted.emit(this.teamMemberForm.value);
    // if (this.teamMember) {
    //   this.teamService.updateTeamMember(this.teamMemberForm.value);
    // } else {
    //   this.teamService.createTeamMember(this.teamMemberForm.value);
    // }
    this.close();
  }
}
