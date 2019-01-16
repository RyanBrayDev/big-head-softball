import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatSidenavModule, MatDrawer, MatExpansionModule } from '@angular/material';
import { TeamComponent } from '@layouts/team/team.component';
import { ComponentsModule } from '@components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from '@layouts/team/schedule/schedule.component';
import { RosterComponent } from '@layouts/team/roster/roster.component';
import { LineupComponent } from '@layouts/team/schedule/lineup/lineup.component';
import { TeamRoutingModule } from './team.routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    TeamRoutingModule,
    MatSidenavModule,
    MatExpansionModule,
    DragDropModule,
  ],
  exports: [
    TeamComponent,
    ScheduleComponent,
    RosterComponent,
    LineupComponent,
  ],
  declarations: [
    TeamComponent,
    ScheduleComponent,
    RosterComponent,
    LineupComponent,
  ]
})
export class TeamModule { }
