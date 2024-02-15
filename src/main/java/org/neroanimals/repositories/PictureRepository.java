package org.neroanimals.repositories;

import org.neroanimals.models.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureRepository extends JpaRepository<Picture, Integer> {
}
