import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { ThemeSwitcherComponent } from './theme-switcher.component';

import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, forwardRef } from '@angular/core';
import { UiService } from '../../../../../store/ui/state/ui.service';

@Component({
  template: '<div></div>',
  selector: 'app-tui-toggle',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TuiToggleMockComponent),
      multi: true,
    },
  ],
})
class TuiToggleMockComponent {
  constructor() {}
  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}

describe('ThemeSwitcherComponent', () => {
  let spectator: Spectator<ThemeSwitcherComponent>;
  let uiService: UiService;

  const createComponent = createComponentFactory({
    component: ThemeSwitcherComponent,
    declarations: [TuiToggleMockComponent],
    imports: [FormsModule, ReactiveFormsModule],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => TuiToggleMockComponent),
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    uiService = spectator.inject(UiService);
  });

  it('should create with form', () => {
    expect(spectator.component).toBeDefined();
    expect(spectator.component.form).toBeDefined();
  });

  it('should set theme to dark on true', () => {
    const spy = jest.spyOn(uiService, 'changeTheme');
    spectator.component.form.setValue({
      themeControl: true,
    });

    spectator.component.form.controls['themeControl'].valueChanges.subscribe(
      val => {
        expect(val).toBe('dark');
        expect(spy).toBeCalledWith('dark');
      }
    );
  });
});
