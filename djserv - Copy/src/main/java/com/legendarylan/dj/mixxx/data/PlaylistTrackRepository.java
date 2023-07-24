package com.legendarylan.dj.mixxx.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="playlistTracks", path="playlistTracks")
public interface PlaylistTrackRepository extends CrudRepository<PlaylistTrack, Long> {
	PlaylistTrack findFirstByPlaylistIdOrderByPositionDesc(int playlistId);	// determines highest "position" value in specified playlist
}
