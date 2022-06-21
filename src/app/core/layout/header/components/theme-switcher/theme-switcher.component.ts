import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UiService } from '../../../../../store/ui/state/ui.service';
import { iif, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ThemeType } from '../../../../index';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnDestroy {
  form: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _uiService: UiService
  ) {
    this.form = this.buildForm();
    this.startSubForThemeChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  startSubForThemeChanges(): void {
    this.form.controls['themeControl'].valueChanges
      .pipe(
        switchMap(v => {
          return iif(
            () => !v,
            of('default' as ThemeType),
            of('dark' as ThemeType)
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((theme: ThemeType) => {
        this._uiService.changeTheme(theme);
      });
  }

  private buildForm(): FormGroup {
    return this._fb.group({
      themeControl: new FormControl(false),
    });
  }
}
