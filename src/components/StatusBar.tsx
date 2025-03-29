
import React from 'react';

interface StatusBarProps {
  connectedUsers: number;
  filesAvailable: number;
}

const StatusBar = ({ connectedUsers, filesAvailable }: StatusBarProps) => {
  return (
    <div className="win98-inset p-2 mt-4 text-xs">
      <div className="flex justify-between">
        <div>Connected to Napster: <span className="text-primary font-bold">Online</span></div>
        <div>Users: <span className="font-bold">{connectedUsers}</span></div>
        <div>Files: <span className="font-bold">{filesAvailable}</span></div>
        <div>Transfer: <span className="font-bold">0 KB/s up, 0 KB/s down</span></div>
      </div>
    </div>
  );
};

export default StatusBar;
