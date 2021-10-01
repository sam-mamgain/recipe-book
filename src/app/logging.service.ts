import { Injectable } from "@angular/core";

// 1st way of providing the service and probably the best way to provide the service in the root of the application
@Injectable({
  providedIn: "root",
})
export class LoggingService {
  lastLog: string;
  printLog(message: string) {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}
