import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from 'src/app/services/author/author.service';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit {
  public books: Book[] = [];
  public authors: Author[] = [];
  public page = 1;
  public pageSize = 3;
  public search: string = null;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.authorService.index().subscribe((authors: Author[]) => {
      this.authors = authors;
    })
    this.getBooks();
  }

  public getBooks() {
    this.bookService.index().subscribe((books: Book[]) => {
      this.books = books;
    })
  }

  public bookSearch() {
    let book: Book = new Book();
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
      this.getBooks();
    }
  }
}
