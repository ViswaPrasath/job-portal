import { Component, Input, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
    selector: 'app-success-modal',
    templateUrl: './success.component.html'
})
export class SuccessComponent {
    @Input() message;

    constructor(public activeModal: NgbActiveModal, private ngZone: NgZone) { 
    }
    
    private animationItem: AnimationItem;

    options: AnimationOptions = {
        path: '/assets/success.json',
        loop: false
    };
    

}