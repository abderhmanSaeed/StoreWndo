import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }


  openFile(blob: Blob): void {
    var downloadURL = window.URL.createObjectURL(blob);
    window.open( 
      downloadURL, "_blank");
  }

  downloadFile(blob: Blob): void {
    var downloadURL = window.URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = downloadURL;
    link.download = "Pdf.pdf";
    link.click();
    // Remove element from DOM
    document.body.removeChild(link);
  }

  createObjectURL(event: any): Promise<any> {
    return new Promise( (resolve , reject) => {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      }
    })
  }

}
