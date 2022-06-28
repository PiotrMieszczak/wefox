import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post } from '../../../../store';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsTableComponent {
  @Input()
  data: Post[] = [];
  dropdownOpen = false;

  readonly columns = ['title', 'content', 'lat', 'long', 'actions'];

  edit(item: Post) {
    //TODO
  }

  remove(item: Post) {
    //TODO
  }
}
