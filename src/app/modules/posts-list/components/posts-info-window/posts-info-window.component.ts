import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../store';

@Component({
  selector: 'app-posts-info-window',
  templateUrl: './posts-info-window.component.html',
  styleUrls: ['./posts-info-window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsInfoWindowComponent {
  @Input()
  data: Post | null = null;
}
