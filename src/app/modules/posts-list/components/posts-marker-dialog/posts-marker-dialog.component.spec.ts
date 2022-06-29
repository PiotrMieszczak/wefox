import { PostsMarkerDialogComponent } from './posts-marker-dialog.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { TuiDialogContext } from '@taiga-ui/core';
import { SafeAny } from '../../../../core';
import { DIALOG_MODE, IMarkerDialogData } from '../../../../store';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiTextAreaModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostsMarkerDialogComponent', () => {
  let spectator: Spectator<PostsMarkerDialogComponent>;
  let context: TuiDialogContext<SafeAny, IMarkerDialogData>;

  const createComponent = createComponentFactory({
    component: PostsMarkerDialogComponent,
    imports: [
      ReactiveFormsModule,
      TuiInputModule,
      HttpClientTestingModule,
      TuiTextAreaModule,
    ],
    providers: [
      {
        provide: POLYMORPHEUS_CONTEXT,
        useValue: { completeWith: jest.fn() },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    context = spectator.inject(POLYMORPHEUS_CONTEXT) as SafeAny;
  });

  it('should create component with form ', () => {
    expect(spectator.component).toBeTruthy();
    expect(spectator.component.form).toBeTruthy();
  });

  it('should close dialog on dismiss ', () => {
    const spy = jest.spyOn(context, 'completeWith');
    spectator.component.dismiss();

    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should send data to parent component ', () => {
    const spy = jest.spyOn(context, 'completeWith');
    spectator.component.saveData('create');

    expect(spy).toHaveBeenCalledWith({
      type: 'create',
      data: spectator.component.form.getRawValue(),
    });
  });
});
