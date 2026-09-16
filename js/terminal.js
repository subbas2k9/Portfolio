/**
 * Interactive Developer CLI Terminal Engine
 * Subbas M Developer Portfolio
 */

(function () {
  const terminalScreen = document.getElementById('cli-screen');
  const terminalInput = document.getElementById('cli-input');
  if (!terminalScreen || !terminalInput) return;

  const COMMANDS = {
    help: `
<span class="t-cmd">Available commands:</span>
  <span class="t-prompt">about</span>      - Quick bio and engineering focus
  <span class="t-prompt">skills</span>     - Core technical stack and frameworks
  <span class="t-prompt">projects</span>   - Highlighted engineering builds
  <span class="t-prompt">contact</span>    - Email and direct communication details
  <span class="t-prompt">socials</span>    - GitHub & LinkedIn profile links
  <span class="t-prompt">sudo hire</span>  - Fast-track recruitment response
  <span class="t-prompt">clear</span>      - Clear terminal screen
  <span class="t-prompt">date</span>       - Display system timestamp
`,

    about: `
<span class="t-cmd">Subbas M</span> — Full-Stack Developer & Computer Engineering Specialist.
<span class="t-out">Specialized in architecting high-performance backend systems with Python/Django and building dynamic, responsive user experiences with modern JavaScript & React.</span>
<span class="t-val">Status:</span> Available for Software Engineering Opportunities.
`,

    skills: `
<span class="t-cmd">Technical Capabilities:</span>
  • <span class="t-val">Languages:</span> Python, JavaScript (ES6+), C, Java, SQL, HTML5, CSS3
  • <span class="t-val">Frameworks:</span> Django, React.js
  • <span class="t-val">Developer Tools:</span> Git, GitHub, VS Code, REST APIs, Linux
  • <span class="t-val">Focus Areas:</span> Scalable Architectures, Component Systems, Database Optimization
`,

    projects: `
<span class="t-cmd">Featured Projects:</span>
  1. <span class="t-prompt">Online Event Management System</span> [Python / Django / JS]
     Full-stack event scheduling, attendee registrations, and admin management.
  2. <span class="t-prompt">Interactive Web Applications Showcase</span> [React / JS / Modern CSS]
     Modular, high-performance frontend interfaces with responsive state dynamics.
<span class="t-out">Run <span class="t-val">open github</span> or explore the Projects section above.</span>
`,

    contact: `
<span class="t-cmd">Direct Contact Channels:</span>
  • <span class="t-val">Email:</span> <a href="mailto:subbas2k9@gmail.com" class="t-prompt">subbas2k9@gmail.com</a>
  • <span class="t-val">GitHub:</span> <a href="https://github.com/subbas2k9" target="_blank" class="t-prompt">https://github.com/subbas2k9</a>
  • <span class="t-val">LinkedIn:</span> <a href="https://www.linkedin.com/in/subbas-m-162k9/" target="_blank" class="t-prompt">https://www.linkedin.com/in/subbas-m-162k9/</a>
`,

    socials: `
<span class="t-cmd">Social & Profiles:</span>
  • GitHub:   <a href="https://github.com/subbas2k9" target="_blank" style="color:#00F2FE;">https://github.com/subbas2k9</a>
  • LinkedIn: <a href="https://www.linkedin.com/in/subbas-m-162k9/" target="_blank" style="color:#00F2FE;">https://www.linkedin.com/in/subbas-m-162k9/</a>
`,

    'sudo hire': `
<span style="color:#10B981; font-weight:bold;">[SUCCESS] Privileges Granted!</span>
<span class="t-out">Opening direct email compose to <a href="mailto:subbas2k9@gmail.com?subject=Opportunity%20for%20Subbas%20M" style="color:#00F2FE;">subbas2k9@gmail.com</a>...</span>
`,

    date: () => `<span class="t-val">${new Date().toUTCString()}</span>`,

    clear: () => {
      terminalScreen.innerHTML = '';
      return null;
    }
  };

  function appendOutput(cmd, outputHtml) {
    const block = document.createElement('div');
    block.className = 'cli-output-block';

    if (cmd !== null) {
      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="cli-prompt-label">subbas@portfolio:~$</span> <span style="color:#00F2FE;">${cmd}</span>`;
      block.appendChild(promptLine);
    }

    if (outputHtml) {
      const outputDiv = document.createElement('div');
      outputDiv.innerHTML = outputHtml;
      block.appendChild(outputDiv);
    }

    terminalScreen.appendChild(block);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function handleCommand(cmdStr) {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      COMMANDS.clear();
      return;
    }

    if (trimmed === 'sudo hire') {
      appendOutput(trimmed, COMMANDS['sudo hire']);
      setTimeout(() => {
        window.location.href = 'mailto:subbas2k9@gmail.com?subject=Software%20Engineering%20Opportunity%20for%20Subbas%20M';
      }, 900);
      return;
    }

    if (trimmed === 'github' || trimmed === 'open github') {
      appendOutput(trimmed, '<span class="t-out">Redirecting to GitHub: https://github.com/subbas2k9</span>');
      window.open('https://github.com/subbas2k9', '_blank');
      return;
    }

    if (trimmed === 'linkedin' || trimmed === 'open linkedin') {
      appendOutput(trimmed, '<span class="t-out">Redirecting to LinkedIn: https://www.linkedin.com/in/subbas-m-162k9/</span>');
      window.open('https://www.linkedin.com/in/subbas-m-162k9/', '_blank');
      return;
    }

    if (COMMANDS[trimmed]) {
      const res = typeof COMMANDS[trimmed] === 'function' ? COMMANDS[trimmed]() : COMMANDS[trimmed];
      appendOutput(trimmed, res);
    } else {
      appendOutput(
        trimmed,
        `<span style="color:#ef4444;">command not found: "${trimmed}". Type <span class="t-prompt" style="cursor:pointer;" onclick="document.getElementById('cli-input').value='help'; document.getElementById('cli-input').focus();">help</span> to view all available commands.</span>`
      );
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    }
  });

  // Handle chips clicking
  document.querySelectorAll('.cli-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd') || chip.textContent.trim();
      terminalInput.value = cmd;
      terminalInput.focus();
      handleCommand(cmd);
    });
  });

  // Focus terminal when clicked anywhere in window
  const windowEl = document.querySelector('.cli-terminal-window');
  if (windowEl) {
    windowEl.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
})();
