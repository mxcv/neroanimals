package org.neroanimals.dto.in;

import lombok.Data;

import java.time.LocalDate;

@Data
public class StoryIn {

    LocalDate date;
    String description;
    String city;
    String countryCode;
}
