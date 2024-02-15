package org.neroanimals.services;

import org.neroanimals.models.Picture;
import org.neroanimals.repositories.PictureRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;

    public Picture getById(int id) {
        return pictureRepository.findById(id).orElseThrow();
    }
}
