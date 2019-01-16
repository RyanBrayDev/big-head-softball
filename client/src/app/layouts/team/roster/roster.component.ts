import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {TeamMember} from '@models/team-member.model';
import {TeamMemberFormComponent} from '@components/team-member-form/team-member-form.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TeamService} from '@services/team.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bh-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {
  private dialogRef: MatDialogRef<TeamMemberFormComponent>;
  
  @Input() roster: TeamMember[];

  constructor(private teamService: TeamService, private dialogService: MatDialog) {
  }

  ngOnInit() {
    //this.leagueSubscription = this.teamService.selectedLeague$.subscribe(league => this.roster = league ? league.roster : null);
  }

  createTeamMember() {
    this.dialogRef = this.dialogService.open(TeamMemberFormComponent);
    this.dialogRef.componentInstance.closeRequested.subscribe(() => this.dialogRef.close());
  }

  updateMember(teamMember: TeamMember) {
    this.dialogRef = this.dialogService.open(TeamMemberFormComponent);
    this.dialogRef.componentInstance.teamMember = teamMember;
    this.dialogRef.componentInstance.closeRequested.subscribe(() => this.dialogRef.close());
  }

  deleteMember(teamMember: TeamMember) {
    //this.teamService.deleteTeamMember(teamMember);
  }
}
