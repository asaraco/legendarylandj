package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel="playlists", path="playlists")
@CrossOrigin("http://localhost:4200")
public interface PlaylistRepository extends CrudRepository<Playlist, Long> {
	List<Playlist> findByName(@Param("name") String name);
	Playlist findTopByOrderByIdDesc();	// determine maximum playlist ID #
}
