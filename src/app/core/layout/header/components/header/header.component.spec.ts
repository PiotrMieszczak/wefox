import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HeaderComponent } from './header.component';
import { HeaderModule } from '../../header.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [HeaderModule, RouterTestingModule],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have tittle', () => {
    const mockTitle = 'Test Title';
    spectator.setInput('title', mockTitle);
    spectator.detectChanges();

    const titleHtml = spectator.query('.title');

    expect(titleHtml).toBeDefined();
    expect(titleHtml?.innerHTML).toBe(mockTitle);
  });
});
