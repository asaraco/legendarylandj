import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { API_URL } from '../app.constants';
import { LibraryDataService } from '../service/data/library-data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  fileName: string = "";
  fileMessage: any;
  
  constructor(
    private http: HttpClient,
    private libraryDataService: LibraryDataService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("song", file);
      const upload$: any = this.http.post(`${API_URL}/upload`, formData);
      upload$.subscribe((data: any) => {
        console.log("uploader is doing something");
        this.fileMessage = data.message;
        this.libraryDataService.notifyOfUpload();
      });
    }
  }
}
