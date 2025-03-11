import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
  { path: '', component: UserListComponent }, // المسار الافتراضي
  { path: 'user/:id', component: UserDetailsComponent }, // مسار تفاصيل المستخدم
  { path: '**', redirectTo: '' } // إعادة توجيه أي مسار غير معروف إلى الصفحة الرئيسية
];
