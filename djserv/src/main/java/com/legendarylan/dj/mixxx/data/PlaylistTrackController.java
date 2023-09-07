package com.legendarylan.dj.mixxx.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.legendarylan.dj.Const;

@BasePathAwareController
@CrossOrigin({"http://localhost:4200", "http://"+Const.LOCALHOST_IP+":4200"})
class PlaylistTrackController {
	@Autowired
	TrackRepository library;
	
	@Autowired
	PlaylistRepository playlists;
	
	@Autowired
	PlaylistTrackRepository playlistTracks;
	
	@RequestMapping(path = "requestSong", method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<?> requestSong(@Param("id") String id) {
		int latest = playlistTracks.findFirstByPlaylistIdOrderByPositionDesc(Const.PLAYLIST_AUTO_DJ).getPosition();	// Determine highest track # in queue
		int position = latest + 1;
		
		Track t = library.findById(Integer.parseInt(id));
		
		Playlist autodj = playlists.findById(Const.PLAYLIST_AUTO_DJ);
		
		playlistTracks.save(new PlaylistTrack(autodj, t, position));
		return ResponseEntity.ok("Success: track " + id + " added to playlist " + Const.PLAYLIST_AUTO_DJ + " at position " + position);
	}

}
