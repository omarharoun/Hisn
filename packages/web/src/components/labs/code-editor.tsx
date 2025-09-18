'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Save, 
  RefreshCw, 
  Download, 
  Upload,
  FileText,
  Code2,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'

interface CodeEditorProps {
  initialCode: string
  language?: string
  onCodeChange?: (code: string) => void
  onRun?: (code: string) => Promise<{ success: boolean; output: string }>
  onSave?: (code: string) => void
  readOnly?: boolean
  showLineNumbers?: boolean
}

export function CodeEditor({ 
  initialCode, 
  language = 'bash',
  onCodeChange,
  onRun,
  onSave,
  readOnly = false,
  showLineNumbers = true
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [isSaved, setIsSaved] = useState(true)
  const [runStatus, setRunStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle')
  const [selectedLine, setSelectedLine] = useState<number | null>(null)

  useEffect(() => {
    if (code !== initialCode) {
      setIsSaved(false)
      if (onCodeChange) {
        onCodeChange(code)
      }
    }
  }, [code])

  const handleRun = async () => {
    if (!onRun) return
    
    setIsRunning(true)
    setRunStatus('running')
    setOutput('Running...')
    
    try {
      const result = await onRun(code)
      setOutput(result.output)
      setRunStatus(result.success ? 'success' : 'error')
    } catch (error) {
      setOutput('Error: Failed to run code')
      setRunStatus('error')
    } finally {
      setIsRunning(false)
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave(code)
      setIsSaved(true)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setIsSaved(true)
    setOutput('')
    setRunStatus('idle')
  }

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code.${getFileExtension(language)}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (lang: string) => {
    const extensions: Record<string, string> = {
      bash: 'sh',
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      go: 'go',
      rust: 'rs',
      dockerfile: 'Dockerfile'
    }
    return extensions[lang] || 'txt'
  }

  const getLanguageDisplay = (lang: string) => {
    const displays: Record<string, string> = {
      bash: 'Bash',
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      go: 'Go',
      rust: 'Rust',
      dockerfile: 'Dockerfile'
    }
    return displays[lang] || lang
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2
      }, 0)
    }
    
    // Handle Ctrl/Cmd + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onRun) {
      e.preventDefault()
      handleRun()
    }
    
    // Handle Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && onSave) {
      e.preventDefault()
      handleSave()
    }
  }

  const getLineNumbers = () => {
    const lines = code.split('\n')
    return lines.map((_, index) => index + 1)
  }

  const getStatusIcon = () => {
    switch (runStatus) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'running':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Editor Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Code Editor
              </CardTitle>
              <Badge variant="outline">{getLanguageDisplay(language)}</Badge>
              {!isSaved && (
                <Badge variant="warning" className="text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Unsaved
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onSave && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaved || readOnly}
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={downloadCode}
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={readOnly}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              {onRun && (
                <Button
                  size="sm"
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex">
              {showLineNumbers && (
                <div className="pr-3 text-gray-500 text-sm font-mono select-none">
                  {getLineNumbers().map(num => (
                    <div 
                      key={num} 
                      className={`h-6 leading-6 text-right ${selectedLine === num ? 'bg-blue-100' : ''}`}
                      onClick={() => setSelectedLine(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-h-[400px] p-0 font-mono text-sm bg-gray-50 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  lineHeight: '1.5rem',
                  tabSize: 2
                }}
                readOnly={readOnly}
                spellCheck={false}
                placeholder="Enter your code here..."
              />
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Press Ctrl+Enter to run • Ctrl+S to save • Tab for indent
          </div>
        </CardContent>
      </Card>

      {/* Output Card */}
      {onRun && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Output
              </CardTitle>
              {getStatusIcon()}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm min-h-[150px] ${
              runStatus === 'error' ? 'text-red-400' : ''
            }`}>
              {output || <span className="text-gray-500">Run your code to see output here</span>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}