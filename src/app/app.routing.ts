import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { SignUpCanDeactivate } from './Guard/sign-up.guard';
import { ProfileComponent } from './profile/profile.component';
import { JobPostComponent } from './job-post/job-post.component';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'signUp', component: SignUpComponent, canDeactivate: [SignUpCanDeactivate] },
    { path: 'jobPost', component: JobPostComponent },
    { path: 'jobList', component: JobListComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
