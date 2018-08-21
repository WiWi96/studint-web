// @angular-core
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '../../node_modules/@angular/core';
import { TestComponentComponent } from './_components/test-component/test-component.component';
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component';
import { LeftBarComponent } from './_components/left-bar/left-bar.component';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';

// @Components


// @Others


const routes: Routes = [
    { path: 'mainpage/profilenames', component: TestComponentComponent },
    { path: 'mainpage/navbar', component: NavigationBarComponent },
    { path: 'mainpage/leftbar', component: LeftBarComponent },
    { path: '', component: NavigationBarComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
]

export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }