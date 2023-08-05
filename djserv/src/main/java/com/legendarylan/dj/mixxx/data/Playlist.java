package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

@Entity
@Table(name = "Playlists")
public class Playlist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
	private String name;
	
	private int position;
	
	private int hidden;
	
	private LocalDateTime dateCreated;
	
	private LocalDateTime dateModified;
	
	private int locked;
	
	/* Relationship mappings */
	
	/*
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "PlaylistTracks",
	  joinColumns = @JoinColumn(name = "playlistId", referencedColumnName = "id"),
	  inverseJoinColumns = @JoinColumn(name = "trackId", referencedColumnName = "id"))
	private List<Track> tracks;
	*/
	
	@OneToMany(mappedBy = "playlist")
	@OrderBy("position ASC")
	private List<PlaylistTrack> playlistTracks;
	
	/* Auto-generated Getters	 
	 * (Setters omitted because this will be read-only)	*/

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getPosition() {
		return position;
	}

	public int getHidden() {
		return hidden;
	}

	public LocalDateTime getDateCreated() {
		return dateCreated;
	}

	public LocalDateTime getDateModified() {
		return dateModified;
	}

	public int getLocked() {
		return locked;
	}

	/*
	public List<Track> getTracks() {
		return tracks;
	}
	*/
	/*
	public List<PlaylistTrack> getPlaylistTracks() {
		return tracks;
	}
	*/
}
