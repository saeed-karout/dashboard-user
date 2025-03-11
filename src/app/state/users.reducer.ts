import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';

export interface UserState {
  users: any[];
  totalPages: number;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  totalPages: 0,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users, totalPages }) => ({
    ...state,
    users,
    totalPages,
    loading: false
  }))
);
