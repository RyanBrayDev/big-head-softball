import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatListModule, MatSidenavModule, MatDrawer } from '@angular/material';
import { TeamComponent } from '@layouts/team/team.component';
import { ComponentsModule } from '@components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleComponent } from '@layouts/team/league/schedule/schedule.component';
import { RosterComponent } from '@layouts/team/league/roster/roster.component';
import { LineupComponent } from '@layouts/team/league/lineup/lineup.component';
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
    TeamRoutingModule,
    MatSidenavModule,
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
