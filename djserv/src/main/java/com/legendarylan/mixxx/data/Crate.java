/**
 * 
 */
package com.legendarylan.mixxx.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/**
 * @author lemmh
 *
 */
/*
@Entity
public record Crate(int id, String name, int count, int show, int locked, int autodj_source) {

}
*/

@Entity
public class Crate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private int count;
	
	private int show;
	
	private int locked;
	
	private int autodj_source;
	
	/**
	 * Auto-generated Getters & Setters
	 * @return
	 */

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public int getShow() {
		return show;
	}

	public void setShow(int show) {
		this.show = show;
	}

	public int getLocked() {
		return locked;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public int getAutodj_source() {
		return autodj_source;
	}

	public void setAutodj_source(int autodj_source) {
		this.autodj_source = autodj_source;
	}
}