package org.neroanimals.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String fileType;

    @Lob
    byte[] data;

    @ManyToMany(mappedBy = "pictures")
    List<Story> stories;
}
