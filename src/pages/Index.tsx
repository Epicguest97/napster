
import React, { useState, useEffect } from 'react';
import RetroWindow from '../components/RetroWindow';
import SearchBar from '../components/SearchBar';
import SongList, { Song } from '../components/SongList';
import Player from '../components/Player';
import StatusBar from '../components/StatusBar';
import { mockSongs } from '../data/mockSongs';

// Enhanced mock songs with connection and ping data
const enhancedMockSongs = mockSongs.map(song => ({
  ...song,
  connection: ['Cable', 'DSL', '56K', 'Unknown'][Math.floor(Math.random() * 4)],
  ping: Math.floor(Math.random() * 200 + 20).toString()
}));

const Index = () => {
  const [songs, setSongs] = useState<Song[]>(enhancedMockSongs);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>(enhancedMockSongs);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(4892);
  const [filesAvailable, setFilesAvailable] = useState(438721);

  const handleSearch = (query: {artist: string, title: string, maxResults: number}) => {
    if (!query.artist.trim() && !query.title.trim()) {
      setFilteredSongs(songs);
      return;
    }
    
    const filtered = songs.filter(song => 
      (!query.artist.trim() || song.artist.toLowerCase().includes(query.artist.toLowerCase())) && 
      (!query.title.trim() || song.title.toLowerCase().includes(query.title.toLowerCase()))
    );
    
    // Apply max results
    setFilteredSongs(filtered.slice(0, query.maxResults));
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrev = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  // Simulate changing user counts for realism
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectedUsers(prev => prev + Math.floor(Math.random() * 10) - 5);
      setFilesAvailable(prev => prev + Math.floor(Math.random() * 100) - 50);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen h-screen bg-[#c0c0c0] flex flex-col p-0 overflow-hidden">
      <div className="win98-titlebar w-full">
        <div className="flex items-center gap-1">
          <img src="/napster-icon.png" alt="Napster" className="w-4 h-4 mr-1" />
          Napster v2.0 Beta 8
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-1">
        <div className="h-full win98-window">
          <div className="win98-window-inner h-full">
            <div className="p-1 h-full flex flex-col">
              <SearchBar onSearch={handleSearch} />
              <SongList 
                songs={filteredSongs} 
                onSongSelect={handleSongSelect} 
                className="flex-1"
              />
              <Player 
                currentSong={currentSong}
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onPrev={handlePrev}
                onNext={handleNext}
              />
              <StatusBar connectedUsers={connectedUsers} filesAvailable={filesAvailable} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
