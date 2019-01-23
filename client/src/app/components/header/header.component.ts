import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '@app/models/team.model';
import { TeamFormComponent } from '../team-form/team-form.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  teams$: Observable<Team[]>;
  private dialogRef: MatDialogRef<TeamFormComponent>;

  constructor(private dialogService: MatDialog) {
  }

  createTeam() {
    console.log('create team clicked');
    this.dialogRef = this.dialogService.open(TeamFormComponent);
    this.dialogRef.componentInstance.closeRequested.subscribe(() => this.dialogRef.close());
    this.dialogRef.componentInstance.submitted.subscribe(() => {
    });
  }
}
