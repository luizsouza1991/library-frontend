import { Author } from './author.model';
import { BaseModel } from './base/base.model';

export class Book extends BaseModel {
  public title: string;
  public isbn: string;
  public author: any;
}
