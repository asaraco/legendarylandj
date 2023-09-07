package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	private int position;
	
	private String plDatetimeAdded;
	
	/* Relationship mappings */
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "playlistId")
	private Playlist playlist;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "trackId")
	private Track track;
	
	/**
	 * Required default no-arg constructor
	 */
	public PlaylistTrack() {
		
	}
	
	/**
	 * Custom constructor
	 * @param playlist
	 * @param track
	 * @param pos
	 */
	public PlaylistTrack(Playlist playlist, Track track, int pos) {
		this.playlist = playlist;
		this.track = track;
		this.position = pos;
		this.plDatetimeAdded = LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
	}
	
	/* Auto-generated Getters & Setters */
	/*
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
	*/
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
	
	@JsonIgnore
	public Track getTrack() {
		return track;
	}
	
	@JsonIgnore
	public Playlist getPlaylist() {
		return playlist;
	}
	
}
