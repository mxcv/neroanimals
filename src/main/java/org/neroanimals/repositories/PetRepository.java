package org.neroanimals.repositories;

import org.neroanimals.models.Pet;
import org.neroanimals.models.PetType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface PetRepository extends JpaRepository<Pet, Integer> {

    Page<Pet> findByTypeAndEndStoryIsNullOrderByBeginStoryDateDesc(Pageable pageable, PetType petType);
    Page<Pet> findByTypeAndEndStoryIsNotNullOrderByEndStoryDateDesc(Pageable pageable, PetType petType);
    Page<Pet> findByEndStoryIsNullOrderByBeginStoryDateDesc(Pageable pageable);
    Page<Pet> findByEndStoryIsNotNullOrderByEndStoryDateDesc(Pageable pageable);
    @Query("select p from Pet p where p.endStory is null and size(p.beginStory.pictures) != 0 order by random()")
    Page<Pet> findRandomWithoutEndStory(Pageable pageable);
}
