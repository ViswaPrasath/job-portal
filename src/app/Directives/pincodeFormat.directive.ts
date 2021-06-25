import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appPincodeFormat]'
})
export class PincodeFormat {
    constructor(public ngControl: NgControl) { }
    
    @HostListener('keyup', ['$event'])
    keyUpEvent(event) {
        if (event.keyCode != 8)
            this.pincodeFormatter(event.target.value);
    }

    pincodeFormatter(value:string) {
        let newValue = value;
        if (newValue.length == 3) {
            let firstValue = newValue.substring(0, 3);
            let secValue = newValue.substring(3);
            let interArray = [];
            interArray.push(firstValue);
            interArray.push(secValue);
            this.ngControl.valueAccessor.writeValue(interArray.join(' '));
        }
    }

}