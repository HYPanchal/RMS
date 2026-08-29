import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevenueService } from '../../../core/services/revenue.service';
import { RevenueSummary } from '../../../core/models/revenu-mofule/revenue.model';

@Component({
  selector: 'revenue',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './revenue.html',
  styleUrl: './revenue.css',
})
export class Revenue {
  private revenueService = inject(RevenueService);

  selectedMonth = signal<string>(this.currentMonth());
  revenue = signal<RevenueSummary | null | undefined>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    this.loadRevenue();
  }

  onMonthChange(value: string): void {
    this.selectedMonth.set(value);
    this.loadRevenue();
  }

  loadRevenue(): void {
    this.isLoading.set(true);
    // this.revenueService.getRevenue(this.selectedMonth()).subscribe({
    //   next: (data) => { this.revenue.set(data); this.isLoading.set(false); },
    //   error: () => this.isLoading.set(false)
    // });
    // this.revenue.set(this.getRevenue(this.selectedMonth()));
    this.isLoading.set(false);
  }

  private currentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  //test method
  // private getRevenue(month: string): RevenueSummary | undefined {
  //   return this.revenueSummaries.find(
  //     rev => rev.month === month
  //   );
  // }
}
