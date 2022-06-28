import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsMapComponent } from './components/posts-map/posts-table.component';
import { PostsTableWrapperComponent } from './components/posts-table-wrapper/posts-table-wrapper.component';
import { PostsTableSearchbarComponent } from './components/posts-table-searchbar/posts-table-searchbar.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiScrollbarModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GoogleMapsModule } from '@angular/google-maps';

const ANGULAR_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  ScrollingModule,
];
const UI_LIB_MODULES = [
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiTableModule,
  TuiScrollbarModule,
  TuiButtonModule,
];

@NgModule({
  declarations: [
    PostsMapComponent,
    PostsTableWrapperComponent,
    PostsTableSearchbarComponent,
  ],
  imports: [
    CommonModule,
    PostsListRoutingModule,
    GoogleMapsModule,
    ...ANGULAR_MODULES,
    ...UI_LIB_MODULES,
  ],
})
export class PostsListModule {}
