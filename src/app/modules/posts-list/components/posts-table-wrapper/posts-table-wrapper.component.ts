import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Post, PostsListQuery, PostsListService } from '../../../../store';

@Component({
  selector: 'app-posts-table-wrapper',
  templateUrl: './posts-table-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableWrapperComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _postsQuery: PostsListQuery,
    private readonly _postListService: PostsListService
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.startSearchSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllPosts(): void {
    this._postListService.getAll().subscribe();
  }

  private startSearchSubscribe(): void {
    this._postsQuery
      .select(state => state.query)
      .pipe(
        switchMap((query: string) => {
          return this._postsQuery.selectAll({
            filterBy: (entity: Post) =>
              !!entity.title
                ?.toLocaleLowerCase()
                .includes(query.toLocaleLowerCase()) ||
              !!entity.content
                ?.toLocaleLowerCase()
                .includes(query.toLocaleLowerCase()),
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(rows => {
        this.posts = [...rows];
      });
  }
}
