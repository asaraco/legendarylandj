package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="library", path="library")
public interface LibraryTrackRepository extends PagingAndSortingRepository<LibraryTrack, Long> {
	List<LibraryTrack> findByArtist(@Param("artist") String artist);
}
