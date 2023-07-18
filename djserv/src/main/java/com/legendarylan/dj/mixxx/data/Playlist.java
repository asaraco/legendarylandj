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
import jakarta.persistence.Table;

@Entity
@Table(name = "Playlists")
public class Playlist {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private int position;
	
	private int hidden;
	
	private LocalDateTime date_created;
	
	private LocalDateTime date_modified;
	
	private int locked;
	
	/* Relationship mappings */
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "PlaylistTracks",
	  joinColumns = @JoinColumn(name = "playlist_id", referencedColumnName = "id"),
	  inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "id"))
	private List<Track> tracks;
	
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

	public LocalDateTime getDate_created() {
		return date_created;
	}

	public LocalDateTime getDate_modified() {
		return date_modified;
	}

	public int getLocked() {
		return locked;
	}
}
