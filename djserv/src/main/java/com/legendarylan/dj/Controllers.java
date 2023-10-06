package com.legendarylan.dj;

import java.io.File;

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
	public ResponseEntity<?> handleFileUpload( @RequestParam("song") MultipartFile file ) {
		String fileName = file.getOriginalFilename();
		try {
			file.transferTo(new File("C:\\Users\\Public\\Music\\LANtrax\\" + fileName));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		return ResponseEntity.ok("{\"message\": \"File uploaded successfully - " + fileName + "\"}");
	}

}
