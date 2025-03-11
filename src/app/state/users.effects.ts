import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import * as UserActions from './users.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(action =>
        this.userService.getUsers(action.page).pipe(
          map(data => UserActions.loadUsersSuccess({ users: data.data, totalPages: data.total_pages }))
        )
      )
    )
  );
}
