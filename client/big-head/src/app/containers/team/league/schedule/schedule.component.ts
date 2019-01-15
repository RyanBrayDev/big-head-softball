import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Game } from '@models/game.model';
import { MatDialog, MatDialogRef } from '@angular/material';
import { GameFormComponent } from '@components/game-form/game-form.component';
import { TeamService } from '@services/team.service';
import { Subscription, Observable } from 'rxjs';
import { Player } from "@models/player.model";
import { League } from '@app/models/league.model';
// import { LineupComponent } from "@components/lineup/lineup.component";

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
    console.log('schedule component');
    // this.leagueSubscription = this.teamService.selectedLeague$.subscribe(league => this.schedule = league ? league.schedule : null);
    // this.selectedLeague$ = this.teamService.selectedLeague$;
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
