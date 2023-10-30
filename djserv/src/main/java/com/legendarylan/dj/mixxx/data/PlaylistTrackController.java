package com.legendarylan.dj.mixxx.data;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.legendarylan.dj.Const;

@BasePathAwareController
@CrossOrigin({"http://${app.legendarydj.localhost-ip}:8080", "http://${app.legendarydj.localhost-ip}:4200", "http://localhost:4200"})
class PlaylistTrackController {
	@Autowired
	TrackRepository library;
	
	@Autowired
	PlaylistRepository playlists;
	
	@Autowired
	PlaylistTrackRepository playlistTracks;
	
	@Autowired
	CrateRepository crates;
	
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
	
	/**
	 * Request a song, and also add it to the specified crate.
	 * This is intended to be used with "new arrivals" (uploaded songs)
	 * which are not yet associated with a crate.
	 * This cannot be done immediately upon upload because we need to be sure
	 * Mixxx has actually added the song to its database as well, which takes
	 * an indefinite amount of time. 
	 * @param songid
	 * @param crateid
	 * @return
	 */
	@RequestMapping(path = "requestSongCrate", method = RequestMethod.POST)
	@ResponseBody
	@CacheEvict(value="library", allEntries=true)
	ResponseEntity<?> requestSongCrate(@Param("songid") String songid, @Param("crateid") String crateid) {
		int latest = playlistTracks.findFirstByPlaylistIdOrderByPositionDesc(Const.PLAYLIST_AUTO_DJ).getPosition();	// Determine highest track # in queue
		int position = latest + 1;
		
		Track t = library.findById(Integer.parseInt(songid));
		
		// Associate track with specified crate if it isn't already 
		Integer crateInt = Integer.parseInt(crateid);
		ArrayList<Integer> trackCrates = t.getCrateIds();
		if (!trackCrates.contains(crateInt)) {
			Crate c = crates.findById(crateInt);
			c.getTracks().add(t);
			crates.save(c);
		}
		
		Playlist autodj = playlists.findById(Const.PLAYLIST_AUTO_DJ);		
		playlistTracks.save(new PlaylistTrack(autodj, t, position));
		
		return ResponseEntity.ok("Success: track " + songid + " added to playlist " + Const.PLAYLIST_AUTO_DJ + " at position " + position);
	}

}
