import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appPhoneNoMask]'
})
export class PhoneNoMask {

    constructor(public ngControl: NgControl) { }
    
    @HostListener('keyup', ['$event']) 
    keyUpEvent(event) {
        if(event.keyCode != 8)
           this.formatPhoneNumber(event.target.value); 
    };

    formatPhoneNumber(value: string) {
        let newValue = value;
        // console.log(newValue.length + ' ' + newValue);
        if (newValue.length == 5) {
            let firstValue = newValue.substring(0, 5);
            let secValue = newValue.substring(5);
            let interArray = [];
            interArray.push(firstValue);
            interArray.push(secValue);
            this.ngControl.valueAccessor.writeValue(interArray.join(' '));
        }
    }
} 