
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '../../node_modules/@angular/core';
import { NavigationBarComponent } from '../_components/navigation-bar/navigation-bar.component';
import { LoginComponent } from '../_components/login';
import { RegisterComponent } from '../_components/register';

const routes: Routes = [
    //{ path: 'mainpage/profilenames', component: TestComponentComponent },
    { path: 'mainpage/navbar', component: NavigationBarComponent },
    { path: '', component: NavigationBarComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
]

//export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }