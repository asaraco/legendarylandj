package com.legendarylan.dj.mixxx.data;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.legendarylan.dj.Const;

@BasePathAwareController
class PlaylistTrackController {
	
	private final PlaylistTrackRepository repo;

	PlaylistTrackController(PlaylistTrackRepository repo) {
		this.repo = repo;
	}
	
	@RequestMapping(path = "requestSong", method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<?> requestSong(@Param("id") String id) {
		int latest = repo.findFirstByPlaylistIdOrderByPositionDesc(Const.PLAYLIST_AUTO_DJ).getPosition();	// Determine highest track # in queue
		//System.out.println("Latest position: " + latest);
		int position = latest + 1;																// Add 1 to get new track #
		repo.save(new PlaylistTrack(Const.PLAYLIST_AUTO_DJ, Integer.parseInt(id), position));
		return ResponseEntity.ok("Success: track " + id + " added to playlist " + Const.PLAYLIST_AUTO_DJ + " at position " + position);
	}

}
