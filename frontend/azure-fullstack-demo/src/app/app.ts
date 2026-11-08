import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';


@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  // styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private msalService = inject(MsalService);
  private router = inject(Router);

  protected readonly title = signal('azure-fullstack-demo');

  ngOnInit(): void {
    this.msalService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result?.account) {
          // Successful login
          this.msalService.instance.setActiveAccount(result.account);
          this.router.navigate(['/']);
        }
        else {
          // Existing session / page refresh
          const accounts = this.msalService.instance.getAllAccounts();

          if (accounts.length > 0) {
            this.msalService.instance.setActiveAccount(accounts[0]);
          }
        }
      },
      error: (error) => {
        console.error('Redirect handling failed:', error);
      }
    });
  }
}