import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookreqModel, LibraryService} from '../../services/library.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-request-book',
  templateUrl: './request-book.page.html',
  styleUrls: ['./request-book.page.scss'],
})
export class RequestBookPage implements OnInit {
  isLoading = false;
  form: FormGroup;

  constructor(private libraryService: LibraryService,
              private toastCtrl: ToastController) {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      author: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      })
    });
  }

  ngOnInit() {
  }

  async send() {
    this.isLoading = true;
    const requestedBook: BookreqModel = {
      _id: null,
      title: this.form.value.title,
      author: this.form.value.author,
      email: this.form.value.email,
      mobile: null,
      description: null,
      status: false
    };
    const toast = await this.toastCtrl.create({
      message: 'درخواست با موفقیت ارسال شد',
      duration: 3000
    });

    this.libraryService.requestBook(requestedBook).subscribe((resp) => {
      this.isLoading = false;
      toast.present();
      this.form.reset();
    });
  }

}
