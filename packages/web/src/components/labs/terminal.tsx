'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Terminal as TerminalIcon, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Download,
  RotateCcw,
  Play,
  Square
} from 'lucide-react'

interface TerminalProps {
  labId: string
  initialCommands?: string[]
  onCommandExecute?: (command: string) => void
}

export function Terminal({ labId, initialCommands = [], onCommandExecute }: TerminalProps) {
  const [commands, setCommands] = useState<Array<{ input: string; output: string }>>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock command responses
  const executeCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    setIsRunning(true)
    
    // Add to history
    setHistory(prev => [...prev, trimmedCmd])
    setHistoryIndex(-1)

    // Mock responses based on command
    let output = ''
    
    switch (trimmedCmd) {
      case 'pwd':
        output = '/home/user/workspace'
        break
      case 'ls':
        output = 'file1.txt  file2.txt  script.sh  my-lab/'
        break
      case 'ls -la':
        output = `total 16
drwxr-xr-x 4 user user 4096 Jan 15 10:00 .
drwxr-xr-x 3 user user 4096 Jan 15 09:00 ..
-rw-r--r-- 1 user user   15 Jan 15 10:00 file1.txt
-rw-r--r-- 1 user user   15 Jan 15 10:00 file2.txt
-rwxr-xr-x 1 user user   45 Jan 15 10:00 script.sh
drwxr-xr-x 2 user user 4096 Jan 15 10:00 my-lab/`
        break
      case 'cat file1.txt':
        output = 'This is file 1'
        break
      case 'docker --version':
        output = 'Docker version 24.0.7, build afdd53b'
        break
      case 'docker ps':
        output = `CONTAINER ID   IMAGE          COMMAND       CREATED         STATUS         PORTS     NAMES
a1b2c3d4e5f6   ubuntu:20.04   "/bin/bash"   5 minutes ago   Up 5 minutes             friendly_einstein`
        break
      case 'whoami':
        output = 'user'
        break
      case 'date':
        output = new Date().toString()
        break
      case 'clear':
        setCommands([])
        setIsRunning(false)
        return
      case 'help':
        output = `Available commands:
  pwd          - Print working directory
  ls           - List files
  cd           - Change directory
  cat          - Display file contents
  echo         - Print text
  mkdir        - Create directory
  rm           - Remove files
  docker       - Docker commands
  clear        - Clear terminal
  help         - Show this help`
        break
      default:
        if (trimmedCmd.startsWith('echo ')) {
          output = trimmedCmd.substring(5)
        } else if (trimmedCmd.startsWith('cd ')) {
          output = '' // Silent success
        } else if (trimmedCmd.startsWith('mkdir ')) {
          output = '' // Silent success
        } else {
          output = `bash: ${trimmedCmd.split(' ')[0]}: command not found`
        }
    }

    setCommands(prev => [...prev, { input: trimmedCmd, output }])
    setCurrentCommand('')
    
    // Call parent handler if provided
    if (onCommandExecute) {
      onCommandExecute(trimmedCmd)
    }

    setTimeout(() => {
      setIsRunning(false)
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    }
  }

  const copyToClipboard = () => {
    const content = commands.map(cmd => 
      `$ ${cmd.input}\n${cmd.output}`
    ).join('\n\n')
    navigator.clipboard.writeText(content)
  }

  const downloadSession = () => {
    const content = commands.map(cmd => 
      `$ ${cmd.input}\n${cmd.output}`
    ).join('\n\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lab-${labId}-session.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetTerminal = () => {
    setCommands([])
    setCurrentCommand('')
    setHistory([])
    setHistoryIndex(-1)
  }

  // Focus input when clicking terminal
  const focusInput = () => {
    inputRef.current?.focus()
  }

  // Execute initial commands
  useEffect(() => {
    if (initialCommands.length > 0) {
      initialCommands.forEach((cmd, index) => {
        setTimeout(() => {
          executeCommand(cmd)
        }, index * 500)
      })
    }
  }, [])

  return (
    <Card className={`bg-gray-900 text-gray-100 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">Docker Terminal - Lab Environment</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-gray-100"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadSession}
            className="text-gray-400 hover:text-gray-100"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetTerminal}
            className="text-gray-400 hover:text-gray-100"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-400 hover:text-gray-100"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-4 font-mono text-sm overflow-y-auto cursor-text"
        style={{ height: isFullscreen ? 'calc(100vh - 8rem)' : '400px' }}
        onClick={focusInput}
      >
        <div className="mb-2 text-green-400">
          Welcome to the Docker Lab Environment
        </div>
        <div className="mb-4 text-gray-500">
          Type 'help' for available commands
        </div>
        
        {commands.map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-start">
              <span className="text-green-400 mr-2">$</span>
              <span className="flex-1">{cmd.input}</span>
            </div>
            {cmd.output && (
              <div className="mt-1 ml-4 text-gray-300 whitespace-pre-wrap">
                {cmd.output}
              </div>
            )}
          </div>
        ))}
        
        <div className="flex items-start">
          <span className="text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-gray-100"
            placeholder="Enter command..."
            disabled={isRunning}
            autoFocus
          />
          {isRunning && (
            <div className="ml-2 w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </div>
    </Card>
  )
}