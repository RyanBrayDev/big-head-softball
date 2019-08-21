import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Team } from '@models/team.model';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamService {
  
  private teamsUrl = `${environment.apiUrl}/teams/`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: {
      manager: 'Ryan Bray'
    }
  };

  cache: Team[] = null;

  constructor(private http: HttpClient) {
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl, this.httpOptions);
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(this.teamsUrl + teamId);
  }

  addTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(this.teamsUrl, team, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateTeam(team: Team): Observable<Team> {
    const url = this.teamsUrl + team._id;
    return this.http.put<Team>(url, team, this.httpOptions).pipe(
      catchError(this.handleError)
    );
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
