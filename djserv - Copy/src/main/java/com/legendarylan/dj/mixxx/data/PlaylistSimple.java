package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name = "playlistSimple",
		types = {Playlist.class }	)
public interface PlaylistSimple {
	int getId();
	
	String getName();
	
	List<Track> getTracks();
}
