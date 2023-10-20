/**
 * 
 */
package com.legendarylan.dj.mixxx.data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

/**
 * @author lemmh
 *
 */
@Entity
@Table(name = "crates")
public class Crate {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
	private String name;
	
	private int count;
	
	private int show;
	
	private int locked;
	
	private int autodjSource;
	
	/* Relationship mappings */
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "crateTracks",
	  joinColumns = @JoinColumn(name = "crateId", referencedColumnName = "id"),
	  inverseJoinColumns = @JoinColumn(name = "trackId", referencedColumnName = "id"))
	//@JsonIgnoreProperties("crates")
	private List<Track> tracks;
	
	/* Auto-generated Getters & Setters
	 * (some Setters omitted to be read-only)	*/

	public int getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getCount() {
		return count;
	}

	public int getShow() {
		return show;
	}

	public int getLocked() {
		return locked;
	}

	public int getAutodjSource() {
		return autodjSource;
	}
	
	public void setAutodjSource(int i) {
		this.autodjSource = i;
	}
	
	@JsonIgnore
	public List<Track> getTracks() {
		return this.tracks;
	}
}