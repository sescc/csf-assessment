import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject, Subscription, map, of } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  // TODO: Task 1
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 500},
    height: {ideal: 282}
  };
  public imageType: string = "image/png";
  public errors: WebcamInitError[] = [];

  // Image taken
  public webcamImage!: WebcamImage;
  
  @Output()
  private processedImg: string = "";

  @Output()
  imageCapture = new EventEmitter<WebcamImage>();

  // Take picture
  private trigger: Subject<void> = new Subject<void>();


  private aspectForm!: FormGroup;
  private sub$!: Subscription;
  private heights = [282, 375, 333, 500];

  private readonly fb = inject(FormBuilder);

  
  ngOnInit(): void {

    this.aspectForm = this.fb.group({
      height: this.fb.control("")
      // height: [""]
    });
    // this.height = this.changeAspectRatio();
    // of(this.changeAspectRatio()).subscribe(heights => {
    //   this.heights = heights;
    //   this.aspectForm.controls.heights.patchValue(this.heights[0].id);
    // });

    this.sub$ = this.aspectForm.valueChanges
      .pipe(
        map(
          value => {
            return {value};
          }
        )
      )
      .subscribe(
        {
          next: (value) => {
            // this.heights[0].value = value;
            console.info("Debug: form value >>>", value)
          },
          error: (error) => {
            console.info("Error >>>", error)
          }
        }
      )
      
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
}

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public captureImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.processedImg = webcamImage!.imageAsDataUrl;
    console.info("Image taken >>>", webcamImage, this.processedImg);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }


  changeAspectRatio() {
    return [
      { id: 282, name: "16:9", },
      { id: 375, name: "4:3", },
      { id: 333, name: "3:2", },
      { id: 500, name: "1:1", },
    ]
  }

}
