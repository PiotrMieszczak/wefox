import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { debounceTime, filter, startWith, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PostsListQuery, PostsListService } from '../../../../store';

const DELAY_TIME = 300;

@Component({
  selector: 'app-posts-table-searchbar',
  templateUrl: './posts-table-searchbar.component.html',
  styleUrls: ['./posts-table-searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableSearchbarComponent implements OnDestroy {
  form: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _postsService: PostsListService,
    private readonly _postsQuery: PostsListQuery,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.form = this.buildForm();
    this.startSearchSubscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.refreshDataSub();
  }

  private startSearchSubscribe(): void {
    this.form
      .get('quickSearch')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(DELAY_TIME),
        takeUntil(this.destroy$)
      )
      .subscribe(res => this._postsService.setQuery(res));
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      quickSearch: new FormControl(''),
    });
  }

  private refreshDataSub(): void {
    this._postsQuery
      .select(store => store.refreshData)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.form.reset();
        this._cdr.markForCheck();
      });
  }
}
