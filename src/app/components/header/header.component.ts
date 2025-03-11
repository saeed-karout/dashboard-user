import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm = new Subject<string>();
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private router: Router, private userService: UserService) {
    this.searchTerm.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(id => {
      if (id) {
        this.isLoading = true;
        this.errorMessage = null;
        this.userService.getUserById(+id).subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/user', id]);
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = 'User not found';
          }
        });
      } else {
        this.isLoading = false;
        this.errorMessage = null; 
      }
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.next(input.value);
  }
}
