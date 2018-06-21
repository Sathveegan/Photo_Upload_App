package com.sliit.project.WebApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sliit.project.WebApp.service.UploadService;

@RestController
@RequestMapping("/image/")
public class UploadController {

	private UploadService uploadService;
	
	@Autowired
	UploadController(UploadService uploadService) {
		this.uploadService = uploadService;
	}
	
	@PostMapping("/upload")
	public String uploadImage(@RequestPart(value = "imageFile") MultipartFile file) {
		return this.uploadService.uploadImage(file);
	}
	
}
