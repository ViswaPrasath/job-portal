import { SignUpComponent } from '../signUp/sign-up.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
    providedIn: "root"
})
export class SignUpCanDeactivate implements CanDeactivate<SignUpComponent>{
    location: Location;
    canDeactivate(component: SignUpComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!component.allowRedirect) {
            // this.location.go(currentState.url);
            console.log("current route " + currentRoute.url);
            console.log("current state " + currentState.url);
            return window.confirm('Make sure to leave the page?');
        }
        
        // console.log(component.enableCVUpload);
        return true;
            // return window.confirm('Make sure to leave the page?');
    }


}