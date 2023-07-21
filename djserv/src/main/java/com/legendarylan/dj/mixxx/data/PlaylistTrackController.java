package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@BasePathAwareController
class PlaylistTrackController {
	
	private final PlaylistTrackRepository repo;
	private final TrackRepository library;
	private final int autoDjPlaylistId = 1;

	PlaylistTrackController(PlaylistTrackRepository repo, TrackRepository library) {
		this.repo = repo;
		this.library = library;
	}
	
	@RequestMapping(path = "requestSong", method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<?> requestSong(@Param("id") String id) {
		int latest = 3;	//TODO: Calculate max position in playlist
		//Optional<Track> song = library.findById(Long.parseLong(sId));
		repo.save(new PlaylistTrack(autoDjPlaylistId, latest, Integer.parseInt(id)));
		return ResponseEntity.ok("Success");
	}

}
