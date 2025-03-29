
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Song } from './SongList';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Player = ({ currentSong, isPlaying, onTogglePlay, onPrev, onNext }: PlayerProps) => {
  return (
    <div className="win98-inset p-2 mt-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          <button 
            className="player-control" 
            onClick={onPrev}
          >
            <SkipBack size={16} />
          </button>
          <button 
            className="player-control" 
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button 
            className="player-control" 
            onClick={onNext}
          >
            <SkipForward size={16} />
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="win98-inset p-1 text-sm truncate">
            {currentSong ? `${currentSong.artist} - ${currentSong.title}` : 'No song selected'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Volume2 size={16} />
          <div className="w-20 h-4 win98-inset p-0.5">
            <div className="bg-primary h-full w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
