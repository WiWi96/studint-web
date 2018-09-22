
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '_components/login';
import { RegisterComponent } from '_components/register';
import { UserProfileComponent } from '_components/user-profile';
import { UniversityProfileComponent } from '_components/university-profile';
import { CompanyProfileComponent } from '_components/company-profile';
import { ProjectProfileComponent } from '_components/project-profile';
import { HomeComponent } from '_components/home/home.component';
import { ErrorsComponent } from 'errors';
import { ProjectManagementComponent } from '_components/_management/project-management/project-management.component';
import { MainpageComponent } from '_components/mainpage/mainpage.component';
import { AuthGuard } from './auth/auth.guard';
import { LoggedOffGuard } from './auth/loggedOff.guard';
import { TeamManagementComponent } from '_components/_management/team-management/team-management.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [LoggedOffGuard] },
    { path: 'login', component: LoginComponent, canActivate: [LoggedOffGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoggedOffGuard] },

    { path: 'mainpage', component: MainpageComponent, canActivate: [AuthGuard] },

    { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'university/:id', component: UniversityProfileComponent, canActivate: [AuthGuard] },
    { path: 'project/:id', component: ProjectProfileComponent, canActivate: [AuthGuard] },
    { path: 'company/:id', component: CompanyProfileComponent, canActivate: [AuthGuard] },

    { path: 'manage-projects', component: ProjectManagementComponent, canActivate: [AuthGuard] },
    { path: 'manage-teams/:id', component: TeamManagementComponent, canActivate: [AuthGuard] },

    { path: 'error', component: ErrorsComponent },
    { path: '**', component: ErrorsComponent, data: { error: 404 } }
];

// export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
