import { Component, OnInit } from '@angular/core';
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
  public imageType: string = "image/png";

  // Take picture
  private trigger: Subject<void> = new Subject<void>();
  // Handle multiple cams if exist
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  
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

  public handleImage(webcamImage: WebcamImage): void {
    console.info("Image taken >>>", webcamImage);
    this.webcamImage = webcamImage;
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
