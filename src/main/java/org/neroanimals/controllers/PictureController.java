package org.neroanimals.controllers;

import org.neroanimals.models.Picture;
import org.neroanimals.services.PictureService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("pictures")
@AllArgsConstructor
public class PictureController {

    private final PictureService pictureService;

    @GetMapping("{id}")
    public ResponseEntity<byte[]> get(@PathVariable int id) {
        Picture picture = pictureService.getById(id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(picture.getFileType()));
        return new ResponseEntity<>(picture.getData(), headers, HttpStatus.OK);
    }
}
