package com.legendarylan.dj.mixxx.data;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name = "playlistTrackSimple",
		types = {PlaylistTrack.class} )
public interface PlaylistTrackSimple {
	int getPosition();
	
	Track getTrack();
	
	//@Value("#{target.getPlaylist().getName()}")
	//String getName();
}
