import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { Team } from '@models/team.model';
import { catchError } from 'rxjs/operators';
import { League } from '@app/models/league.model';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private domain = 'localhost:3000';
  private teamsUrl = `http://${this.domain}/api/teams/`;

  selectedTeam$: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    console.log('Loading teams...');
    return this.http.get<Team[]>(this.teamsUrl)
  }

  selectTeam(team: Team) {
    console.log(`Selecting team: ${team.name}`);
    this.selectedTeam$.next(team);
  }

  selectTeamById(teamId: string): Observable<Team> {
    const team$ = this.http.get<Team>(this.teamsUrl + teamId);
    team$.subscribe(this.selectedTeam$);
    return 
  }

  findLeague(teamId:string, leagueId: string): League {
    const team = this.getTeam(teamId);
    return team && this.selectedTeam$.value.leagues.find(league => league.id === leagueId);
  }

  getTeam(teamId: string): Observable<Team> {
    const team$ = this.http.get<Team>(this.teamsUrl + teamId);
    team$.subscribe(this.selectedTeam$);
    return team$;
  }

  updateTeam(team: Team) {
    console.log(`Updating: ${team.name}`);
    const url = this.teamsUrl + team._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.put<Team>(url, team, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe(val => {
      console.log('PUT call successful value returned in body', val);
    },
      response => {
        console.log('PUT call in error', response);
      },
      () => {
        this.getTeam(team._id);
        console.log('The PUT observable is now completed.');
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
