import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PostsTableWrapperComponent } from './posts-table-wrapper.component';

describe('PostsTableWrapperComponent', () => {
  let spectator: Spectator<PostsTableWrapperComponent>;
  const createComponent = createComponentFactory(PostsTableWrapperComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
