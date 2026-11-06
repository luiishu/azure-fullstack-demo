import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { KpiResponse, KpiService } from '../kpi-service';
import { switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { validateDateRange } from '../date-range-validator';
import { DatePipe } from '@angular/common';

interface Kpi {
  title: string;
  value: number;
  description: string;
  icon: string;
}

type DateRange = 'today' | 'week' | 'month';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPage {
  private kpiService = inject(KpiService);

  protected readonly kpisFetched = signal<KpiResponse | null>(null);

  private greeting = signal<string | null>(null);
  public greetingLastReceived = signal<Date>(new Date());


  public selectedRange = signal<DateRange>('today');

  constructor() {
    this.getKpisForToday();
  }

  getGreeting(): void {
    this.kpiService.getGreeting().subscribe(response => {
      this.greeting.set(response);
      this.greetingLastReceived.set(new Date());
    });
  }

  getKpis(): void {
    let fromDate = '2026-09-01';
    let toDate = '2026-10-01';

    if (!validateDateRange(fromDate, toDate)) {
      console.error('Failed to fetch KPIs: API request not sent due to invalid date inputs.', {
        fromDate,
        toDate
      });

      return;
    }

    this.kpiService.getKpis(fromDate, toDate).subscribe({
      next: response => {
        this.kpisFetched.set(response);
        this.kpis.update(kpis => [
          { ...kpis[0], value: response.todosCount },
          { ...kpis[1], value: response.completedTodosCount },
          { ...kpis[2], value: response.incompletedTodosCount }
        ]);
        console.log(response);
        console.log(this.kpis()[0]);
        this.greetingLastReceived.set(new Date());
      },
      error: error => {
        console.error('Failed to fetch KPIs: API request failed.', error);
      }
    })
  }

  getKpisForToday(): void {
    this.selectedRange.set('today');
    const date = new Date();
    const today: string = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    console.log(today); // e.g. "2026-10-26"

    if (!validateDateRange(today, today)) {
      console.error('Failed to fetch KPIs: API request not sent due to invalid date inputs.', {
        today
      });

      return;
    }

    this.updateKpis(today, today);
  }

  getKpisForThisWeek(): void {
    this.selectedRange.set('week');
    const today = new Date();

    const monday = new Date(today);
    const dayOfWeek = today.getDay();

    const daysSinceMonday = (dayOfWeek + 6) % 7;

    monday.setDate(today.getDate() - daysSinceMonday);

    const fromDate: string = [
      monday.getFullYear(),
      String(monday.getMonth() + 1).padStart(2, '0'),
      String(monday.getDate()).padStart(2, '0')
    ].join('-');

    const toDate: string = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0')
    ].join('-');

    console.log(today); // e.g. "2026-10-26"

    if (!validateDateRange(fromDate, toDate)) {
      console.error('Failed to fetch KPIs: API request not sent due to invalid date inputs.', {
        today
      });

      return;
    }

    this.updateKpis(fromDate, toDate);
  }

  getKpisForThisMonth(): void {
    this.selectedRange.set('month');
    const today = new Date();

    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const formatDate = (date: Date): string =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const fromDate: string = formatDate(firstDayOfMonth);
    const toDate: string = formatDate(today);

    if (!validateDateRange(fromDate, toDate)) {
      console.error('Failed to fetch KPIs: API request not sent due to invalid date inputs.', {
        today
      });

      return;
    }

    this.updateKpis(fromDate, toDate);
  }

  private updateKpis(fromDate: string, toDate: string) {
    this.kpiService.getKpis(fromDate, toDate).subscribe({
      next: response => {
        this.kpisFetched.set(response);
        this.kpis.update(kpis => [
          { ...kpis[0], value: response.todosCount },
          { ...kpis[1], value: response.completedTodosCount },
          { ...kpis[2], value: response.incompletedTodosCount }
        ]);
        console.log(response);
        console.log(this.kpis()[0]);
        this.greetingLastReceived.set(new Date());
      },
      error: error => {
        console.error('Failed to fetch KPIs: API request failed.', error);
      }
    })
  }

  readonly kpis = signal<Kpi[]>([
    {
      title: 'Todos',
      value: 24,
      description: 'All Todos',
      icon: 'shopping_cart'
    },
    {
      title: 'Completed Todos',
      value: 18,
      description: 'All Todos that have been completed',
      icon: 'check_circle'
    },
    {
      title: 'Incompleted Todos',
      value: 12,
      description: 'All Todos that have not been completed',
      icon: 'local_shipping'
    }
  ]);
}