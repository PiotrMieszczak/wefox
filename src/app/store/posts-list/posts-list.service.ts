import { Inject, Injectable } from '@angular/core';

import { PostsListStore } from './posts-list.store';
import { HttpService } from '../../core';
import { IPost, Post } from './posts-list.model';
import { filter, map, Observable, take, tap } from 'rxjs';
import { assertProperties } from '../../shared/utils/utils';
import { TuiAlertService } from '@taiga-ui/core';

export const POST_PROPS = [
  'id',
  'title',
  'lat',
  'long',
  'image_url',
  'content',
];

@Injectable({ providedIn: 'root' })
export class PostsListService {
  constructor(
    protected store: PostsListStore,
    private readonly _http: HttpService,
    @Inject(TuiAlertService) private readonly _alertService: TuiAlertService
  ) {}

  getAll(): Observable<unknown> {
    return this._http.get('/posts').pipe(
      filter(posts =>
        posts.every((post: Record<string, unknown>) =>
          assertProperties(POST_PROPS, post)
        )
      ),
      map((posts: IPost[]) => this.store.add(posts.map(post => new Post(post))))
    );
  }

  getOne(postId: number): Observable<unknown> {
    return this._http.get(`/posts/${postId}`).pipe(
      filter(post => assertProperties(POST_PROPS, post)),
      map((post: IPost) =>
        this.store.update({ editedLocation: new Post(post) })
      )
    );
  }

  create(post: any): Observable<unknown> {
    return this._http
      .post(`/posts`, post)
      .pipe(tap(() => this.openAlert('Create')));
  }

  delete(post: Post): Observable<unknown> {
    return this._http
      .delete(`/posts/${post.id}`)
      .pipe(tap(() => this.openAlert('Delete')));
  }

  update(post: Post): Observable<unknown> {
    return this._http
      .patch(`/posts/${post.id}`, post)
      .pipe(tap(() => this.openAlert('Update')));
  }

  setQuery(query: string): void {
    this.store.update({ query });
  }
  setActive(user: Post): void {
    this.store.setActive(user.id);
  }

  private openAlert(actionType: string): void {
    this._alertService
      .open(`${actionType}`, { label: 'Action successful!' })
      .pipe(take(1))
      .subscribe();
  }
}
