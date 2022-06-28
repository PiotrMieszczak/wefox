import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
} from '@angular/core';
import { Post } from '../../../../store';
import { TuiDialogService } from '@taiga-ui/core';
import { filter, take } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { PostsMarkerDialogComponent } from '../posts-marker-dialog/posts-marker-dialog.component';

@Component({
  selector: 'app-posts-map',
  templateUrl: './posts-map.component.html',
  styleUrls: ['./posts-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsMapComponent {
  @Input()
  data: Post[] = [];

  constructor(
    @Inject(TuiDialogService) private readonly _dialogService: TuiDialogService,
    @Inject(Injector) private readonly _injector: Injector
  ) {}

  zoom = 3;
  // @ts-ignore
  // center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    center: { lat: 40.41678, lng: -3.70379 },
  };

  onClick(e: google.maps.MapMouseEvent | google.maps.IconMouseEvent): void {
    this._dialogService
      .open(
        new PolymorpheusComponent(PostsMarkerDialogComponent, this._injector),
        {
          dismissible: true,
          label: 'Create new marker',
          data: {
            lat: e.latLng?.lat(),
            lng: e.latLng?.lng(),
          },
        }
      )
      .pipe(take(1), filter(Boolean))
      .subscribe(res => {
        console.log(res);
      });
  }
}
