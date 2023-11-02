import { Crate } from "./crate/crate.component";

/* App Configuration */
//export const API_URL = "http://localhost:8080";
export const API_URL = "http://192.168.0.181:8081";

/* UI Text */
export const UI_SEARCH_TEXT = "Filter by any search term...";
export const UI_CATS_TEXT   = "Filter by category...";
export const UI_REQUEST_TEXT = "Song added to queue.";
export const UI_UPLOAD_SUCCESS_TEXT = "Your file should appear in the New Arrivals section in a few moments.";
export const UI_UPLOAD_ERROR_TEXT = "Please try again. If the issue persists, try refreshing the browser. Otherwise, contact an admin.";
export const UI_BTN_TOOLTIP_DISABLED = "Please wait before requesting another song."
export const UI_WELCOME_TEXT     = "<strong>Welcome to Legendary Radio!</strong><br> " 
                                 + "Below you'll find an index of (nearly) every song ever uploaded & played at LAN. Old stuff, new stuff, pop, indie, outdated memes, movie sountracks, video game classics, and more. "
                                 + "Type any search term to filter by artist, album, song title, etc. Use the drop-down menu to filter by a curated music category. Or just scroll and see what you find.<br>";
export const UI_HELPTEXT_REQUEST = "<strong>Requests</strong><br>"
                                 + "To request, click the '+' button next to a song title. (You'll briefly be unable to request additional songs.) Your request should appear at the top of the play queue shortly. "
                                 + "Please note that at any given time, there will always be at least 2 upcoming songs in the queue even if nobody has requested anything; the music software always has something pre-loaded so it can prepare a transition to the next song.<br>"
                                 + "The DJ reserves the right to move requests around for the sake of cool transitions or matching the vibe of the current game. But they will still make every effort to accommodate all requests as fairly as possible.<br>";
export const UI_HELPTEXT_UPLOAD  = "<strong>Uploads</strong><br>"
                                 + "You can also upload your own music files. Newly uploaded songs will appear in the 'New Arrivals' section. You can also request directly from there; afterward it will appear in the main list, for the rest of our natural lives. (Unless it's really annoying and we delete it.) "
                                 + "Nearly all file formats that use compression and metadata tags are supported (see upload dialog for specifics). We've imposed a file size limit of 50MB. Anything bigger is either too uncompressed or too long!<br>"
                                 + "<strong>Please avoid uploading songs that contain explicit or otherwise upsetting content.</strong> We realize this can be subjective, but please make an effort to consider the sensibilities of everyone in the room. We strive to maintain a welcome and fun environment for everyone, including a variety of backgrounds and beliefs (and ages). We will quietly delete any songs that don't align with this goal.";

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