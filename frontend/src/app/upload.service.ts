import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UploadService {

  private readonly http = inject(HttpClient);

  // TODO: Task 3.
  // You may add add parameters to the method
  upload(data: any): Observable<any> {
    return this.http.post("/api/upload", data);
  }
}
