import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsMapComponent } from './posts-map.component';

describe('PostsTableComponent', () => {
  let spectator: Spectator<PostsMapComponent>;
  const createComponent = createComponentFactory(PostsMapComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
