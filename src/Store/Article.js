import { field } from "@nozbe/watermelondb/decorators";

class Article extends Model {
  static table = "articles";
  @field("id") id;
  @field("source") source;
  @field("image") image;
  @field("description") description;
  @field("dateAdded") dateAdded;
  @field("datePosted") datePosted;
  @field("author") author;
  @field("title") title;
}
