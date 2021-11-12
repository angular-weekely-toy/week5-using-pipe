import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { concat, merge, Subject } from 'rxjs';
import { concatAll, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { logging } from 'protractor';

@Directive({
  selector: 'input[appInputDelay]'
})
export class InputDelayDirective implements OnInit {
  subject = new Subject<string>();
  forceSubject = new Subject<string>();
  @Output('appInputDelay') changeEvent = new EventEmitter<string>();

  constructor(public el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    merge(this.subject.pipe(debounceTime(2000)), this.forceSubject).pipe(distinctUntilChanged()).subscribe(it => {
      this.changeEvent.emit(it);
    });
  }

  @HostListener('input')
  onInput(): void {
    this.subject.next(this.el.nativeElement.value);
  }

  @HostListener('change')
  onChange(): void {
    this.forceSubject.next(this.el.nativeElement.value);
  }

  get value(): string {
    return this.el.nativeElement.value;
  }
}
