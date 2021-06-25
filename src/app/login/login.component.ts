import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    data : Date = new Date();
    focus;
    focus1;

    candidateCard = true;
    employerCard = false;

    constructor(private loginService:LoginService,private router:Router) { }

    ngOnInit() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }

    ngOnDestroy(){
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }

    candidateSignInSubmit(value) {
        console.log(value);
        const username = value.candidateUsername;
        const password = value.candidatePassword;

        let loginSuccessfull;
        loginSuccessfull = this.loginService.candidateLogin(username, password);
        if (loginSuccessfull) this.router.navigate(['/home']);
    }
    
    employerLoginSubmit(form: NgForm) {
        if (!form.invalid) {
            const username = form.controls.employerUsername.value;
            const password = form.controls.employerPassword.value;
            
            let loginSuccessfull;
            loginSuccessfull = this.loginService.employerLogin(username, password);
            if (loginSuccessfull) this.router.navigate(['/home']);
        }
    }
}
