package com.legendarylan.dj.mixxx.data;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel="playlistTracks", path="playlistTracks")
public interface PlaylistTrackRepository extends PagingAndSortingRepository<PlaylistTrack, Long> {
}
