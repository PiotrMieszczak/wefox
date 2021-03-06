import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { routerAnimation, ThemeType } from './core';
import { Data, RouterOutlet } from '@angular/router';
import { UiQuery } from './store/ui/state/ui.query';
import { transition, trigger, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('list <=> details', useAnimation(routerAnimation)),
    ]),
  ],
})
export class AppComponent {
  title = 'Posts manager';
  theme$: Observable<ThemeType>;

  constructor(private readonly _uiQuery: UiQuery) {
    this.theme$ = this._uiQuery.select(state => state.ui.theme);
  }

  prepareRoute(outlet: RouterOutlet): Data {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
