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
}
