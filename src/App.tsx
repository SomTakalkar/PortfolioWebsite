import { useState } from 'react';
import Terminal from './components/Terminal';
import Background3D from './components/Background3D';
import Dock from './components/Dock';
import FileExplorer from './components/FileExplorer';
import type { WindowState } from './types';

function App() {
  const [windowState, setWindowState] = useState<WindowState>('normal');
  const [showFiles, setShowFiles] = useState(false);

  const handleClose = () => setWindowState('closed');
  const handleMinimize = () => setWindowState('minimized');
  const handleMaximize = () => setWindowState(prev => prev === 'maximized' ? 'normal' : 'maximized');

  // Toggle Terminal: If open/maximized -> minimize. If minimized/closed -> normal.
  const handleToggleTerminal = () => {
    if (windowState === 'normal' || windowState === 'maximized') {
      setWindowState('minimized');
    } else {
      setWindowState('normal');
    }
  };

  // Toggle Files: If open -> close. If closed -> open.
  const handleToggleFiles = () => setShowFiles(prev => !prev);

  return (
    <div className="app-container">
      <Background3D />

      {windowState !== 'minimized' && windowState !== 'closed' && (
        <Terminal
          windowState={windowState}
          onClose={handleClose}
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
        />
      )}

      {showFiles && <FileExplorer onClose={() => setShowFiles(false)} />}

      <Dock
        onTerminalClick={handleToggleTerminal}
        windowState={windowState}
        onFilesClick={handleToggleFiles}
        filesOpen={showFiles}
      />
    </div>
  );
}

export default App;
