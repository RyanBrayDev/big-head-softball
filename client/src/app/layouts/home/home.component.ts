import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeamService} from '@app/services/team/team.service';
import {Team} from '@models/team.model';
import {Router} from '@angular/router';
import {Subscription, Observable} from 'rxjs';

@Component({
  selector: 'bh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
