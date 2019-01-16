import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamSelectorComponent } from '@components/team-selector/team-selector.component';
import { TeamMemberFormComponent } from '@components/team-member-form/team-member-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { GameFormComponent } from './game-form/game-form.component';
import { ManagerPanelComponent } from './manager-panel/manager-panel.component';
import { LeagueSelectorComponent } from './league-selector/league-selector.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    DragDropModule,
    RouterModule
  ],
  exports: [
    TeamSelectorComponent,
    TeamMemberFormComponent,
    HeaderComponent,
    GameFormComponent,
    ManagerPanelComponent,
    LeagueSelectorComponent,
  ],
  declarations: [
    TeamSelectorComponent,
    TeamMemberFormComponent,
    HeaderComponent,
    GameFormComponent,
    ManagerPanelComponent,
    LeagueSelectorComponent,
  ],
  entryComponents: [
    TeamMemberFormComponent,
    GameFormComponent,
  ],
})
export class ComponentsModule {
}
