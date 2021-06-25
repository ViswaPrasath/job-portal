import { Directive,HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appDateFormatter]'
})
export class DateFormatter {

    constructor(public ngControl: NgControl) { }
    
    @HostListener('keyup', ['$event'])
    keyUpEvent(event) {
        if(event.keyCode != 8)
          this.dateFormatter(event.target.value);
    }


    dateFormatter(value: string) {
        let newValue = value;
        if (newValue.length == 2) {
            let firstValue = newValue.substring(0, 2);
            let secValue = newValue.substring(2);
            let interArray = [];
            interArray.push(firstValue);
            interArray.push(secValue);
            this.ngControl.valueAccessor.writeValue(interArray.join('-'));
        }
        if (newValue.length == 5) {
            console.log(newValue);
            let firstValue = newValue.substring(0, 5);
            let secValue = newValue.substring(5);
            let interArray = [];
            interArray.push(firstValue);
            interArray.push(secValue);
            this.ngControl.valueAccessor.writeValue(interArray.join('-'));
        }
    }
}