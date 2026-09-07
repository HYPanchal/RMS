import { Directive, ElementRef, Renderer2, inject, input, effect, OnDestroy } from '@angular/core';

@Directive({
    selector: '[donutCountUp]',
    standalone: true,
})
export class DonutCountUpDirective implements OnDestroy {
    readonly donutCountUp = input.required<number>();       // target percent, 0-100
    readonly donutColorFilled = input.required<string>();   // e.g. '#4361ee'
    readonly donutColorEmpty = input.required<string>();    // e.g. '#e4e9f7'
    readonly donutDelay = input<number>(0);
    readonly donutDuration = input<number>(900);
    readonly startTrigger = input<boolean>(true);

    private readonly el = inject(ElementRef<HTMLElement>);
    private readonly renderer = inject(Renderer2);

    private rafId: number | null = null;
    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    constructor() {
        effect(() => {
            const target = this.donutCountUp();

            if (!this.startTrigger()) {
                // Reserve the ring at 0% while waiting to scroll into view
                this.renderer.setStyle(this.el.nativeElement, 'background', this.buildGradient(0));
                return;
            }

            this.animateTo(target);
        });
    }

    private buildGradient(percent: number): string {
        return `conic-gradient(${this.donutColorFilled()} 0% ${percent}%, ${this.donutColorEmpty()} ${percent}% 100%)`;
    }

    private animateTo(target: number): void {
        this.clearTimers();

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // console.log('reduced motion active?', reduced);

        if (reduced) {
            this.renderer.setStyle(this.el.nativeElement, 'background', this.buildGradient(target));
            return;
        }

        // Paint the ring at 0% immediately — no blank/flash before the delay elapses
        this.renderer.setStyle(this.el.nativeElement, 'background', this.buildGradient(0));

        this.timeoutId = setTimeout(() => {
            const duration = this.donutDuration();
            const start = performance.now();

            const step = (now: number) => {
                const progress = Math.min((now - start) / duration, 1);
                // const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic, matches your other directives
                const eased = Math.sin((progress * Math.PI) / 2);
                const current = Math.round(eased * target);

                this.renderer.setStyle(this.el.nativeElement, 'background', this.buildGradient(current));

                if (progress < 1) {
                    this.rafId = requestAnimationFrame(step);
                }
            };

            this.rafId = requestAnimationFrame(step);
        }, this.donutDelay());
    }

    private clearTimers(): void {
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        if (this.timeoutId !== null) clearTimeout(this.timeoutId);
    }

    ngOnDestroy(): void {
        this.clearTimers();
    }
}