import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { PostsTableWrapperComponent } from './components/posts-table-wrapper/posts-table-wrapper.component';
import { PostsTableSearchbarComponent } from './components/posts-table-searchbar/posts-table-searchbar.component';
import { PostsListRoutingModule } from './posts-list-routing.module';

@NgModule({
  declarations: [
    PostsTableComponent,
    PostsTableWrapperComponent,
    PostsTableSearchbarComponent,
  ],
  imports: [CommonModule, PostsListRoutingModule],
})
export class PostsListModule {}
