package org.neroanimals.mappers;

import org.neroanimals.dto.in.PetIn;
import org.neroanimals.dto.in.StoryIn;
import org.neroanimals.dto.out.PetOut;
import org.neroanimals.dto.out.StoryOut;
import org.neroanimals.models.Pet;
import org.neroanimals.models.Story;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class PetMapper implements Mapper<Pet, PetIn, PetOut> {

    private Mapper<Story, StoryIn, StoryOut> storyMapper;

    @Override
    public PetOut serialize(Pet model) {
        return PetOut.builder()
                .id(model.getId())
                .type(model.getType())
                .title(model.getTitle())
                .phoneNumber(model.getPhoneNumber())
                .beginStory(storyMapper.serialize(model.getBeginStory()))
                .endStory(storyMapper.serialize(model.getEndStory()))
                .build();
    }

    @Override
    public Pet deserialize(PetIn in) {
        return Pet.builder()
                .type(in.getType())
                .title(in.getTitle())
                .phoneNumber(in.getPhoneNumber())
                .beginStory(storyMapper.deserialize(in.getBeginStory()))
                .endStory(storyMapper.deserialize(in.getEndStory()))
                .build();
    }
}
