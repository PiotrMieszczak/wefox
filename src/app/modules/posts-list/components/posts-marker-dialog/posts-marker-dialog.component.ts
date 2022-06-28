import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';
import { Post, PostsListQuery, PostsListService } from '../../../../store';
import { filter } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';

interface IMarkerDialogData {
  lat: number;
  lng: number;
  id: number;
}

const enum DialogMode {
  CREATE = 'Create',
  EDIT = 'Edit',
}
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
  mode: DialogMode = DialogMode.CREATE;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<boolean, IMarkerDialogData>,
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
      this.mode = DialogMode.EDIT;
    }

    if (!!this.data.lat && this.data.lng) {
      this.setPos(this.data.lat, this.data.lng);
    }
  }

  dismiss(): void {
    this._context.completeWith(false);
  }

  addData(): void {
    // TO DO
    // this._context.completeWith();
  }

  saveData(): void {
    // TO DO
    // this._context.completeWith();
  }

  removeFile(): void {
    this.form.get('image')?.setValue(null);
  }

  private getPositionDetail(id: number) {
    this._postsService.getOne(id);
  }

  private getEditionPosition() {
    this._postsQuery
      .select(store => store.editedLocation)
      .pipe(filter(Boolean))
      .subscribe(() => {
        //TODO update form
      });
  }

  private createForm(): FormGroup {
    return this._fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      lat: new FormControl(''),
      lng: new FormControl(''),
      image: new FormControl(),
    });
  }

  private setPos(lat: number, lng: number) {
    this.form.patchValue({
      lat,
      lng,
    });
  }
}
