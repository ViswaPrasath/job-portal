import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './signUp/sign-up.component';
import { ErrorInterceptor } from './error.interceptor';
import { ErrorComponent } from './Error/error.component';
import { SuccessComponent } from './success/success.component';
import { SignUpCanDeactivate } from './Guard/sign-up.guard';
import { PhoneNoMask } from './Directives/phoneNo-mask.directive';
import { DateFormatter } from './Directives/date-formatter.directive';
import { PincodeFormat } from './Directives/pincodeFormat.directive';
import { ProfileComponent } from './profile/profile.component';
import { JobPostComponent } from './job-post/job-post.component';
import { FooterComponent } from './footer/footer.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

export function playerFactory() {
    return import('lottie-web');
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        HomeComponent,
        SignUpComponent,
        ErrorComponent,
        FileSelectDirective,
        SuccessComponent,
        PhoneNoMask,
        DateFormatter,
        PincodeFormat,
        ProfileComponent,
        JobPostComponent,
        FooterComponent,
        JobListComponent,
        JobDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        NouisliderModule,
        NgbModule,
        JwBootstrapSwitchNg2Module,
        ToastrModule.forRoot(),
        LottieModule.forRoot({ player: playerFactory, useCache: true, }),
        StorageServiceModule,

        MatPaginatorModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatGridListModule,
        MatRadioModule,
        MatDividerModule,
        MatSelectModule

    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    exports:[NgbModule],
    entryComponents:[ ErrorComponent,SuccessComponent,JobDetailComponent ]
})
export class AppModule { }
