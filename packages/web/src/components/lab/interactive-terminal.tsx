'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'

interface InteractiveTerminalProps {
  labId: string
  onCommand?: (command: string) => void
  onOutput?: (output: string) => void
  className?: string
}

export function InteractiveTerminal({ 
  labId, 
  onCommand, 
  onOutput, 
  className = '' 
}: InteractiveTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<Terminal | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [currentCommand, setCurrentCommand] = useState('')

  useEffect(() => {
    if (!terminalRef.current) return

    // Initialize terminal
    const term = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
      theme: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        cursor: '#ffffff',
        selection: '#264f78',
        black: '#000000',
        red: '#cd3131',
        green: '#0dbc79',
        yellow: '#e5e510',
        blue: '#2472c8',
        magenta: '#bc3fbc',
        cyan: '#11a8cd',
        white: '#e5e5e5',
        brightBlack: '#666666',
        brightRed: '#f14c4c',
        brightGreen: '#23d18b',
        brightYellow: '#f5f543',
        brightBlue: '#3b8eea',
        brightMagenta: '#d670d6',
        brightCyan: '#29b8db',
        brightWhite: '#e5e5e5'
      }
    })

    // Add addons
    const fitAddon = new FitAddon()
    const webLinksAddon = new WebLinksAddon()
    
    term.loadAddon(fitAddon)
    term.loadAddon(webLinksAddon)

    // Open terminal
    term.open(terminalRef.current)
    fitAddon.fit()

    // Welcome message
    term.writeln('Welcome to SkillPath Interactive Lab!')
    term.writeln('Environment: Ubuntu 20.04 LTS')
    term.writeln('Type commands to interact with the lab environment.')
    term.writeln('')
    term.write('$ ')

    let currentLine = ''
    let cursorPosition = 0

    // Handle input
    term.onData((data) => {
      const code = data.charCodeAt(0)

      if (code === 13) { // Enter key
        term.writeln('')
        if (currentLine.trim()) {
          handleCommand(currentLine.trim())
          onCommand?.(currentLine.trim())
        }
        currentLine = ''
        cursorPosition = 0
        term.write('$ ')
      } else if (code === 127) { // Backspace
        if (cursorPosition > 0) {
          currentLine = currentLine.slice(0, -1)
          cursorPosition--
          term.write('\b \b')
        }
      } else if (code === 9) { // Tab - basic autocomplete
        // Simple autocomplete for common commands
        const commands = ['ls', 'cd', 'pwd', 'mkdir', 'touch', 'cat', 'echo', 'grep', 'find', 'chmod', 'chown']
        const matches = commands.filter(cmd => cmd.startsWith(currentLine))
        if (matches.length === 1) {
          const completion = matches[0].slice(currentLine.length)
          currentLine += completion
          cursorPosition += completion.length
          term.write(completion)
        }
      } else if (code >= 32 && code <= 126) { // Printable characters
        currentLine += data
        cursorPosition++
        term.write(data)
      }
    })

    // Mock command execution
    const handleCommand = async (command: string) => {
      setCurrentCommand(command)
      
      // Simulate command execution delay
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 500))
      
      let output = ''
      
      // Mock command responses
      if (command === 'pwd') {
        output = '/home/student'
      } else if (command.startsWith('ls')) {
        if (command.includes('-la') || command.includes('-al')) {
          output = `total 24
drwxr-xr-x 3 student student 4096 Jan 15 10:30 .
drwxr-xr-x 3 root    root    4096 Jan 15 10:00 ..
-rw-r--r-- 1 student student  220 Jan 15 10:00 .bash_logout
-rw-r--r-- 1 student student 3771 Jan 15 10:00 .bashrc
drwxr-xr-x 2 student student 4096 Jan 15 10:30 my-lab
-rw-r--r-- 1 student student  807 Jan 15 10:00 .profile`
        } else {
          output = 'my-lab'
        }
      } else if (command.startsWith('cd')) {
        const path = command.split(' ')[1] || '~'
        output = '' // cd doesn't produce output on success
      } else if (command.startsWith('mkdir')) {
        const dirname = command.split(' ')[1]
        if (dirname) {
          output = '' // mkdir doesn't produce output on success
        } else {
          output = 'mkdir: missing operand'
        }
      } else if (command.startsWith('touch')) {
        const filename = command.split(' ')[1]
        if (filename) {
          output = '' // touch doesn't produce output on success
        } else {
          output = 'touch: missing file operand'
        }
      } else if (command.startsWith('echo')) {
        output = command.substring(5) // Remove 'echo '
      } else if (command === 'whoami') {
        output = 'student'
      } else if (command === 'date') {
        output = new Date().toString()
      } else if (command.startsWith('cat')) {
        const filename = command.split(' ')[1]
        if (filename === 'file1.txt') {
          output = 'This is file 1'
        } else if (filename === 'file2.txt') {
          output = 'This is file 2'
        } else {
          output = `cat: ${filename}: No such file or directory`
        }
      } else if (command === 'clear') {
        term.clear()
        return
      } else if (command === 'help') {
        output = `Available commands:
  ls [-la]     - List directory contents
  cd [dir]     - Change directory
  pwd          - Print working directory
  mkdir <dir>  - Create directory
  touch <file> - Create empty file
  cat <file>   - Display file contents
  echo <text>  - Display text
  whoami       - Display current user
  date         - Display current date
  clear        - Clear terminal
  help         - Show this help message`
      } else {
        output = `bash: ${command}: command not found`
      }

      if (output) {
        term.writeln(output)
        onOutput?.(output)
      }
    }

    setTerminal(term)
    setIsConnected(true)

    // Handle resize
    const handleResize = () => {
      fitAddon.fit()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      term.dispose()
    }
  }, [labId, onCommand, onOutput])

  return (
    <div className={`h-full bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-sm text-gray-400">Terminal - {labId}</div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-400">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <div 
        ref={terminalRef} 
        className="h-full p-2"
        style={{ height: 'calc(100% - 48px)' }}
      />
    </div>
  )
}