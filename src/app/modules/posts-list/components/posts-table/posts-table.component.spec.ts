import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableComponent } from './posts-table.component';

describe('PostsTableComponent', () => {
  let spectator: Spectator<PostsTableComponent>;
  const createComponent = createComponentFactory(PostsTableComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
