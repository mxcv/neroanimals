package org.neroanimals.controllers;

import org.neroanimals.dto.in.PetIn;
import org.neroanimals.dto.out.PageResponse;
import org.neroanimals.dto.out.PetOut;
import org.neroanimals.mappers.Mapper;
import org.neroanimals.models.Pet;
import org.neroanimals.models.PetType;
import org.neroanimals.services.PetService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/pets")
@AllArgsConstructor
public class PetController {

    private final PetService petService;
    private final Mapper<Pet, PetIn, PetOut> mapper;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public int post(@RequestPart PetIn pet,
                    @RequestPart(required = false) MultipartFile[] beginStoryPictures,
                    @RequestPart(required = false) MultipartFile[] endStoryPictures) {
        return petService.add(mapper.deserialize(pet), beginStoryPictures, endStoryPictures);
    }

    @PatchMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public void patch(@PathVariable int id,
                      @RequestPart PetIn pet,
                      @RequestPart(required = false) MultipartFile[] beginStoryPictures,
                      @RequestPart(required = false) MultipartFile[] endStoryPictures) {

        Pet model = mapper.deserialize(pet);
        model.setId(id);
        petService.update(model, beginStoryPictures, endStoryPictures);
    }

    @DeleteMapping ("{id}")
    @PreAuthorize("isAuthenticated()")
    public void delete(@PathVariable int id) {
        petService.delete(id);
    }

    @GetMapping
    public PageResponse<PetOut> get(@RequestParam int pageNumber,
                                    @RequestParam int pageSize,
                                    @RequestParam boolean withEndStory,
                                    @RequestParam(required = false) PetType petType) {

        Page<Pet> page = petService.getAll(PageRequest.of(pageNumber, pageSize), withEndStory, petType);
        return new PageResponse<>((int)page.getTotalElements(), page.map(mapper::serialize).toList());
    }

    @GetMapping("random")
    public List<PetOut> getRandom(@RequestParam int count) {
        return petService.getRandomWithoutEndStory(count)
            .stream()
            .map(mapper::serialize)
            .toList();
    }

    @GetMapping("{id}")
    public PetOut get(@PathVariable int id) {
        return mapper.serialize(petService.getById(id));
    }
}
