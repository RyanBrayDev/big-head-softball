import {League} from '@models/league.model';

export class Team {
  _id: string;
  name: string;
  manager: string;
  leagues: League[];
}
