import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import {
  DIALOG_MODE,
  IMarkerDialogData,
  Post,
  PostsListQuery,
  PostsListService,
} from '../../../../store';
import { filter } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SafeAny } from '../../../../core';

@Component({
  selector: 'app-posts-marker-dialog',
  templateUrl: './posts-marker-dialog.component.html',
  styleUrls: ['./posts-marker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsMarkerDialogComponent implements OnInit {
  data: IMarkerDialogData | undefined = undefined;
  editedPosition: Post | null = null;
  form: FormGroup;
  mode: DIALOG_MODE = DIALOG_MODE.CREATE;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<SafeAny, IMarkerDialogData>,
    private readonly _postsService: PostsListService,
    private readonly _postsQuery: PostsListQuery,
    private readonly _fb: FormBuilder
  ) {
    this.data = _context.data;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (!this.data) {
      return;
    }

    if (!!this.data.id) {
      this.getPositionDetail(this.data.id);
      this.getEditionPosition();
      this.mode = DIALOG_MODE.EDIT;
      return;
    }

    if (!!this.data.lat && this.data.lng) {
      this.setPos(this.data.lat, this.data.lng);
    }
  }

  dismiss(): void {
    this._context.completeWith(false);
  }

  saveData(type: string): void {
    this._context.completeWith({
      type,
      data:
        this.data && this.data.id
          ? { ...this.form.getRawValue(), id: this.data?.id }
          : this.form.getRawValue(),
    });
  }

  removeFile(): void {
    this.form.get('image')?.setValue(null);
  }

  private getPositionDetail(id: number) {
    this._postsService.getOne(id).subscribe();
  }

  private getEditionPosition() {
    this._postsQuery
      .select(store => store.editedLocation)
      .pipe(filter(Boolean))
      .subscribe((res: Post) => {
        this.setFormValue(res);
      });
  }

  private createForm(): FormGroup {
    return this._fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      lat: new FormControl(''),
      long: new FormControl(''),
      image_url: new FormControl(),
    });
  }

  private setPos(lat: number, long: number) {
    this.form.patchValue({
      lat,
      long,
    });
  }

  private setFormValue(post: Post): void {
    this.form.setValue({
      title: post.title,
      content: post.content,
      lat: post.lat,
      long: post.long,
      image_url: post.image_url,
    });
  }
}
