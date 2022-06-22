import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { PostsTableWrapperComponent } from './components/posts-table-wrapper/posts-table-wrapper.component';
import { PostsTableSearchbarComponent } from './components/posts-table-searchbar/posts-table-searchbar.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ANGULAR_MODULES = [CommonModule, ReactiveFormsModule, FormsModule];
const UI_LIB_MODULES = [TuiInputModule, TuiTextfieldControllerModule];

@NgModule({
  declarations: [
    PostsTableComponent,
    PostsTableWrapperComponent,
    PostsTableSearchbarComponent,
  ],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    ...ANGULAR_MODULES,
    ...UI_LIB_MODULES,
  ],
})
export class PostsListModule {}
