import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxIzitoastService } from 'ngx-izitoast';
import { MessageText } from '../../../constants/constants';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author/author.service';
import { Book } from './../../../models/book.model';
import { BookService } from '../../../services/book/book.service';
import { BookModalComponent } from '../book-modal/book-modal.component';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books: Book[] = [];
  public authors: Author[] = [];
  public page = 1;
  public pageSize = 10;
  public search: string = null;

  @ViewChild(BookModalComponent, { static: false })
  bookModal: BookModalComponent;

  constructor(
    private bookService: BookService,
    private iziToastService: NgxIzitoastService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.authorService.index().subscribe((authors: Author[]) => {
      this.authors = authors;
    })
    this.getBooks(this.authors);
  }

  public getBooks(authors: Author[]) {
    this.bookService.index().subscribe((books: Book[]) => {
      this.books = books;
    })
  }

  public openModal() {
    if (this.authors.length > 0) {
      this.bookModal.authors = this.authors;
      this.bookModal.openModal();
    } else {
      this.iziToastService.warning({
        title: 'Warning',
        message: 'There are no registered authors',
        position:  'topRight'
      })
    }
  }

  public updateList(book: Book) {
    if (this.books.find((b: Book) => b.uuid == book.uuid)) {
      this.books = this.books.filter((b: Book) => b.uuid != book.uuid);
    }
    this.books.unshift(book)
  }

  public edit(book: Book) {
    this.bookModal.uuid = book.uuid;
    this.bookModal.title = book.title;
    this.bookModal.isbn = book.isbn;
    this.bookModal.author = book.author._id;
    this.bookModal.authors = this.authors;
    this.bookModal.edit = true;
    this.bookModal.openModal();
  }

  public delete(book: Book) {
    this.iziToastService.question({
      timeout: 10000,
      close: false,
      position: 'center',
      title: MessageText.TITLE_ALERT,
      message: MessageText.ALERT,
      buttons: [
        ['<button><b>Sim</b></button>', (instance, toast) => {
          this.bookService.destroy(book.uuid).subscribe((data) => {
            this.iziToastService.success({
              title: MessageText.TITLE_SUCCESS,
              message: MessageText.DELETE,
              position:  'topRight'
            })
            this.removeFromList(book);
          });
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
        ['<button>Não</button>', function (instance, toast) {

            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

        }],
      ]
    })
  }

  public removeFromList(book: Book) {
    this.books = this.books.filter((b: Book) => b.uuid != book.uuid);
  }

  public searchBook() {
    let book: any = {};
    let author: Author[] = [];
    book.title = this.search;
    book.isbn = this.search;
    author = this.authors.filter((a: Author) => a.firstName.toLowerCase() == this.search.toLowerCase() || a.lastName.toLowerCase() == this.search.toLowerCase());
    book.author = author.map((a: Author) => {
      return a.uuid
    });

    if (this.search) {
      this.bookService.search(book).subscribe((books: Book[]) => {
        this.books = books;
      })
    } else {
      this.getBooks(this.authors);
    }
  }
}
