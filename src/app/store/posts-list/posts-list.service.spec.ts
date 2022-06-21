import { environment } from '../../../environments/environment';
import { SafeAny } from '../../core';
import { PostsListService } from './posts-list.service';
import { PostsListStore } from './posts-list.store';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PostsListModule } from '../../modules/posts-list/posts-list.module';
import { SpectatorService } from '@ngneat/spectator';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { Post } from './posts-list.model';

const mockPostData: Post[] = [
  {
    lat: '-3.70379',
    long: ' 40.41678',
    id: 1,
    title: 'Madrid',
    content: 'Madrid is the capital of Spain',
    image_url: '',
  },
  {
    lat: '-3.70379',
    long: '40.41678',
    id: 2,
    title: 'Barcelona',
    content: 'Barcelona is not the capital of Spain',
    image_url: '',
  },
];

describe('GetData', () => {
  let spectator: SpectatorService<PostsListService>;
  let postsListService: PostsListService;
  let postsListStore: PostsListStore;
  let httpController: HttpTestingController;

  const createService = createServiceFactory({
    service: PostsListService,
    providers: [PostsListStore],
    imports: [PostsListModule, HttpClientTestingModule],
  });

  beforeEach(() => {
    spectator = createService();
    postsListService = spectator.inject(PostsListService);
    postsListStore = spectator.inject(PostsListStore);
    httpController = spectator.inject(HttpTestingController);
  });

  it('should get all data', function () {
    const url = environment.apiUrl + '/posts';

    spectator.service.getAll().subscribe(res => {
      expect(res).toEqual(mockPostData);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });

    req.flush(mockPostData);
  });

  describe('CRUD', () => {
    const mockPost = mockPostData[0];

    it('should get post by id', function () {
      const url = environment.apiUrl + '/posts/1';

      spectator.service.getOne('1').subscribe(res => {
        expect(res).toEqual(mockPostData);
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${url}`,
      });

      req.flush(mockPostData);
    });

    it('should create new post', function () {
      const url = environment.apiUrl + '/posts';

      spectator.service
        .create({ title: mockPost.title, content: mockPost.content })
        .subscribe((res: SafeAny) => {
          expect(res).toEqual({
            content: mockPost.content,
            title: mockPost.title,
            id: 2,
          });
        });

      const req = httpController.expectOne({
        method: 'POST',
        url: `${url}`,
      });

      req.flush({
        body: mockPost.content,
        title: mockPost.title,
        id: 2,
      });
    });

    it('should delete post', function () {
      const url = environment.apiUrl + `/posts/${mockPost.id}`;

      spectator.service.delete(mockPost).subscribe((res: SafeAny) => {
        expect(res).toEqual({});
      });

      const req = httpController.expectOne({
        method: 'DELETE',
        url: `${url}`,
      });

      req.flush({});
    });

    it('should update post', function () {
      const url = environment.apiUrl + `/posts/${mockPost.id}`;

      spectator.service.update(mockPost).subscribe((res: SafeAny) => {
        expect(res).toEqual(mockPost);
      });

      const req = httpController.expectOne({
        method: 'PATCH',
        url: `${url}`,
      });

      req.flush(mockPost);
    });
  });
});
