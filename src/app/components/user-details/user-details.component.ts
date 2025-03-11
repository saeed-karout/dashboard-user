import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any = null;
  isLoading = true;
  errorMessage: string | null = null; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.loadUserDetails(userId);
    });
  }

  loadUserDetails(userId: number) {
    this.isLoading = true;
    this.errorMessage = null;
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'User not found';
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
