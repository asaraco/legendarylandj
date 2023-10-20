package com.legendarylan.dj;

import java.util.Arrays;
import java.util.List;

/**
 * Defines constants used throughout the application.
 * @author lemmh
 *
 */
public class Const {

	public static final int PLAYLIST_AUTO_DJ = 1;
	
	public static final String LOCALHOST_IP = "192.168.0.182";
	
	public static final String FILES_PATH = "D:\\\\Media\\\\Music (other)\\\\LANtrax\\\\";
	//public static final String FILES_PATH = "\\\\legendarydj\\\\LANtrax\\\\";
	
	public static final List<String> FILE_TYPES_VALID = Arrays.asList("audio/mpeg",
																	  "audio/x-m4a",
																	  "audio/x-aiff"		);

}
