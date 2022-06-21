export class Post {
  id: number;
  title: string;
  content: string;
  lat: string;
  long: string;
  image_url: string;

  constructor(prop: IPost) {
    this.title = prop.title;
    this.id = prop.id;
    this.lat = prop.lat;
    this.long = prop.long;
    this.content = prop.content;
    this.image_url = prop.image_url;
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
