package org.neroanimals.dto.in;

import org.neroanimals.models.PetType;
import lombok.Data;

@Data
public class PetIn {

    PetType type;
    String title;
    String phoneNumber;
    StoryIn beginStory;
    StoryIn endStory;
}
