import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableWrapperComponent } from './posts-table-wrapper.component';
import { PostsTableComponent } from '../posts-table/posts-table.component';
import { PostsTableSearchbarComponent } from '../posts-table-searchbar/posts-table-searchbar.component';

describe('PostsTableWrapperComponent', () => {
  let spectator: Spectator<PostsTableWrapperComponent>;

  const createComponent = createComponentFactory({
    component: PostsTableWrapperComponent,
    declarations: [PostsTableComponent, PostsTableSearchbarComponent],
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
