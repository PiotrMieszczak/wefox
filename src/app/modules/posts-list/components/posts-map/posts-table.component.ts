import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../store';

@Component({
  selector: 'app-posts-map',
  templateUrl: './posts-map.component.html',
  styleUrls: ['./posts-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsMapComponent {
  @Input()
  data: Post[] = [];
  dropdownOpen = false;

  readonly columns = ['title', 'content', 'lat', 'long', 'actions'];

  view(item: Post) {
    //TODO
  }

  edit(item: Post) {
    //TODO
  }

  remove(item: Post) {
    //TODO
  }
}
