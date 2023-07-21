package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PlaylistTracks")
public class PlaylistTrack {	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private int playlist_id;
	
	private int track_id;
	
	private int position;
	
	private LocalDateTime pl_datetime_added;
	
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
		this.playlist_id = pid;
		this.track_id = tid;
		this.position = pos;
		this.pl_datetime_added = LocalDateTime.now();
	}
	
	/* Auto-generated Getters & Setters */

	public int getPlaylist_id() {
		return playlist_id;
	}

	public void setPlaylist_id(int playlist_id) {
		this.playlist_id = playlist_id;
	}

	public int getTrack_id() {
		return track_id;
	}

	public void setTrack_id(int track_id) {
		this.track_id = track_id;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public LocalDateTime getPl_datetime_added() {
		return pl_datetime_added;
	}

	public void setPl_datetime_added(LocalDateTime pl_datetime_added) {
		this.pl_datetime_added = pl_datetime_added;
	}

	public int getId() {
		return id;
	}
	
}
