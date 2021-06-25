import { Component, OnInit, ElementRef, Inject, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Location } from '@angular/common';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoginService } from '../../login/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private toggleButton: any;
    private sidebarVisible: boolean;
    loginState: boolean = false;
    loginSub = new Subscription();

    employerLoginState = false;
    employerLoginSub = new Subscription();

    candidateLoginState = false;
    candidateLoginSub = new Subscription();

    constructor(public location: Location,
        private element: ElementRef,
        @Inject(LOCAL_STORAGE) private storageService: StorageService,
        private loginService: LoginService,
        private router:Router,
        private cd : ChangeDetectorRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        
        this.loginSub = this.loginService.loginStatus().subscribe(result => {
            this.loginState = result;
        });

        this.employerLoginSub = this.loginService.employerLoginStatus().subscribe(result => {
            this.employerLoginState = result;
        });

        this.candidateLoginSub = this.loginService.candidateLoginStatus().subscribe(result => {
            this.candidateLoginState = result;
        });

        const candidateId = this.storageService.get('candidateId');
        const employerId = this.storageService.get('employerId');
        if (candidateId || employerId) {
            this.loginState = true;
        }
        if (employerId) {
            this.employerLoginState = true;
        }

        if (candidateId) this.candidateLoginState = true;
    }

    ngOnDestroy() {
        this.loginSub.unsubscribe();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
  
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        
        if (this.router.url == '/profile' || this.router.url == '/jobPost' || this.router.url == '/jobList')
            this.router.navigate(['/', 'home']);
        
        this.storageService.clear();
        this.loginState = false;
        if (this.storageService.get("employerId") == undefined) {
            this.employerLoginState = false;
        }
        // this.cd.detectChanges();
    }
}
