import { SortOptions, PlaylistTypes } from '@enums/Playlist';
import { Source } from '@enums/MediaFetch';
import { MUSICFREE } from '@utils/mediafetch/musicfree';
import { LrcSource } from '@enums/LyricFetch';

declare global {
  namespace NoxMedia {
    export interface Song {
      id: string;
      bvid: string;
      name: string;
      nameRaw: string;
      singer: string;
      singerId: string | number;
      cover: string;
      lyric?: string;
      lyricOffset?: number;
      parsedName: string;
      biliShazamedName?: string;
      page?: number;
      duration: number;
      album?: string;
      addedDate?: number;
      source?: Source | MUSICFREE;
      isLive?: boolean;
      liveStatus?: boolean;
      metadataOnLoad?: boolean;
      order?: number;
    }

    export interface Playlist {
      title: string;
      id: string;
      type: PlaylistTypes;

      songList: Array<Song>;

      subscribeUrl: Array<string>;
      blacklistedUrl: Array<string>;
      lastSubscribed: number;

      useBiliShazam: boolean;
      biliSync: boolean;
      newSongOverwrite?: boolean;

      sort?: SortOptions;
      // function to support infinite loading; only applicable to
      // search playlists. bc we stringify playlists, this will be
      // lost upon loading from storage
      refresh?: (v: Playlist) => Promise<SearchPlaylist>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      refreshToken?: any;
    }

    export interface SearchPlaylist extends Partial<Playlist> {
      songList: Array<Song>;
    }

    export interface LyricDetail {
      songId: string;
      lyricKey: string;
      lyricOffset: number;
      lyric: string;
      source?: LrcSource;
    }
  }
}
