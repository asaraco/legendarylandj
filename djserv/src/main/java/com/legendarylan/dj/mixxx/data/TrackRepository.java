package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel="tracks", path="tracks", excerptProjection = TrackSimple.class)
@CrossOrigin("http://localhost:4200")
public interface TrackRepository extends CrudRepository<Track, Long> {
	Track findById(@Param("id") int id);
	List<Track> findByArtist(@Param("artist") String artist);
	List<Track> findByArtistStartingWith(@Param("ch") String character);
	List<Track> findAllByOrderByArtistAsc();
}
