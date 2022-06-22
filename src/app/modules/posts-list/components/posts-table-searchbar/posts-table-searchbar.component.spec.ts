import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { PostsTableSearchbarComponent } from './posts-table-searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { PostsListService } from '../../../../store';

describe('PostsTableSearchbarComponent', () => {
  let spectator: Spectator<PostsTableSearchbarComponent>;
  const createComponent = createComponentFactory({
    component: PostsTableSearchbarComponent,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      TuiInputModule,
      TuiTextfieldControllerModule,
    ],
    mocks: [PostsListService],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
