import { Crate } from "./crate/crate.component";

/* App Configuration */
//export const API_URL = "http://localhost:8080";
export const API_URL = "http://192.168.0.181:8080";

/* UI Text */
export const UI_SEARCH_TEXT = "Filter by any search term...";
export const UI_CATS_TEXT   = "Filter by category...";
export const UI_REQUEST_TEXT = "Song added to queue.";
export const UI_UPLOAD_SUCCESS_TEXT = "Your file should appear in the New Arrivals section in a few moments.";
export const UI_UPLOAD_ERROR_TEXT = "Please try again. If the issue persists, try refreshing the browser. Otherwise, contact an admin.";
export const UI_WELCOME_TEXT     = "<strong>Welcome to Legendary Radio!</strong><br> " 
                                 + "Below you'll find an index of (nearly) all of the music that's been uploaded and played at these LAN parties for the past 15+ years. There's a good mix of old stuff, new stuff, popular music, indie music, outdated memes, movie sountracks, video game classics, and more.<br>"
                                 + "Scroll through the list at your leisure, or type any search term to filter (by artist, album, song title, etc.) You can also use the drop-down menu to view one of the curated music categories if you're trying to find something that fits a certain mood.<br>";
export const UI_HELPTEXT_REQUEST = "<strong>Requests</strong><br>"
                                 + "To request a song, click the '+' button next to the song title. (You will be unable to request an additional song until a certain amount of time elapses.) You should see your requested song appear at the top of the play queue  in the sidebar (or the hamburger menu on smaller screens) shortly. You can also view the play history just below that. "
                                 + "Please note that at any given time, there will always be at least 2 upcoming songs in the queue even if nobody has requested anything; the music software always has something pre-loaded in memory so that it can prepare the transition to the next song.<br>"
                                 + "The DJ reserves the right to move requests around if they think it will make for a cooler transition or better suit the mood of what's happening in the current tournament (or skip a particularly obnoxious song). But they will still make every effort to accommodate all requests as fairly as possible. (And they will hopefully be too busy pulling off some epic gaming wins to interfere much anyway.)";
export const UI_HELPTEXT_UPLOAD  = "<strong>Uploads</strong><br>"
                                 + "You can also upload your own music to add to our illustrious collection. Newly uploaded songs will appear in the 'New Arrivals' section on the sidebar (or the hamburger menu on smaller screens). You can request a song directly from there; afterward it will appear in the main list, for the rest of our natural lives. (Unless it's really annoying and we delete it.)<br>"
                                 + "Nearly all music file formats that use compression and metadata tags are supported (see the upload dialog for specifics). We have imposed a file size limit of 50MB. Anything bigger than that is either too uncompressed or too long!<br>"
                                 + "<strong>Please avoid uploading songs that contain explicit or otherwise upsetting content.</strong> We realize this can be subjective, but please make an effort to consider the sensibilities of everyone in the room. We strive to maintain a welcome and fun environment for everyone, including a variety of backgrounds and beliefs (and ages). We don't want a completely bland and inoffensive playlist and we won't crack down too hard here, but we will quietly delete any songs that do not align with this goal.";

/* Crates */
export class CrateMeta {
    constructor(
        public id: number,
        public name: string,
        public imageFileName: string,
        public desc: string
    ){}
}

export const CRATE_ALL              = new CrateMeta(0, "",           "", "(all songs)");   // Not really a crate, just useful for making the selectable options iterable
export const CRATE_INSTRUMENTALS    = new CrateMeta(2, "Instrumentals", "",   "Instrumental versions of songs, and other non-vocal music");
export const CRATE_ACAPELLAS        = new CrateMeta(3, "Acapellas",     "", "* HIDDEN * | Acapella versions of songs");
export const CRATE_MAIN             = new CrateMeta(4, "Main Rotation", "", "Songs that will play automatically.");
export const CRATE_OLD              = new CrateMeta(5, "Golden Oldies", "btn_goldenoldies.png", "Dad Rock and other music by, and/or for, old people. Sorry, boomer");
export const CRATE_SOUNDTRACKS      = new CrateMeta(6, "Soundtracks",   "btn_soundtracks.png", "Movie/TV soundtracks and high-quality game soundtracks.");
export const CRATE_CHILL            = new CrateMeta(7, "Chill",         "", "* HIDDEN * | For when the party dies down");
export const CRATE_MEMES            = new CrateMeta(8, "Comedic/Memey", "btn_comedy.png", "Songs that have gone viral or are otherwise known for comedic reasons. Request at your peril.");
export const CRATE_GAME_OSV         = new CrateMeta(9, "Video Game OSV","btn_vgosv.png", "Video game music the way it originally sounded. Get your bleeps and bloops on.");
export const CRATE_RESERVED         = new CrateMeta(10, "RESERVED",     "", "* HIDDEN * | You shouldn't be seeing this!");
export const CRATE_SAMPLES          = new CrateMeta(11, "SAMPLES",      "",   "* HIDDEN * | Samples, used for the soundboard or other fun things");
export const CRATE_PSYCHED          = new CrateMeta(12, "GET PSYCHED",  "btn_getpsyched.png", "When there's no time for a training montage, these will get you pumped for a legendary performance.");
export const CRATE_LAN_LIBRARY      = new CrateMeta(13, "The LAN Library","","Catch-all crate for uploaded songs.");
export const CRATE_GAME_OTHER       = new CrateMeta(14, "Video Game Covers/Remixes",    "btn_vgremix.png", "Video game music, reinterpreted.")
export const CRATE_EPIC             = new CrateMeta(15, "Epics",        "", "* HIDDEN * | Epic-length songs that should be requested sparingly");
export const CRATE_HITS             = new CrateMeta(17, "Greatest Hits","btn_greatesthits.png", "Songs that are objectively popular or have otherwise achieved Legendary status.");
export const CRATE_MASHUP           = new CrateMeta(18, "Mash-ups",     "btn_mashups.png", "Mash-ups of songs, some better than others.");

export const CRATES_HIDDEN = [  CRATE_SAMPLES.id,
                                CRATE_ACAPELLAS.id,
                                CRATE_RESERVED.id    ]

export const CRATES_SIMPLEVIEW = [  CRATE_MEMES.id,
                                    CRATE_MASHUP.id     ]

export const CRATES_ALBUMVIEW   = [ CRATE_SOUNDTRACKS.id,
                                    CRATE_GAME_OSV.id   ]

export const CRATES_SELECTABLE = [  CRATE_ALL,
                                    CRATE_HITS,
                                    CRATE_PSYCHED,
                                    CRATE_OLD,
                                    CRATE_SOUNDTRACKS,
                                    CRATE_GAME_OSV,
                                    CRATE_GAME_OTHER,
                                    CRATE_MASHUP,
                                    CRATE_MEMES         ]