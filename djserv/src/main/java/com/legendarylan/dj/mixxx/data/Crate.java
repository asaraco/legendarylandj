/**
 * 
 */
package com.legendarylan.dj.mixxx.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * @author lemmh
 *
 */
@Entity
@Table(name = "crates")
public class Crate {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private int count;
	
	private int show;
	
	private int locked;
	
	private int autodj_source;
	
	/* Auto-generated Getters	 
	 * (Setters omitted because this will be read-only)	*/

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
}