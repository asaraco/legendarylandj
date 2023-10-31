package com.legendarylan.dj.mixxx.data;

import java.util.ArrayList;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "trackSimple",
			types = {Track.class}	)
public interface TrackSimple {
	int getId();
	String getArtist();
	String getTitle();
	String getAlbum();
	String getYear();
	String getGenre();
	float getDuration();
	String getAlbumArtist();
	String getSortArtist();
	ArrayList<Integer> getCrateIds();
}
