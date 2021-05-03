import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../../models/author.model';
import { Constant } from '../../constants/constants';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class AuthorService extends CrudService<Author>{

  constructor(
    public http: HttpClient
  ) {
    super(http, Constant.AUTHOR)
   }
}
