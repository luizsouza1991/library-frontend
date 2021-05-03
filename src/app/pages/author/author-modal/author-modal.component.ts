import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../../../services/author/author.service';
import { Author } from '../../../models/author.model';
import { NgxIzitoastService } from 'ngx-izitoast';
import { MessageText } from '../../../constants/constants';
import { BaseModel } from '../../../models/base/base.model';

@Component({
  selector: 'app-author-modal',
  templateUrl: './author-modal.component.html',
  styleUrls: ['./author-modal.component.css']
})
export class AuthorModalComponent implements OnInit {
  public uuid: string = null;
  public firstName: string = null;
  public lastName: string = null;
  public author: Author = new Author();
  public modalOptions: NgbModalOptions = {};
  public edit: boolean = false;

  @ViewChild('modal') modal: any;
  @Output() addAuthor = new EventEmitter<BaseModel>();

  constructor(
    private modalService: NgbModal,
    private authorService: AuthorService,
    public iziToastService: NgxIzitoastService
  ) { }

  ngOnInit(): void {
  }

  public async openModal() {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.modalService.open(this.modal, this.modalOptions);
  }

  public closeModal() {
    this.modalService.dismissAll()
  }

  public save() {
    this.author.firstName = this.firstName;
    this.author.lastName = this.lastName;
    if (this.edit) {
      this.update();
    } else {
      this.authorService.create(this.author).subscribe((data: Author) => {
        this.iziToastService.success({
          title: MessageText.TITLE_SUCCESS,
          message: MessageText.SAVE,
          position: 'topRight'
        });

        this.firstName = null;
        this.lastName = null;
        this.closeModal();
        this.addAuthor.emit(data);
      })
    }

  }

  public update() {
    this.author.uuid = this.uuid;
    this.authorService.update(this.author.uuid, this.author).subscribe((data: Author) => {
      this.iziToastService.success({
        title: MessageText.TITLE_SUCCESS,
        message: MessageText.EDIT,
        position:  'topRight'
      });
      this.addAuthor.emit(this.author);
      this.edit = false;
      this.firstName = null;
      this.lastName = null;
      this.closeModal();
    })
  }
}
