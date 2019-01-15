import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule } from '@angular/material';
import { TeamComponent } from '@containers/team/team.component';
import { ComponentsModule } from '@components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from '@containers/team/league/schedule/schedule.component';
import { RosterComponent } from '@containers/team/league/roster/roster.component';
import { LineupComponent } from '@containers/team/league/lineup/lineup.component';
import { TeamRoutingModule } from './team.routing.module';
import { LeagueComponent } from './league/league.component';


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    TeamRoutingModule
  ],
  exports: [
    TeamComponent,
    ScheduleComponent,
    RosterComponent,
    LineupComponent,
    LeagueComponent,
  ],
  declarations: [
    TeamComponent,
    ScheduleComponent,
    RosterComponent,
    LineupComponent,
    LeagueComponent,
  ]
})
export class TeamModule { }
