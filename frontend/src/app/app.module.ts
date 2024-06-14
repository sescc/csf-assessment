import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './views/main.component';
import { PictureComponent } from './views/picture.component';
import { WebcamModule } from 'ngx-webcam';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { UploadService } from './upload.service';
import { leavePicture } from './guards';

const appRoute : Routes = [
  
  {path: "", component: MainComponent},
  {path: "picture", component: PictureComponent,
    canDeactivate: [ leavePicture ]
  },
  {path:"**", redirectTo: "/", pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent, MainComponent, PictureComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute, {useHash: true}),
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
  ],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
