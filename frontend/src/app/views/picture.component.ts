import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Picture } from '../models';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.css'
})
export class PictureComponent implements OnInit {

  // TODO: Task 2
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly uploadSvc = inject(UploadService);

  picForm!: FormGroup;
  processedPic!: ""
  blob!: Blob;

  ngOnInit(): void {
      this.picForm = this.fb.group({
        title: this.fb.control("", [Validators.required, Validators.minLength(5)]),
        comments: this.fb.control(""),
      })
    }

  // TODO: Task 3
  submit() {
    const formData = new FormData();
    formData.set("title", this.picForm.get("title")?.value);
    formData.set("comments", this.picForm.get("comments")?.value);
    formData.set("date", (new Date().toISOString()));
    formData.set("imageFile", this.processedPic)

    firstValueFrom(this.uploadSvc.upload(formData))
    .then(resp => {
      console.info("Debug: resp >>>", JSON.stringify(resp));
    })
    .catch(error => {
      console.error("Debug: error >>>", JSON.stringify(error));
    })

    // return firstValueFrom(this.httpClient.post<UploadPic>("/api/upload",formData));
  }

}
