import {
  byText,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { SafeAny } from '../../core';

describe('PostDialogComponent', () => {
  let spectator: Spectator<ConfirmationDialogComponent>;
  let context: TuiDialogContext<boolean, { message: string }>;

  const createComponent = createComponentFactory({
    component: ConfirmationDialogComponent,
    providers: [
      {
        provide: POLYMORPHEUS_CONTEXT,
        useValue: {
          completeWith: jest.fn(),
          data: { message: 'test' },
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    context = spectator.inject(POLYMORPHEUS_CONTEXT) as SafeAny;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should assign dialog message to local variable', () => {
    spectator.component.ngOnInit();
    spectator.detectChanges();

    expect(spectator.component.message).toBe('test');
  });

  it('should close dialog on clicking Yes btn', () => {
    spectator.click(byText('Yes'));
    const closeSpy = jest.spyOn(context, 'completeWith');
    spectator.component.makeAction();

    expect(closeSpy).toHaveBeenCalledWith(true);
  });

  it('should dismiss dialog', () => {
    spectator.click(byText('Cancel'));
    const closeSpy = jest.spyOn(context, 'completeWith');
    spectator.component.dismiss();

    expect(closeSpy).toHaveBeenCalledWith(false);
  });
});
