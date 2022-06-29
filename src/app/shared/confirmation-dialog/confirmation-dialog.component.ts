import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';

import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent implements OnInit {
  message: string = '';

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<boolean, { message: string }>
  ) {}

  ngOnInit(): void {
    this.message = this._context.data.message;
  }

  dismiss(): void {
    this._context.completeWith(false);
  }

  makeAction(): void {
    this._context.completeWith(true);
  }
}
