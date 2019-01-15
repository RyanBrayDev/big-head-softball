import {Player} from '@models/player.model';

export class Game {
  id: string;
  location: string;
  fieldNumber: number;
  date: Date;
  time: string;
  opponent: string;
  lineup: Player[];
}
