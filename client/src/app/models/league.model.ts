import {Game} from '@models/game.model';
import {TeamMember} from '@models/team-member.model';

export class League {
  id: string;
  description: string;
  year: string;
  fee: number;
  roster: TeamMember[];
  schedule: Game[];
}
