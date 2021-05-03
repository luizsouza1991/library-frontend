import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { Book } from './../../../models/book.model';
import { Author } from '../../../models/author.model';
import { NgxIzitoastService } from 'ngx-izitoast';
import { BookService } from '../../../services/book/book.service';
import { MessageText } from '../../../constants/constants';
import { BaseModel } from '../../../models/base/base.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  public uuid: string = null;
  public title: string = null;
  public isbn: string = null;
  public author: string = null;
  public book: Book = new Book();
  public authors: Author[] = [];
  public modalOptions: NgbModalOptions = {};
  public edit: boolean = false;

  @ViewChild('modal') modal: any;
  @Output() addBook = new EventEmitter<BaseModel>();

  constructor(
    private bookService: BookService,
    private modalService: NgbModal,
    private iziToastService: NgxIzitoastService
  ) { }

  ngOnInit(): void {
  }

  public openModal() {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.modalService.open(this.modal, this.modalOptions);
  }

  public save() {
    this.book.title = this.title;
    this.book.isbn = this.isbn;
    this.book.author = this.author;
    if (this.edit) {
      this.update();
    } else {
      this.bookService.create(this.book).subscribe((data: Author) => {
        this.iziToastService.success({
          title: MessageText.TITLE_SUCCESS,
          message: MessageText.SAVE,
          position: 'topRight'
        });

        this.book = new Book();
        this.closeModal();
        this.addBook.emit(data);
      })
    }

  }

  public update() {
    this.book.uuid = this.uuid;
    this.bookService.update(this.book.uuid, this.book).subscribe((data: Book) => {
      this.iziToastService.success({
        title: MessageText.TITLE_SUCCESS,
        message: MessageText.EDIT,
        position:  'topRight'
      });

      this.addBook.emit(data);
      this.edit = false;
      this.book = new Book();
      this.closeModal();
    })
  }

  public closeModal() {
    this.modalService.dismissAll();
  }
}
