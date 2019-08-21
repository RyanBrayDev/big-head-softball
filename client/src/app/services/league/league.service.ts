import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Team } from '@app/models/team.model';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { League } from '@app/models/league.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  
  private baseUrl = `${environment.apiUrl}/leagues/`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  cache: Team[] = null;

  constructor(private http: HttpClient) {
  }

  getLeagues(): Observable<League[]> {  
    return this.http.get<League[]>(this.baseUrl, this.httpOptions);
  }

  getTeam(teamId: string): Observable<Team> {
    return this.http.get<Team>(this.baseUrl + teamId);
  }

  addTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(this.baseUrl, team, this.httpOptions);
  }

  updateTeam(team: Team): Observable<Team> {
    const url = this.baseUrl + team._id;
    return this.http.put<Team>(url, team, this.httpOptions);
  }
}
