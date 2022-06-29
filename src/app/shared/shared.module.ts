import { NgModule } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [TuiButtonModule],
  exports: [ConfirmationDialogComponent],
  providers: [],
})
export class SharedModuleModule {}
