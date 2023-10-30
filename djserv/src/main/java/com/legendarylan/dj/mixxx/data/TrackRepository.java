package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.annotation.PostConstruct;

@RepositoryRestResource(collectionResourceRel="tracks", path="tracks", excerptProjection = TrackSimple.class)
@CrossOrigin({"http://${app.legendarydj.localhost-ip}:8080", "http://${app.legendarydj.localhost-ip}:4200", "http://localhost:4200"})
public interface TrackRepository extends CrudRepository<Track, Integer> {
	Track findById(@Param("id") int id);
	List<Track> findByArtist(@Param("artist") String artist);
	List<Track> findByArtistStartingWith(@Param("ch") String character);
	List<Track> findAllByOrderByArtistAsc();
	List<Track> findAllByCratesIdNotIn(@Param("crateids") int[] crateids);
	List<Track> findByCratesIdNotInOrderByArtistAscAlbumAsc(@Param("crateids") int[] crateids);
	@PostConstruct
	@Cacheable("library")
	List<Track> findByCratesIdNotInOrderBySortArtistAscAlbumAsc(@Param("crateids") int[] crateids);
	//List<Track> findByCratesIdNotInOrderByAlbumArtistAscArtistAscAlbumAsc(@Param("crateids") int[] crateids);
	List<Track> findAllByCratesIsNull();
	
}
