import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[useUnderlineStyle]' })
export class UseUnderlineDirective {
    @HostBinding('style')
    style={'text-decoration':'underline'};
    
    constructor() { 
            //
    }
}



@Directive({ selector: '[useAutoFocus]' })
export class AutofocusDirective implements AfterViewInit  {
    @Input('useAutoFocus')
    focus=false; 
    constructor(private el:ElementRef) { }
    ngAfterViewInit(): void {
            if(this.focus)
                this.el.nativeElement.focus(); 
    }
}