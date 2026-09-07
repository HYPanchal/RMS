import { Directive, ElementRef, inject, output, input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  readonly scrollRevealThreshold = input<number>(0.2);
  readonly scrollRevealRootMargin = input<string>('0px 0px -50px 0px');
  readonly visible = output<void>();

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!('IntersectionObserver' in window)) {
      // Very old browser fallback — just reveal immediately rather than never
      this.visible.emit();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // console.log('scrollReveal fired for', this.el.nativeElement.className, 'at', performance.now(), 'ms after load');
            this.visible.emit();
            this.observer?.unobserve(this.el.nativeElement); // fire once only
          }
        }
      },
      {
        threshold: this.scrollRevealThreshold(),
        rootMargin: this.scrollRevealRootMargin(),
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}