import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { Post, PostsListService } from '../../../../store';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PostsMarkerDialogComponent } from '../posts-marker-dialog/posts-marker-dialog.component';
import { filter, iif, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableComponent {
  @Input()
  data: Post[] = [];
  dropdownOpen = false;

  readonly columns = ['title', 'content', 'lat', 'long', 'actions'];

  constructor(
    @Inject(TuiDialogService) private readonly _dialogService: TuiDialogService,
    @Inject(Injector) private readonly _injector: Injector,
    private readonly _postsService: PostsListService
  ) {}

  edit(item: Post) {
    this._dialogService
      .open(
        new PolymorpheusComponent(PostsMarkerDialogComponent, this._injector),
        {
          dismissible: true,
          label: 'Edit post',
          data: {
            id: item.id,
          },
        }
      )
      .pipe(
        filter(Boolean),
        switchMap((res: any) => this._postsService.update(res.data)),
        tap(() => this._postsService.setRefreshState(true))
      )
      .subscribe();
  }

  remove(item: Post): void {
    this._postsService
      .delete(item)
      .pipe(take(1))
      .subscribe(() => {
        this._postsService.setRefreshState(true);
      });
  }
}
