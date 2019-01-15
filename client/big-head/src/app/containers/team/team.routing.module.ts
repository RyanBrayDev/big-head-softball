import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';
import { LeagueComponent } from './league/league.component';


const TeamModuleRoutes: Routes = [
    {
        path: 'team/:teamId',
        component: TeamComponent,
        children: [
            {
                path: 'league/:leagueId',
                component: LeagueComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(TeamModuleRoutes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class TeamRoutingModule { }