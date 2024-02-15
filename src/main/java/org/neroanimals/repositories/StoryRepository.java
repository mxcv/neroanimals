package org.neroanimals.repositories;

import org.neroanimals.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Integer> {
}
