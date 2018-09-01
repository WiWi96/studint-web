
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '_components/login';
import { RegisterComponent } from '_components/register';
import { UserProfileComponent } from '_components/user-profile';
import { UniversityProfileComponent } from '_components/university-profile';
import { CompanyProfileComponent } from '_components/company-profile';
import { ProjectProfileComponent } from '_components/project-profile';
import { HomeComponent } from '_components/home/home.component';
import { AddressFormComponent } from '_components/_forms/add-form/address-form.component';
import { ErrorsComponent } from 'errors';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'address', component: AddressFormComponent },
    { path: 'user/:id', component: UserProfileComponent },
    { path: 'university/:id', component: UniversityProfileComponent },
    { path: 'project/:id', component: ProjectProfileComponent },
    { path: 'company/:id', component: CompanyProfileComponent },
    { path: 'error', component: ErrorsComponent },
    { path: '**', component: ErrorsComponent, data: { error: 404 } }
];

// export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
