import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../../constants/constants';
import { CrudService } from '../crud/crud.service';
import { Book } from './../../models/book.model';

@Injectable()
export class BookService extends CrudService<Book> {

  constructor(
    public http: HttpClient
  ) {
    super(http, Constant.BOOK)
   }
}
