import { LeagueModule } from './league.module';

describe('LeagueModule', () => {
  let leagueModule: LeagueModule;

  beforeEach(() => {
    leagueModule = new LeagueModule();
  });

  it('should create an instance', () => {
    expect(leagueModule).toBeTruthy();
  });
});
