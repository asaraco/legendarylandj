package com.legendarylan.dj.mixxx.data;

import java.util.List;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name = "crateSimple",
		types = {Crate.class}	)
public interface CrateSimple {
	int getId();
	
	String getName();
	
	List<Track> getTracks();
}
