package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="tracks", path="tracks")
public interface TrackRepository extends CrudRepository<Track, Long> {
	Track findById(@Param("id") int id);
	List<Track> findByArtist(@Param("artist") String artist);
}
