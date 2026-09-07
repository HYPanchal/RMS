import { Directive, ElementRef, Renderer2, inject, input, effect, OnDestroy } from '@angular/core';

@Directive({
  selector: '[occupancyCountUp]',
  standalone: true,
})
export class OccupancyCountUpDirective implements OnDestroy {
  readonly occupancyCountUp = input.required<number>(); // target %
  readonly occupancyDelay = input<number>(0);
  readonly occupancyDuration = input<number>(900);
  readonly startTrigger = input<boolean>(true);

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private rafId: number | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => this.animateTo(this.occupancyCountUp()));
  }

  private animateTo(target: number): void {
    this.clearTimers();

    const barEl = this.el.nativeElement.querySelector('.occupancy-bar') as HTMLElement;
    const textEl = this.el.nativeElement.querySelector('.occupancy-text') as HTMLElement;
    if (!barEl || !textEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderer.setStyle(barEl, 'width', `${target}%`);
      this.renderer.setProperty(textEl, 'textContent', `${target}% occupied`);
      return;
    }

    // Reserve state immediately, delay only the fill animation
    this.renderer.setStyle(barEl, 'width', '0%');
    this.renderer.setProperty(textEl, 'textContent', '0% occupied');

    this.timeoutId = setTimeout(() => {
      const duration = this.occupancyDuration();
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // const eased = 1 - Math.pow(1 - progress, 3);
        const eased = Math.sin((progress * Math.PI) / 2);
        const current = Math.round(eased * target);

        this.renderer.setStyle(barEl, 'width', `${current}%`);
        this.renderer.setProperty(textEl, 'textContent', `${current}% occupied`);

        if (progress < 1) {
          this.rafId = requestAnimationFrame(step);
        }
      };

      this.rafId = requestAnimationFrame(step);
    }, this.occupancyDelay());
  }

  private clearTimers(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.timeoutId !== null) clearTimeout(this.timeoutId);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}