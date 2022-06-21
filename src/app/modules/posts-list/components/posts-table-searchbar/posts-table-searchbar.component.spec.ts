import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableSearchbarComponent } from './posts-table-searchbar.component';

describe('PostsTableSearchbarComponent', () => {
  let spectator: Spectator<PostsTableSearchbarComponent>;
  const createComponent = createComponentFactory(PostsTableSearchbarComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
