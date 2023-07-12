package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="playlists", path="playlists")
public interface PlaylistRepository extends PagingAndSortingRepository<Playlist, Long> {
	List<Playlist> findByName(@Param("name") String name);
}
