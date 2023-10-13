package com.legendarylan.dj;

import java.io.File;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class Controllers {

	@GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }
	
	@CrossOrigin({"http://localhost:4200", "http://"+Const.LOCALHOST_IP+":4200"})
	@PostMapping("/upload")
	@CacheEvict("library")
	public ResponseEntity<?> handleFileUpload( @RequestParam("song") MultipartFile file ) {
		String fileContentType = file.getContentType().toLowerCase();
		String fileName = file.getOriginalFilename();
		if (file.isEmpty() || file.getSize()==0) {
			return ResponseEntity.ok("{\"message\": \"ERROR - File appears to be empty - " + fileName + "\"}");
		} else if (!Const.FILE_TYPES_VALID.contains(fileContentType)) {
			System.out.println("File rejected: Unexpected content type " + fileContentType);
			return ResponseEntity.ok("{\"message\": \"ERROR - File did not match an accepted extension - " + fileName + "\"}");
		} else {
			try {
				file.transferTo(new File(Const.FILES_PATH + fileName));
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
			System.out.println("File uploaded: " + Const.FILES_PATH + fileName);
			return ResponseEntity.ok("{\"message\": \"File uploaded successfully - " + fileName + "\"}");
		}			
	}

}
