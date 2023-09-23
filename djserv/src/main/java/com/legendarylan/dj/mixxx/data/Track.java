package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 * 
 * NOTE: I didn't follow the exact Mixxx naming scheme here
 * because each instance of this represents one record,
 * which would not be a library, but a track in the library.
 * Other table names make sense as-is.
 * @author lemmh
 *
 */
@Entity
@Table(name = "library")
@JsonIgnoreProperties(ignoreUnknown = true, value = {"playlistTracks"})
public class Track {
	
	/* Omitted:
	 * bitrate				(integer)
	 * samplerate			(integer)
	 * cuepoint				(integer)
	 * wavesummaryhex		(blob)
	 * channels				(integer)
	 * cuepoint				(integer)
	 * mixxx_deleted		(integer)
	 * header_parsed		(integer)
	 * filetype				(varchar)
	 * replaygain			(float)
	 * key					(String)
	 * beats				(blob)
	 * beats_version		(TEXT)
	 * bpm_lock				(integer)
	 * beats_sub_version	(TEXT)
	 * keys					(BLOB)
	 * keys_version			(TEXT)
	 * keys_sub_version		(TEXT)
	 * key_id				(integer)
	 * grouping				(TEXT)
	 * coverart_source		(integer)
	 * coverart_type		(integer)
	 * coverart_location	(TEXT)
	 * coverart_hash		(integer)
	 * replaygain_peak		(REAL)
	 * tracktotal			(TEXT)
	 * color				(integer)
	 * coverart_color		(integer)
	 * coverart_digest		(BLOB)
	 * source_synchronized_ms	(integer)
	 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	
	private String artist;
	
	private String title;
	
	private String album;
	
	private String year;
	
	private String genre;
	
	private String tracknumber;
	
	private int location;
	
	private String comment;
	
	private String url;
	
	private float duration;
	
	private float bpm;
	
	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.nnn'Z'")
	//private OffsetDateTime datetimeAdded;
	/**
	 * AMS 7/14/2023 - It seems SQLite has some issues with date formats. I'm leaving this as a String for now.
	 * If there's a need to handle it as an actual OffsetDateTime, just do some conversion, I suppose.
	 */
	private String datetimeAdded;
	
	private int played;
	
	private int timesplayed;
	
	private int rating;
	
	private String composer;
	
	private String albumArtist;
	
	private LocalDateTime lastPlayedAt;
	
	/* Relationship mappings */
	
	@JsonIgnoreProperties("track")
	@OneToMany(	mappedBy = "track",
				fetch = FetchType.LAZY)
	private List<PlaylistTrack> playlistTracks;
	
	@JsonIgnoreProperties("tracks")
	@ManyToMany(mappedBy = "tracks",
				fetch = FetchType.LAZY)
	private List<Crate> crates;
	
	/* Values generated at runtime (not in database) */
	
	@Formula("CASE "
			+ "	WHEN album_artist NOT NULL AND album_artist LIKE 'The %' THEN LOWER(SUBSTR(album_artist, 5))"
			+ "	WHEN album_artist NOT NULL THEN LOWER(album_artist)"
			+ "	WHEN artist LIKE 'The %' THEN LOWER(SUBSTR(artist, 5))"
			+ " WHEN artist NOT NULL THEN LOWER(artist)"
			+ " WHEN artist IS NULL OR artist='' THEN '(no artist)'"
			+ "	ELSE artist"
			+ "	END ")
	private String sortArtist;
	
	public void setSortArtist(String sortArtist) {
		this.sortArtist = sortArtist;
	}
	
	public String getSortArtist() {
		return this.sortArtist;
	}
	
	public String generateSortArtist() {
		String tempArtist = "";
		if (this.albumArtist!=null && !this.albumArtist.isBlank()) {
			tempArtist = this.albumArtist.toUpperCase();
		} else if (this.artist!=null) {
			tempArtist = this.artist.toUpperCase();
		}
		if (tempArtist.startsWith("THE ")) tempArtist = tempArtist.substring(3).trim();
		if (tempArtist.startsWith("A ")) tempArtist = tempArtist.substring(1).trim();
		return tempArtist;
	}
	
	/**
	 * Utility method to get all IDs of crates associated with this entity
	 * @return
	 */
	public ArrayList<Integer> getCrateIds() {
		ArrayList<Integer> ids = new ArrayList<Integer>();
		for (Crate c : crates) {
			ids.add((Integer)(c.getId()));
		}		
		return ids;
	}
	
	/* Auto-generated Getters & Setters
	 * (some Setters removed for read-only)	*/

	public int getId() {
		return id;
	}

	//public void setId(int id) {		this.id = id;	}

	public String getArtist() {
		return artist;
	}

	public void setArtist(String artist) {
		this.artist = artist;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAlbum() {
		return album;
	}

	public void setAlbum(String album) {
		this.album = album;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	@JsonIgnore
	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public String getTracknumber() {
		return tracknumber;
	}

	public void setTracknumber(String tracknumber) {
		this.tracknumber = tracknumber;
	}

	public int getLocation() {
		return location;
	}

	//public void setLocation(int location) {		this.location = location;	}

	@JsonIgnore
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	//NOTE: Not actually sure what this does. Might be legacy.
	@JsonIgnore
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public float getDuration() {
		return duration;
	}

	//public void setDuration(float duration) {		this.duration = duration;	}

	public float getBpm() {
		return bpm;
	}

	//public void setBpm(float bpm) {		this.bpm = bpm;	}

	//@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.nnn'Z'")
	/*
	public OffsetDateTime getDatetime_added() {
		return datetimeAdded;
	}
	*/
	
	public String getDateTimeAdded() {
		return datetimeAdded;
	}

	//public void setDatetime_added(OffsetDateTime datetimeAdded) {		this.datetime_added = datetimeAdded;	}

	public int getPlayed() {
		return played;
	}

	public void setPlayed(int played) {
		this.played = played;
	}

	public int getTimesplayed() {
		return timesplayed;
	}

	public void setTimesplayed(int timesplayed) {
		this.timesplayed = timesplayed;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComposer() {
		return composer;
	}

	public void setComposer(String composer) {
		this.composer = composer;
	}

	public String getAlbumArtist() {
		return albumArtist;
	}

	public void setAlbumArtist(String album_artist) {
		this.albumArtist = album_artist;
	}

	public LocalDateTime getLastPlayedAt() {
		return lastPlayedAt;
	}

	public void setLastPlayedAt(LocalDateTime last_played_at) {
		this.lastPlayedAt = last_played_at;
	}

}
