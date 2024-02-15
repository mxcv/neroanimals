package org.neroanimals.services;

import org.neroanimals.models.PetType;
import org.neroanimals.models.Picture;
import org.neroanimals.models.Pet;
import org.neroanimals.models.Story;
import org.neroanimals.repositories.PictureRepository;
import org.neroanimals.repositories.PetRepository;
import org.neroanimals.repositories.StoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;
    private final PictureRepository pictureRepository;
    private final StoryRepository storyRepository;

    public int add(Pet pet, MultipartFile[] beginStoryPictures, MultipartFile[] endStoryPictures) {
        if (pet.getBeginStory() != null && beginStoryPictures != null)
            pet.getBeginStory().setPictures(filesToPictures(beginStoryPictures));
        if (pet.getEndStory() != null && endStoryPictures != null)
            pet.getEndStory().setPictures(filesToPictures(endStoryPictures));
        petRepository.save(pet);
        return pet.getId();
    }

    public void update(Pet pet, MultipartFile[] beginStoryPictures, MultipartFile[] endStoryPictures) {
        Pet origin = petRepository.findById(pet.getId()).orElseThrow();
        updatePetStory(pet::getBeginStory, origin::getBeginStory, origin::setBeginStory, beginStoryPictures);
        updatePetStory(pet::getEndStory, origin::getEndStory, origin::setEndStory, endStoryPictures);
        petRepository.save(pet);
    }

    public Page<Pet> getAll(Pageable pageable, boolean withEndStory, PetType type) {
        if (type == null) {
            if (withEndStory)
                return petRepository.findByEndStoryIsNotNullOrderByEndStoryDateDesc(pageable);
            return petRepository.findByEndStoryIsNullOrderByBeginStoryDateDesc(pageable);
        }
        if (withEndStory)
            return petRepository.findByTypeAndEndStoryIsNotNullOrderByEndStoryDateDesc(pageable, type);
        return petRepository.findByTypeAndEndStoryIsNullOrderByBeginStoryDateDesc(pageable, type);
    }

    public List<Pet> getRandomWithoutEndStory(int count) {
        return petRepository.findRandomWithoutEndStory(PageRequest.of(0, count)).getContent();
    }

    public Pet getById(int id) {
        return petRepository.findById(id).orElseThrow();
    }

    public void delete(int id) {
        petRepository.delete(petRepository.findById(id).orElseThrow());
    }

    private void updatePetStory(Supplier<Story> newStoryGetter,
                                Supplier<Story> oldStoryGetter,
                                Consumer<Story> oldStorySetter,
                                MultipartFile[] pictures) {
        if (oldStoryGetter.get() != null) {
            if (pictures != null) {
                List<Picture> oldPictures = oldStoryGetter.get().getPictures();
                oldStoryGetter.get().setPictures(null);
                pictureRepository.deleteAll(oldPictures);
                newStoryGetter.get().setPictures(filesToPictures(pictures));
            }
            else
                newStoryGetter.get().setPictures(oldStoryGetter.get().getPictures());
            if (newStoryGetter.get() == null) {
                Story story = oldStoryGetter.get();
                oldStorySetter.accept(null);
                storyRepository.delete(story);
            }
            else
                newStoryGetter.get().setId(oldStoryGetter.get().getId());
        }
    }

    private List<Picture> filesToPictures(MultipartFile[] files) {
        return Arrays.stream(files)
            .map(file -> {
                try {
                    return Picture.builder()
                        .fileType(file.getContentType())
                        .data(file.getBytes())
                        .build();
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            })
            .collect(Collectors.toList());
    }
}
