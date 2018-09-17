export class Destination {
  _id: String;
  name: String;
  description: String;
  categoryId: String;
  siteId: Array<String>;
  rating: Number;
  listPictures: [{
    _id: String,
    destinationId: String,
    name: String
  }];
  categorys: [{
    _id: String;
    name: String;
    description: String
  }];
}
