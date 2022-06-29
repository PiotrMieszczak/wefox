import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsMapComponent } from './components/posts-map/posts-map.component';
import { PostsTableWrapperComponent } from './components/posts-table-wrapper/posts-table-wrapper.component';
import { PostsTableSearchbarComponent } from './components/posts-table-searchbar/posts-table-searchbar.component';
import { PostsListRoutingModule } from './posts-list-routing.module';
import {
  TuiFilesModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiTabsModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GoogleMapsModule } from '@angular/google-maps';
import { PostsMarkerDialogComponent } from './components/posts-marker-dialog/posts-marker-dialog.component';
import { PostsInfoWindowComponent } from './components/posts-info-window/posts-info-window.component';
import { PostsTableComponent } from './components/posts-table/posts-table.component';

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
  TuiInputFilesModule,
  TuiFilesModule,
  TuiTextAreaModule,
  TuiTabsModule,
  TuiSvgModule,
];

@NgModule({
  declarations: [
    PostsMapComponent,
    PostsTableWrapperComponent,
    PostsTableSearchbarComponent,
    PostsMarkerDialogComponent,
    PostsInfoWindowComponent,
    PostsTableComponent,
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
