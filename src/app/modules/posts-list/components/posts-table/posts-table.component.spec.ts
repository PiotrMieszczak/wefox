import {
  Spectator,
  createComponentFactory,
  createMouseEvent,
} from '@ngneat/spectator';

import { PostsTableComponent } from './posts-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DIALOG_MODE, Post, PostsListService } from '../../../../store';
import { TuiDialogService } from '@taiga-ui/core';
import { of } from 'rxjs';
import { TuiTableModule } from '@taiga-ui/addon-table';
const MOCK_DATA_EDIT = {
  type: DIALOG_MODE.EDIT,
  data: {
    lat: '-3.70379',
    long: ' 40.41678',
    id: 1,
    title: 'Madrid',
    content: 'Madrid is the capital of Spain',
    image_url: '',
  },
};

describe('PostsTableComponent', () => {
  let spectator: Spectator<PostsTableComponent>;
  let postService: PostsListService;
  let dialogService: TuiDialogService;

  const createComponent = createComponentFactory({
    component: PostsTableComponent,
    imports: [HttpClientTestingModule, TuiTableModule],
    providers: [
      PostsListService,
      {
        provide: TuiDialogService,
        useValue: { open: jest.fn().mockReturnValue(of(MOCK_DATA_EDIT)) },
      },
    ],
  });
  beforeEach(() => {
    spectator = createComponent();
    postService = spectator.inject(PostsListService);
    dialogService = spectator.inject(TuiDialogService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should invoke update method', () => {
    const serviceSpy = jest.spyOn(postService, 'update');

    spectator.component.edit(MOCK_DATA_EDIT.data as Post);
    spectator.detectChanges();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(MOCK_DATA_EDIT.data);
  });

  it('should invoke create method', () => {
    const serviceSpy = jest.spyOn(postService, 'create');

    spectator.component.add();
    spectator.detectChanges();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(MOCK_DATA_EDIT.data);
  });
});
