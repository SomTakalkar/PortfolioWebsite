import React, { useState, useRef, useEffect } from 'react';
import { fileSystem } from '../data/filesystem';
import { motion } from 'framer-motion';
import type { WindowState } from '../types';

interface Props {
    windowState: WindowState;
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}

// Types
interface HistoryItem {
    id: number;
    type: 'command' | 'output';
    content: string | React.ReactNode;
    cmd?: string;
}

const Terminal: React.FC<Props> = ({ windowState, onClose, onMinimize, onMaximize }) => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [inputVal, setInputVal] = useState('');
    const [booted, setBooted] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Boot Sequence
    useEffect(() => {
        if (booted) return;

        const bootLines = [
            "Establishing secure connection...",
            "Resolving domain...",
            "Loading kernel modules...",
            "Mounting file systems...",
            "Starting interfaces: eth0 [OK], wlan0 [OK]",
            "Access granted. Welcome, guest."
        ];

        let delay = 0;
        bootLines.forEach(() => {
            delay += 400;
            setTimeout(() => {
                // We can render boot lines or just set booted at the end
            }, delay);
        });

        setTimeout(() => {
            setBooted(true);
        }, delay + 500);
    }, [booted]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, booted]);

    const handleCommand = (cmd: string) => {
        // Add Command to History
        const cmdId = Date.now();
        const newHistory: HistoryItem[] = [...history, { id: cmdId, type: 'command', content: '', cmd: cmd }];

        const trimmedCmd = cmd.trim().toLowerCase();
        let response = '';

        if (trimmedCmd === 'help') {
            response = `<p style="margin-bottom: 0.5rem">Available commands:</p>
                     <ul style="list-style: none; padding-left: 1rem">
                        <li>cat [file] - View file contents</li>
                        <li>ls - List files</li>
                        <li>top - Show skills/processes</li>
                        <li>history - Show work experience</li>
                        <li>projects - Show personal projects</li>
                        <li>education - Show educational background</li>
                        <li>ping [target] - Check connectivity</li>
                        <li>clear - Clear the terminal</li>
                     </ul>`;
        } else if (trimmedCmd === 'ls') {
            response = Object.keys(fileSystem).join('  ');
        } else if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        } else if (trimmedCmd.startsWith('cat ')) {
            const arg = trimmedCmd.replace('cat ', '').trim();
            if (fileSystem[arg]) {
                response = fileSystem[arg].content;
            } else {
                response = `cat: ${arg}: No such file or directory`;
            }
        } else if (trimmedCmd === 'top') {
            // New Skills from Resume
            response = `<p>PID USER      PR  NI  VIRT  RES  SHR S  %CPU %MEM     TIME+ COMMAND</p>
                      <p>101 som       20   0  512m  64m 8096 R  12.0  1.2   0:01.05 ansible-playbook</p>
                      <p>102 som       20   0  305m  25m 4096 S   5.3  0.5   0:45.12 python3</p>
                      <p>103 root      20   0  2GB   1GB  16m S   2.0  8.0   9:10.22 versa-director</p>
                      <p>104 som       20   0  120m  10m 2048 S   1.0  0.2   0:00.50 wireshark</p>
                      <p>105 som       20   0   80m   5m 1024 S   0.5  0.1   0:02.33 nmap</p>`;
        } else if (trimmedCmd === 'projects') {
            response = fileSystem['projects'].content;
        } else if (trimmedCmd === 'education') {
            response = fileSystem['education.txt'].content;
        } else if (trimmedCmd === 'history') {
            response = fileSystem['experience.log'].content;
        } else if (trimmedCmd.startsWith('ping ')) {
            const target = trimmedCmd.split(' ')[1];
            response = `<p>Pinging ${target}...</p>
                     <p>64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.034 ms</p>
                     <p>64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.041 ms</p>`;
            if (trimmedCmd.includes('contact')) {
                response += `<br>${fileSystem['contact.txt'].content}`;
            }
        } else if (trimmedCmd === '') {
            // nothing
        } else {
            response = `-bash: ${cmd}: command not found`;
        }

        if (response) {
            newHistory.push({ id: Date.now() + 1, type: 'output', content: response });
        }

        setHistory(newHistory);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(inputVal);
            setInputVal('');
        }
    };

    const handleShortcut = (cmd: string) => {
        handleCommand(cmd);
    }

    return (
        <div className={`terminal-window ${windowState === 'maximized' ? 'maximized' : ''}`} onClick={() => inputRef.current?.focus()}>
            <div className="terminal-header">
                <div className="buttons">
                    <span className="btn close" onClick={onClose}></span>
                    <span className="btn minimize" onClick={onMinimize}></span>
                    <span className="btn maximize" onClick={onMaximize}></span>
                </div>
                <div className="title">root@kali:~</div>
            </div>

            <div className="terminal-body" ref={scrollRef}>
                {/* Boot Sequence Visuals */}
                {!booted && (
                    <div className="boot-sequence">
                        <p>[OK] Establishing secure connection...</p>
                        <p>[OK] Loading kernel modules...</p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}>
                            Access granted. Welcome.
                        </motion.p>
                    </div>
                )}

                {booted && (
                    <>
                        <div className="hero-section">
                            <div className="prompt-line">
                                <span className="user">root@kali</span>:<span className="path">~</span>#
                                <span className="typing"> ./init_som_portfolio.sh</span>
                            </div>
                            <div className="hero-output">
                                <h1 style={{ marginTop: 0 }}>Som Takalkar</h1>
                                <p>Network Engineer | Cybersecurity Enthusiast | Full Stack Developer</p>
                                <br />
                                <p className="hint">Type or click 'help' to see available commands.</p>
                                <p className="hint" style={{ color: '#e67e22' }}>* Resume available in the 'Files' dock app (Folder Icon) *</p>
                            </div>
                        </div>

                        {/* History */}
                        {history.map((item) => (
                            <div key={item.id} className="history-item">
                                {item.type === 'command' ? (
                                    <div className="prompt-line">
                                        <span className="user">root@kali</span>:<span className="path">~</span>$ {item.cmd}
                                    </div>
                                ) : (
                                    typeof item.content === 'string' ? (
                                        <div className="command-output" dangerouslySetInnerHTML={{ __html: item.content }} />
                                    ) : (
                                        <div className="command-output">{item.content}</div>
                                    )
                                )}
                            </div>
                        ))}

                        {/* Input Line */}
                        <div className="input-line">
                            <span className="user">root@kali</span>:<span className="path">~</span>$
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputVal}
                                onChange={(e) => setInputVal(e.target.value)}
                                onKeyDown={onKeyDown}
                                autoFocus
                                autoComplete="off"
                            />
                        </div>

                        {/* Shortcuts */}
                        <nav className="shortcuts">
                            <a onClick={() => handleShortcut('cat about.txt')}>[ About ]</a>
                            <a onClick={() => handleShortcut('top')}>[ Skills ]</a>
                            <a onClick={() => handleShortcut('projects')}>[ Projects ]</a>
                            <a onClick={() => handleShortcut('history')}>[ Experience ]</a>
                            <a onClick={() => handleShortcut('education')}>[ Education ]</a>
                            <a onClick={() => handleShortcut('ping contact')}>[ Contact ]</a>
                        </nav>
                    </>
                )}
            </div>
        </div>
    );
}

export default Terminal;
