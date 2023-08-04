package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(
		name = "playlistSimple",
		types = {Playlist.class }	)
public interface PlaylistSimple {
	int getId();
	
	String getName();
	
	List<PlaylistTrack> getPlaylistTracks();
	/*
	@Value("#{target.getPlaylistTracks().getTracks()}")
	List<Track> getTracks();
	*/
}
