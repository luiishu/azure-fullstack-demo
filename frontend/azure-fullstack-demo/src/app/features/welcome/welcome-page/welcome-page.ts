import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../shared/auth/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
  ],
  selector: 'app-welcome-page',
  styleUrl: './welcome-page.scss',
  templateUrl: './welcome-page.html',
})
export class WelcomePage {
  public authService = inject(AuthService);
  // private router = inject(Router);

  // public goToDashboard(): void {
  //   this.router.navigate([''])
  // }
}
