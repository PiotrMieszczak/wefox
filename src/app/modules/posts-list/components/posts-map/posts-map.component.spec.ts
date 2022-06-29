import {
  Spectator,
  createComponentFactory,
  createMouseEvent,
} from '@ngneat/spectator';

import { PostsMapComponent } from './posts-map.component';
import { MockComponent, MockDirective } from 'ng-mocks';
import { PostsInfoWindowComponent } from '../posts-info-window/posts-info-window.component';
import { DIALOG_MODE, PostsListService } from '../../../../store';
import { TuiDialogService } from '@taiga-ui/core';
import { of } from 'rxjs';
import { SafeAny } from '../../../../core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

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

const MOCK_DATA_ADD = {
  type: DIALOG_MODE.CREATE,
  data: {
    lat: '-3.70379',
    long: ' 40.41678',
    title: 'Madrid',
    content: 'Madrid is the capital of Spain',
    image_url: '',
  },
};

describe('PostsMapComponent', () => {
  let spectator: Spectator<PostsMapComponent>;
  let postService: PostsListService;
  let dialogService: TuiDialogService;

  const createComponent = createComponentFactory({
    component: PostsMapComponent,
    declarations: [
      MockComponent(GoogleMap),
      MockDirective(MapMarker),
      MockDirective(MapInfoWindow),
      MockComponent(PostsInfoWindowComponent),
    ],
    imports: [HttpClientTestingModule],
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
    const mouseEvent = createMouseEvent('click');

    spectator.component.addMarker(mouseEvent as SafeAny);
    spectator.detectChanges();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(MOCK_DATA_EDIT.data);
  });
});
