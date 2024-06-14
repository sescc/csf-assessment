import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  // TODO: Task 1
  public showWebcam = true;
  public multipleWebcamsAvailable = false;
  public videoOptions: MediaTrackConstraints = {
    width: {ideal: 500},
    height: {ideal: 282}
  };
  public errors: WebcamInitError[] = [];

  // Image taken
  public webcamImage!: WebcamImage;
  processedImg = "";

  // Take picture
  private trigger: Subject<void> = new Subject<void>();
  // Handle multiple cams if exist
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();


  private aspectForm!: FormGroup;
  private readonly formbuilder = inject(FormBuilder);

  
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && MediaDevices.length > 1;
      })
      
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

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

}
