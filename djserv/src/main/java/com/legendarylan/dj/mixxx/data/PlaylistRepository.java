package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.legendarylan.dj.Const;

@RepositoryRestResource(collectionResourceRel="playlists", path="playlists")
@CrossOrigin({"http://localhost:4200", "http://"+Const.LOCALHOST_IP+":4200"})
public interface PlaylistRepository extends CrudRepository<Playlist, Integer> {
	Playlist findById(@Param("id") int id);
	List<Playlist> findByName(@Param("name") String name);
	Playlist findTopByOrderByIdDesc();	// determine maximum playlist ID #
}
