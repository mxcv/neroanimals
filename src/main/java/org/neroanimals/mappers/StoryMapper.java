package org.neroanimals.mappers;

import org.neroanimals.dto.in.StoryIn;
import org.neroanimals.dto.out.StoryOut;
import org.neroanimals.models.Picture;
import org.neroanimals.models.Story;
import org.springframework.stereotype.Component;

@Component
public class StoryMapper implements Mapper<Story, StoryIn, StoryOut> {

    @Override
    public StoryOut serialize(Story model) {
        return model == null ? null : StoryOut.builder()
                .date(model.getDate())
                .description(model.getDescription())
                .city(model.getCity())
                .countryCode(model.getCountryCode())
                .pictures(model.getPictures().stream().map(Picture::getId).toArray(Integer[]::new))
                .build();
    }

    @Override
    public Story deserialize(StoryIn in) {
        return in == null ? null : Story.builder()
                .date(in.getDate())
                .description(in.getDescription())
                .city(in.getCity())
                .countryCode(in.getCountryCode())
                .build();
    }
}
