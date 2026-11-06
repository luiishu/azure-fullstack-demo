import { Component, inject, signal } from '@angular/core';
import { DevService } from '../dev-service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [
    DatePipe,
    MatButtonModule],
  selector: 'app-dev-page',
  styleUrl: './dev-page.scss',
  templateUrl: './dev-page.html',
})
export class DevPage {
  private devService = inject(DevService);

  private greeting = signal<string | null>(null);
  public greetingLastReceived = signal<Date>(new Date());

  constructor() {
    timer(0, 5000)
      .pipe(
        switchMap(() => this.devService.getGreeting()),
        takeUntilDestroyed()
      )
      .subscribe(response => {
        this.greeting.set(response);
        this.greetingLastReceived.set(new Date());
      });
  }

  getGreeting(): void {
    this.devService.getGreeting().subscribe(response => {
      this.greeting.set(response);
      this.greetingLastReceived.set(new Date());
    });
  }
}
