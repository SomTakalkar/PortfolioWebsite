import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    onClose: () => void;
}

const FileExplorer: React.FC<Props> = ({ onClose }) => {
    // Placeholder function for download - allows user to drop actual file later
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/Resume.pdf'; // Matches file in public folder
        link.download = 'Som_Takalkar_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            className="file-explorer-window"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            drag
            dragMomentum={false}
        >
            <div className="explorer-header">
                <div className="title">File Manager - /root/Documents</div>
                <div className="buttons">
                    <span className="btn close" onClick={onClose}></span>
                </div>
            </div>

            <div className="explorer-body">
                <div className="explorer-sidebar">
                    <div className="sidebar-item">Home</div>
                    <div className="sidebar-item active">Documents</div>
                    <div className="sidebar-item">Downloads</div>
                    <div className="sidebar-item">Trash</div>
                </div>

                <div className="explorer-content">
                    <div className="file-grid">
                        <div className="file-item" onClick={handleDownload}>
                            <div className="file-icon pdf">PDF</div>
                            <span className="file-name">Resume.pdf</span>
                        </div>
                        {/* Placeholder for future files */}
                        <div className="file-item" style={{ opacity: 0.5 }}>
                            <div className="file-icon txt">TXT</div>
                            <span className="file-name">notes.txt</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FileExplorer;
