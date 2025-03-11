import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  totalPages = 0;
  loading = false;
  currentPage = 1;
  errorMessage: string | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number) {
    this.loading = true;
    this.errorMessage = null;
    this.userService.getUsers(page).subscribe({
      next: (data) => {
        this.users = data.data;
        this.totalPages = data.total_pages;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users. Please try again later.';
        this.loading = false;
        console.error('Error fetching users:', err);
      }
    });
  }
}
