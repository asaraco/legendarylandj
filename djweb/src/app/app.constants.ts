/* App Configuration */
export const API_URL = "http://localhost:8080";
//export const API_URL = "http://192.168.0.182:8080";

/* UI Text */
export const UI_SEARCH_TEXT = "Filter by any search term...";

/* Crates */
export class CrateMeta {
    constructor(
        public id: number,
        public name: string,
        public desc: string
    ){}    
}

export const CRATE_INSTRUMENTALS    = new CrateMeta(2, "Instrumentals", "Instrumental versions of songs, and other non-vocal music");
export const CRATE_ACAPELLAS        = new CrateMeta(3, "Acapellas",     "* HIDDEN * | Acapella versions of songs");
export const CRATE_MAIN             = new CrateMeta(4, "Main Rotation", "Songs that will play automatically.");
export const CRATE_OLD              = new CrateMeta(5, "Golden Oldies", "Dad Rock and other music by, and/or for, old people. Sorry, boomer");
export const CRATE_SOUNDTRACKS      = new CrateMeta(6, "Soundtracks",   "Movie/TV soundtracks and high-quality game soundtracks.");
export const CRATE_CHILL            = new CrateMeta(7, "Chill",         "* HIDDEN * | For when the party dies down");
export const CRATE_MEMES            = new CrateMeta(8, "Comedic/Memey", "Songs that have gone viral or are otherwise known for comedic reasons. Request at your peril.");
export const CRATE_GAME_OSV         = new CrateMeta(9, "Video Game OSV","Video game music that *sounds* like video game music. Get your bleeps and bloops on.");
export const CRATE_RESERVED         = new CrateMeta(10, "RESERVED",     "* HIDDEN * | You shouldn't be seeing this!");
export const CRATE_SAMPLES          = new CrateMeta(11, "SAMPLES",      "* HIDDEN * | Samples, used for the soundboard or other fun things");
export const CRATE_PSYCHED          = new CrateMeta(12, "GET PSYCHED",  "When there's no time for a training montage, these will prepare you for a legendary performance.");
export const CRATE_GAME_OTHER       = new CrateMeta(14, "Video Game Covers/Remixes", "Video game music, reinterpreted.")
export const CRATE_EPIC             = new CrateMeta(15, "Epics",        "* HIDDEN * | Epic-length songs that should be requested sparingly");
export const CRATE_HITS             = new CrateMeta(17, "Greatest Hits","Songs that are objectively popular or have otherwise achieved Legendary status.");
export const CRATE_MASHUP           = new CrateMeta(18, "Mash-ups",     "Mash-ups of songs, some better than others.");

export const CRATES_HIDDEN = [  CRATE_SAMPLES.id,
                                CRATE_ACAPELLAS.id,
                                CRATE_RESERVED.id    ]

export const CRATES_SIMPLEVIEW = [  CRATE_MEMES.id,
                                    CRATE_MASHUP.id     ]

export const CRATES_SELECTABLE = [  CRATE_HITS,
                                    CRATE_PSYCHED,
                                    CRATE_OLD,
                                    CRATE_SOUNDTRACKS,
                                    CRATE_GAME_OSV,
                                    CRATE_GAME_OTHER,
                                    CRATE_MASHUP,
                                    CRATE_MEMES         ]