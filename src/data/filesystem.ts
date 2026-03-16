export interface FileContent {
    type: 'file' | 'executable' | 'shortcut';
    content: string;
}

export const fileSystem: Record<string, FileContent> = {
    'about.txt': {
        type: 'file',
        content: `<p>I am a Network Engineer at TATA Communications, specializing in the deployment, and optimization/ management of cutting-edge SD-WAN solutions.</p>
              <p>My expertise is backed by a B.Tech in Computer Engineering and a strong foundation in core networking principles.</p>
              <p>I am committed to leveraging my technical acumen and innate curiosity to solve complex infrastructure challenges.</p>
              <p>Key technical proficiencies include Cybersecurity fundamentals, Python scripting, and Networking.</p>
              <p>I thrive on continuous learning and am actively pursuing advanced networking certifications.</p>
              <p>I am eager to apply a data-driven approach to enhance network efficiency and drive business value.</p>`
    },
    'skills.sh': {
        type: 'executable',
        content: `<p>#!/bin/bash</p>
              <p># Languages</p>
              <p>echo "JavaScript, Python, SQL, C"</p>
              <br>
              <p># Frameworks & Automation</p>
              <p>echo "Flask, Django, Ansible"</p>
              <br>
              <p># Linux & Infrastructure</p>
              <p>echo "Ubuntu, Redhat/RHCSA, Kali Linux"</p>
              <p>echo "OpenShift AI, VMware, VirtualBox"</p>
              <br>
              <p># Network & Security Tools</p>
              <p>echo "WireShark, Nmap, Fortinet, Cisco Catalyst, Versa SDWAN/SASE"</p>
              <br>
              <p># Soft Skills</p>
              <p>echo "Communication, Adaptability, Reasoning"</p>`
    },
    'experience.log': {
        type: 'file',
        content: `<p><strong>07/2025 - Present</strong>: Network Engineer @ Tata Communications (Dighi, Pune)</p>
              <p>> Working on SDWAN Technologies (Versa SDWAN/SASE, Fortinet, Cisco Catalyst).</p>
              <p>> Managing and Configuring Headend devices & CPEs.</p>
              <p>> Solving Real-world complications in In-Production devices.</p>
              <br>
              <p><strong>01/2025 - 06/2025</strong>: Intern @ Tata Communications</p>
              <p>> Monitored and Analyzed configurations (Overlay Network, IPSEC, SDWAN Policies).</p>
              <p>> Managed user stories in Jira with clear acceptance criteria.</p>
              <p>> Created data trend reports using VLOOKUP and pivot tables.</p>`
    },
    'education.txt': {
        type: 'file',
        content: `<p><strong>B. TECH in Electronics and Computer Engineering</strong> (2021-2025)</p>
              <p>Maharashtra Institute of Technology, Chhatrapati Sambhaji Nagar | CGPA: 7.63</p>
              <br>
              <p><strong>HSC</strong> (2019-2021) | Deogiri Junior College | 83.83%</p>
              <br>
              <p><strong>SSC</strong> (2018-2019) | Jain International School | 70%</p>`
    },
    'projects': {
        type: 'shortcut', // Treated as a special command or file
        content: `<p style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">1. <strong>Instagram Clone</strong> 
                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" height="20">
                <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white" height="20">
                <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase" height="20">
                <a href="https://github.com/SomTakalkar/instagram_clone.git" target="_blank" rel="noopener noreferrer" style="margin-left:auto;">[ View ]</a></p>
              
              <p style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">2. <strong>Calculator</strong> 
                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" height="20">
                <a href="https://github.com/SomTakalkar/calculator-app.git" target="_blank" rel="noopener noreferrer" style="margin-left:auto;">[ View ]</a></p>
              
              <p style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">3. <strong>AI Tic Tac Toe</strong> 
                <span style="font-size:0.85em; background:#444; color:#fff; padding:2px 6px; border-radius:4px;">Minimax</span>
                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" height="20">
                <img src="https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white" height="20">
                <a href="https://github.com/SomTakalkar/AI_TicTacToe.git" target="_blank" rel="noopener noreferrer" style="margin-left:auto;">[ View ]</a></p>
              
              <p style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">4. <strong>Ansible Playbook</strong> 
                <img src="https://img.shields.io/badge/ansible-%231A1918.svg?style=flat&logo=ansible&logoColor=white" height="20">
                <a href="https://github.com/SomTakalkar/ansible_demo1.git" target="_blank" rel="noopener noreferrer" style="margin-left:auto;">[ View ]</a></p>
              
              <p style="display:flex; align-items:center; flex-wrap:wrap; gap:6px;">5. <strong>Password Manager</strong> 
                <img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB" height="20">
                <img src="https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white" height="20">
                <img src="https://img.shields.io/badge/vault-%23000000.svg?style=flat&logo=vault&logoColor=white" height="20">
                <span style="font-size:0.85em; background:#444; color:#fff; padding:2px 6px; border-radius:4px;">AES-256</span>
                <a href="https://github.com/SomTakalkar/Password_Manager" target="_blank" rel="noopener noreferrer" style="margin-left:auto;">[ View ]</a></p>`
    },
    'certificates': {
        type: 'file',
        content: `<p>• Google-Coursera, HackerRank, IBM-Coursera Certifications</p>
              <p>• Badges: Google Cloud, Redhat (Credly)</p>
              <p>• NPTEL Certification in Ethical Hacking</p>`
    },
    'contact.txt': {
        type: 'file',
        content: `<p>Email: somtakalkar200211@gmail.com</p>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/som-takalkar-5a3871245/" target="_blank" rel="noopener noreferrer">som-takalkar-5a3871245</a></p>
              <p>Location: Pune, India</p>`
    }
};
