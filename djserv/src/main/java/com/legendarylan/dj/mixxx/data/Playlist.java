package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
	// AMS 8/5/2023 - I pretty much always want playlists in descending order,
	//				  i.e. start with most recent song played, scroll down if you want to see more.
	//				  Reversing playlists on the fly in Angular is possible, but can be expensive & unreliable.
	@JsonIgnore
	@OneToMany(	mappedBy = "playlist",
				fetch = FetchType.LAZY)
	@OrderBy("position DESC")
	//@JsonIgnoreProperties("track")
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
	@JsonIgnore
	public List<PlaylistTrack> getPlaylistTracks() {
		return playlistTracks;
	}
	
}
