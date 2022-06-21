import { Injectable } from '@angular/core';

import { UiStore } from './ui.store';
import { ThemeType } from '../../../core';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private readonly _uiStore: UiStore) {}

  changeTheme(theme: ThemeType): void {
    this._uiStore.update({ ui: { theme } });
  }
}
