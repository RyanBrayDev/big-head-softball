import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team.component';

const TeamModuleRoutes: Routes = [
    {
        path: 'team/:teamId',
        component: TeamComponent,
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