package com.legendarylan.dj.mixxx.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel="playlistTracks", path="playlistTracks")
@CrossOrigin("http://localhost:4200")
public interface PlaylistTrackRepository extends CrudRepository<PlaylistTrack, Long> {
	PlaylistTrack findFirstByPlaylistIdOrderByPositionDesc(int playlistId);	// determines highest "position" value in specified playlist
}
