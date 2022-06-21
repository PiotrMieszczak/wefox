import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { UI } from './ui.model';
import { ThemeType } from '../../../core';

export interface UiState extends EntityState<UI> {
  ui: {
    theme: ThemeType;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends EntityStore<UiState> {
  constructor() {
    super({
      ui: { theme: 'default' },
    });
  }
}
