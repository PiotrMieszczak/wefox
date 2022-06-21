import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractTuiThemeSwitcher } from '@taiga-ui/cdk';

@Component({
  selector: 'app-dark-theme',
  template: '',
  styleUrls: ['./dark-theme.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DarkThemeComponent extends AbstractTuiThemeSwitcher {}
