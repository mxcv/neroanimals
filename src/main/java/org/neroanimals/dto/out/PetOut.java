package org.neroanimals.dto.out;

import org.neroanimals.models.PetType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PetOut {

    Integer id;
    PetType type;
    String title;
    String phoneNumber;
    StoryOut beginStory;
    StoryOut endStory;
}
