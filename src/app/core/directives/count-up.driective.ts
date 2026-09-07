import { Directive, ElementRef, Renderer2, inject, input, effect, OnDestroy } from "@angular/core";

@Directive({
  selector: '[countUp]',
  standalone: true,
})
export class CountUpDirective implements OnDestroy {
  readonly countUp = input.required<number>();
  readonly countUpDelay = input<number>(0);      // ms, waits before starting
  readonly countUpDuration = input<number>(800); // ms, how long the count takes
  readonly startTrigger = input<boolean>(true); // 🆕 defaults true — existing usages unaffected

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  private rafId: number | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const target = this.countUp();

      if (!this.startTrigger()) {
        // Reserve layout space at 0 while waiting to scroll into view
        this.renderer.setProperty(this.el.nativeElement, 'textContent', '0');
        return;
      }

      this.animateTo(target);
    });
  }

  private animateTo(target: number): void {
    this.clearTimers();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // console.log('reduced motion active?', reduced);

    if (reduced) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', `${target}`);
      return;
    }

    // Reserve layout space immediately so nothing reflows later — only the count itself is delayed
    this.renderer.setProperty(this.el.nativeElement, 'textContent', '0');

    this.timeoutId = setTimeout(() => {
      const duration = this.countUpDuration();
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const eased = Math.sin((progress * Math.PI) / 2);
        const current = Math.round(eased * target);

        this.renderer.setProperty(this.el.nativeElement, 'textContent', `${current}`);

        if (progress < 1) {
          this.rafId = requestAnimationFrame(step);
        }
      };

      this.rafId = requestAnimationFrame(step);
    }, this.countUpDelay());
  }

  private clearTimers(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.timeoutId !== null) clearTimeout(this.timeoutId);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}