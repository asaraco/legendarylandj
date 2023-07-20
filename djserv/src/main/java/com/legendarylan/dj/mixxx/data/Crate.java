/**
 * 
 */
package com.legendarylan.dj.mixxx.data;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
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
	
	private int autodj_source;
	
	/* Relationship mappings */
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "crate_tracks",
	  joinColumns = @JoinColumn(name = "crate_id", referencedColumnName = "id"),
	  inverseJoinColumns = @JoinColumn(name = "track_id", referencedColumnName = "id"))
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

	public int getAutodj_source() {
		return autodj_source;
	}
	
	public void setAutodj_source(int i) {
		this.autodj_source = i;
	}
}