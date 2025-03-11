import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}`).pipe(
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of(null); 
      })
    );
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      shareReplay(1),
      catchError((error) => {
        console.error('Error fetching user:', error);
        return of(null);
      })
    );
  }
}
