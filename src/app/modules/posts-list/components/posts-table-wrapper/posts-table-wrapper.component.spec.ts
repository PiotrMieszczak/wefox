import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableWrapperComponent } from './posts-table-wrapper.component';
import { PostsTableComponent } from '../posts-map/posts-table.component';
import { PostsTableSearchbarComponent } from '../posts-table-searchbar/posts-table-searchbar.component';
import { PostsListQuery, PostsListService } from '../../../../store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockComponent } from 'ng-mocks';

describe('PostsTableWrapperComponent', () => {
  let spectator: Spectator<PostsTableWrapperComponent>;

  const createComponent = createComponentFactory({
    component: PostsTableWrapperComponent,
    declarations: [
      MockComponent(PostsTableSearchbarComponent),
      MockComponent(PostsTableComponent),
    ],
    imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
    providers: [PostsListService, PostsListQuery],
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
