import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsMapComponent } from './posts-table.component';

describe('PostsTableComponent', () => {
  let spectator: Spectator<PostsMapComponent>;
  const createComponent = createComponentFactory(PostsMapComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
