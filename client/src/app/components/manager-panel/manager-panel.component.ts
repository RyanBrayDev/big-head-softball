import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TeamMember} from '@models/team-member.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {TeamMemberFormComponent} from '@components/team-member-form/team-member-form.component';
import {Subscription} from 'rxjs';
import {TeamService} from '@services/team.service';

@Component({
  selector: 'bh-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.scss']
})
export class ManagerPanelComponent {
  @Input() header: string;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Output() onCreate: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  create() {
    this.onCreate.emit();
  }

  update() {
    this.onUpdate.emit();
  }

}
