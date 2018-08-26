
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../_components/login';
import { RegisterComponent } from '../_components/register';
import { UserProfileComponent } from '../_components/user-profile';
import { UniversityProfileComponent } from '../_components/university-profile';

const routes: Routes = [
    // { path: 'mainpage/profilenames', component: TestComponentComponent },
    { path: 'login', component: LoginComponent},
    // { path: 'mainpage', component: MainPageComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'user/:id', component: UserProfileComponent},
    { path: 'university/:id', component: UniversityProfileComponent},
    { path: '**', component: LoginComponent}
];

// export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
