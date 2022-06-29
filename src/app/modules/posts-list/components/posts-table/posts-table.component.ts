import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { DIALOG_MODE, Post, PostsListService } from '../../../../store';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PostsMarkerDialogComponent } from '../posts-marker-dialog/posts-marker-dialog.component';
import { filter, iif, switchMap, take, tap } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../../shared/confirmation-dialog/confirmation-dialog.component';

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

  add(): void {
    this._dialogService
      .open(
        new PolymorpheusComponent(PostsMarkerDialogComponent, this._injector),
        {
          dismissible: true,
          label: 'Add new post',
          data: null,
        }
      )
      .pipe(
        filter(Boolean),
        switchMap((res: any) => this._postsService.create(res.data)),
        tap(() => this._postsService.setRefreshState(true))
      )
      .subscribe();
  }

  edit(item: Post): void {
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
    this._dialogService
      .open(
        new PolymorpheusComponent(ConfirmationDialogComponent, this._injector),
        {
          dismissible: true,
          label: 'Remove item',
          data: {
            message: 'Do you want to remove item?',
          },
        }
      )
      .pipe(
        filter(Boolean),
        switchMap(() => this._postsService.delete(item)),
        tap(() => this._postsService.setRefreshState(true))
      )
      .subscribe();
  }
}
