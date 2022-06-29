import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Post, PostsListQuery, PostsListService } from '../../../../store';

@Component({
  selector: 'app-posts-table-wrapper',
  templateUrl: './posts-table-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableWrapperComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  activeItemIndex = 0;
  mapVisible = true;

  constructor(
    private readonly _postsQuery: PostsListQuery,
    private readonly _postListService: PostsListService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllPosts();
    this.startSearchSubscribe();
    this.refreshDataSub();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllPosts(): void {
    this._postListService.getAll().subscribe();
  }

  showMap(show: boolean) {
    this.mapVisible = show;
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
        this._cdr.markForCheck();
      });
  }

  private refreshDataSub(): void {
    this._postsQuery
      .select(store => store.refreshData)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.getAllPosts();
      });
  }
}
