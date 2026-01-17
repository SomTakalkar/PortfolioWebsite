import React from 'react';
import { motion } from 'framer-motion';
import type { WindowState } from '../types';

interface DockProps {
    onTerminalClick: () => void;
    onFilesClick: () => void;
    windowState: WindowState;
    filesOpen: boolean;
}

const Dock: React.FC<DockProps> = ({ onTerminalClick, onFilesClick, windowState, filesOpen }) => {
    return (
        <div className="dock-container">
            <div className="dock-glass">
                {/* Terminal Icon */}
                <DockIcon
                    label="Terminal"
                    isActive={windowState !== 'closed' && windowState !== 'minimized'}
                    onClick={onTerminalClick}
                    icon=">_"
                    color="#268bd2"
                />

                {/* Files Icon - Opens File Explorer */}
                <DockIcon
                    label="Files"
                    isActive={filesOpen}
                    onClick={onFilesClick}
                    icon="📁"
                    color="#f1c40f"
                />
            </div>
        </div>
    );
};

const DockIcon = ({ label, isActive, onClick, icon, color }: any) => {
    return (
        <motion.div
            className="dock-icon-wrapper"
            onClick={onClick}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="dock-icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            {isActive && <div className="active-dot" />}
            <span className="icon-tooltip">{label}</span>
        </motion.div>
    )
}

export default Dock;
