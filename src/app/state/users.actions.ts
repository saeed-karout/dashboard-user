import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: any[], totalPages: number }>());
