import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableWrapperComponent } from './posts-table-wrapper.component';

import { PostsTableSearchbarComponent } from '../posts-table-searchbar/posts-table-searchbar.component';
import { PostsListQuery, PostsListService } from '../../../../store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';
import { PostsTableComponent } from '../posts-table/posts-table.component';
import { PostsMapComponent } from '../posts-map/posts-map.component';
import { TuiTabsModule } from '@taiga-ui/kit';

describe('PostsTableWrapperComponent', () => {
  let spectator: Spectator<PostsTableWrapperComponent>;

  const createComponent = createComponentFactory({
    component: PostsTableWrapperComponent,
    declarations: [
      MockComponent(PostsTableSearchbarComponent),
      MockComponent(PostsTableComponent),
      MockComponent(PostsMapComponent),
    ],
    imports: [
      HttpClientTestingModule,
      FormsModule,
      ReactiveFormsModule,
      TuiTabsModule,
    ],
    providers: [PostsListService, PostsListQuery],
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
