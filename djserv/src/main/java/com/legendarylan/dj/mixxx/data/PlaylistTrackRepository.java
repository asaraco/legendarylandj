package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(excerptProjection = PlaylistTrackSimple.class, collectionResourceRel="playlistTracks", path="playlistTracks")
@CrossOrigin({"http://${app.legendarydj.localhost-ip}:8080", "http://${app.legendarydj.localhost-ip}:4200", "http://localhost:4200"})
public interface PlaylistTrackRepository extends CrudRepository<PlaylistTrack, Integer> {
	PlaylistTrack findFirstByPlaylistIdOrderByPositionDesc(int playlistId);	// determines highest "position" value in specified playlist
	List<PlaylistTrack> findByPlaylistId(int playlistId);
	List<PlaylistTrack> findAllByPlaylistIdOrderByPositionAsc(int playlistId);
}
