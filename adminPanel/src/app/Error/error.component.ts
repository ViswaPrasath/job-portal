import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {}
}