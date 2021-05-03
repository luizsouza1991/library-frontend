import { Component, OnInit, ViewChild } from '@angular/core';
import { Author } from '../../../models/author.model';
import { AuthorService } from '../../../services/author/author.service';
import { AuthorModalComponent } from '../author-modal/author-modal.component';
import { NgxIzitoastService } from 'ngx-izitoast';
import { MessageText } from '../../../constants/constants';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  public authors: Author[] = [];
  public page = 1;
  public pageSize = 10;
  public search: string = null;

  @ViewChild(AuthorModalComponent, { static: false })
  authorModal: AuthorModalComponent;

  constructor(
    private authorService: AuthorService,
    private iziToastService: NgxIzitoastService
  ) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  public getAuthors() {
    this.authorService.index().subscribe((authors: Author[]) => {
      this.authors = authors;
    })
  }

  public openModal() {
    this.authorModal.openModal();
  }

  public updateList(author: Author) {
    if (this.authors.find((a: Author) => a.uuid == author.uuid)) {
      this.authors = this.authors.filter((a: Author) => a.uuid != author.uuid);
    }
    this.authors.unshift(author)
  }

  public edit(author: Author) {
    this.authorModal.firstName = author.firstName;
    this.authorModal.lastName = author.lastName;
    this.authorModal.uuid = author.uuid;
    this.authorModal.edit = true;
    this.authorModal.openModal()
  }

  public delete(author: Author) {
    this.iziToastService.question({
      timeout: 10000,
      close: false,
      position: 'center',
      title: MessageText.TITLE_ALERT,
      message: MessageText.ALERT,
      buttons: [
        ['<button><b>Sim</b></button>', (instance, toast) => {
          this.authorService.destroy(author.uuid).subscribe((data) => {
            this.iziToastService.success({
              title: MessageText.TITLE_SUCCESS,
              message: MessageText.DELETE,
              position:  'topRight'
            })
            this.removeFromList(author);
          });
          instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
        }, true],
        ['<button>Não</button>', function (instance, toast) {

            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

        }],
      ]
    })
  }

  public removeFromList(author: Author) {
    this.authors = this.authors.filter((a: Author) => a.uuid != author.uuid);
  }

  public authorSearch() {
    let author = new Author();
    author.firstName = this.search;
    author.lastName = this.search;
    if (this.search) {
      this.authorService.search(author).subscribe((authors: Author[]) => {
        this.authors = authors;
      })
    } else {
      this.getAuthors()
    }
  }
}
