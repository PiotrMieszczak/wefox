export class Post {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;
  marker: Marker;

  constructor(prop: IPost) {
    this.title = prop.title;
    this.id = prop.id;
    this.lat = prop.lat;
    this.long = prop.long;
    this.content = prop.content;
    this.image_url = prop.image_url;
    this.marker = new Marker(
      prop.title,
      parseFloat(prop.lat),
      parseFloat(prop.long)
    );
  }
}

export class Marker {
  // @ts-ignore
  position: google.maps.LatLngLiteral;
  title: string = '';
  options = { animation: google.maps.Animation.DROP };
  constructor(title: string, lat: number, lng: number) {
    this.title = title;
    this.position = { lat, lng };
  }
}

export interface IPost {
  id: number;
  title: string;
  lat: string;
  long: string;
  content: string;
  image_url: string;
}
