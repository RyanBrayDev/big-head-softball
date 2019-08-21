import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Game } from '@models/game.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GameFormComponent } from '@components/game-form/game-form.component';
import { TeamService } from '@app/services/team/team.service';

@Component({
  selector: 'bh-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() schedule: Game[];

  private gameDialogRef: MatDialogRef<GameFormComponent>;
  // private lineupDialogRef: MatDialogRef<LineupComponent>;

  constructor(private teamService: TeamService, private dialogService: MatDialog) {
  }

  ngOnInit() {
  }

  createGame() {
    this.gameDialogRef = this.dialogService.open(GameFormComponent);
    this.gameDialogRef.componentInstance.closeRequested.subscribe(() => this.gameDialogRef.close());
  }

  updateGame(game: Game) {
    this.gameDialogRef = this.dialogService.open(GameFormComponent);
    this.gameDialogRef.componentInstance.game = game;
    this.gameDialogRef.componentInstance.closeRequested.subscribe(() => this.gameDialogRef.close());
  }

  deleteGame(game: Game) {
    //this.teamService.deleteGame(game);
  }

  // editLineup(game: Game) {
  //   this.lineupDialogRef = this.dialogService.open(LineupComponent);
  //   this.lineupDialogRef.componentInstance.lineup = game.lineup
  //     ? game.lineup
  //     : this.teamService.selectedLeague$.getValue().roster.map((teamMember, index) => {
  //       const player = new Player();
  //       player.name = teamMember.name;
  //       player.order = index;
  //       return player;
  //     });
  //   this.lineupDialogRef.componentInstance.closeRequested.subscribe(() => this.lineupDialogRef.close());

  // }
}
