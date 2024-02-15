package org.neroanimals.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    PetType type;
    String title;
    String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "begin_story_id", referencedColumnName = "id")
    Story beginStory;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "end_story_id", referencedColumnName = "id")
    Story endStory;
}
