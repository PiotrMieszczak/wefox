import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TuiButtonModule } from '@taiga-ui/core';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { TuiToggleModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DarkThemeComponent } from './components/dark-theme/dark-theme.component';

@NgModule({
  declarations: [HeaderComponent, ThemeSwitcherComponent, DarkThemeComponent],
  imports: [
    CommonModule,
    FormsModule,
    TuiButtonModule,
    TuiToggleModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [HeaderComponent, DarkThemeComponent],
})
export class HeaderModule {}
