import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserTableComponent } from './user-table/user-table.component';
import { EmployerTableComponent } from './employer-table/employer-table.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard',
    component: NavbarComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'user-details', component: UserTableComponent},
      { path: 'employer-details', component: EmployerTableComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
