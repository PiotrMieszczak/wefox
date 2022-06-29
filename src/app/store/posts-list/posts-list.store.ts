import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Post } from './posts-list.model';

export interface PostsListState extends EntityState<Post>, ActiveState {
  query: string;
  editedLocation: Post | null;
  refreshData: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts-list' })
export class PostsListStore extends EntityStore<PostsListState> {
  constructor() {
    super({
      query: '',
      editedLocation: null,
      refreshData: false,
    });
  }
}
