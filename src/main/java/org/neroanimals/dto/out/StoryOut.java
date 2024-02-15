package org.neroanimals.dto.out;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class StoryOut {

    LocalDate date;
    String description;
    String city;
    String countryCode;
    Integer[] pictures;
}
