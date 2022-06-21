import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsTableWrapperComponent } from './components/posts-table-wrapper/posts-table-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts-list',
    pathMatch: 'full',
  },
  {
    path: 'posts-list',
    component: PostsTableWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsListRoutingModule {}
