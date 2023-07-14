package com.legendarylan.dj.mixxx.data;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class LibraryTrack {
	
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
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	//private OffsetDateTime datetime_added;
	/**
	 * AMS 7/14/2023 - It seems SQLite has some issues with date formats. I'm leaving this as a String for now.
	 * If there's a need to handle it as an actual OffsetDateTime, just do some conversion, I suppose.
	 */
	private String datetime_added;
	
	private int played;
	
	private int timesplayed;
	
	private int rating;
	
	private String composer;
	
	private String album_artist;
	
	private LocalDateTime last_played_at;
	
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

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	//NOTE: Not actually sure what this does. Might be legacy.
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
		return datetime_added;
	}
	*/
	
	public String getDateTime_added() {
		return datetime_added;
	}

	//public void setDatetime_added(OffsetDateTime datetime_added) {		this.datetime_added = datetime_added;	}

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

	public String getAlbum_artist() {
		return album_artist;
	}

	public void setAlbum_artist(String album_artist) {
		this.album_artist = album_artist;
	}

	public LocalDateTime getLast_played_at() {
		return last_played_at;
	}

	public void setLast_played_at(LocalDateTime last_played_at) {
		this.last_played_at = last_played_at;
	}

}
