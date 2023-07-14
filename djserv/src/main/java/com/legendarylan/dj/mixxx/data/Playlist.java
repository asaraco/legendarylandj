package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
