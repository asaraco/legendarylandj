package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// NOTE: This is the only table in the Mixxx database that uses CamelCase instead of snake_case,
// 		 as it is actually named "PlaylistTracks", but fortunately the @Table annotation is not case-sensitive,
//		 so I was able to just not capitalize the second "T" and it works.
//		 Another option is to set this application property: spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
//		 but that messes with some other Spring stuff that automatically assumes snake_case.
@Entity
@Table(name = "Playlisttracks")
public class PlaylistTrack {	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int playlistId;
	
	private int trackId;
	
	private int position;
	
	private String plDatetimeAdded;
	
	/**
	 * Required default no-arg constructor
	 */
	public PlaylistTrack() {
		
	}
	
	/**
	 * Custom constructor
	 * @param pid
	 * @param tid
	 * @param pos
	 */
	public PlaylistTrack(int pid, int tid, int pos) {
		this.playlistId = pid;
		this.trackId = tid;
		this.position = pos;
		this.plDatetimeAdded = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
	}
	
	/* Auto-generated Getters & Setters */

	public int getPlaylistId() {
		return playlistId;
	}

	public void setPlaylistd(int playlistId) {
		this.playlistId = playlistId;
	}

	public int getTrackId() {
		return trackId;
	}

	public void setTrackId(int trackId) {
		this.trackId = trackId;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getPlDatetimeAdded() {
		return plDatetimeAdded;
	}

	public void setPlDatetimeAdded(String plDatetimeAdded) {
		this.plDatetimeAdded = plDatetimeAdded;
	}

	public int getId() {
		return id;
	}
	
}
