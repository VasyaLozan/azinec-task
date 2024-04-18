import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Directive({
  selector: '[appIntersectionListener]',
  standalone: true,
})
export class IntersectionListenerDirective implements AfterViewInit {

  @Output() appIntersectionListener = new EventEmitter<boolean>();
  observer!: IntersectionObserver;

  constructor(private element: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && this.canLazyLoad()) {
      this.intersectionObserver()
      this.observer.observe(this.element.nativeElement);
    }
  }

  private canLazyLoad(){
    return window && 'IntersectionObserver' in window;
  }

  intersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.appIntersectionListener.emit(true);
      }
    }, options);
  }
}
