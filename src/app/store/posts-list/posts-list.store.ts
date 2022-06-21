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
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'posts-list' })
export class PostsListStore extends EntityStore<PostsListState> {
  constructor() {
    super({
      query: '',
    });
  }
}
