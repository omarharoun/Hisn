'use client'

import { useState, useCallback } from 'react'
import { QuestionPanel, Question } from './question-panel'
import { InteractiveTerminal } from './interactive-terminal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  RotateCcw, 
  Settings,
  Maximize2,
  Minimize2
} from 'lucide-react'

interface InteractiveLabLayoutProps {
  labId: string
  labTitle: string
  questions: Question[]
  className?: string
}

export function InteractiveLabLayout({ 
  labId, 
  labTitle, 
  questions: initialQuestions, 
  className = '' 
}: InteractiveLabLayoutProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [lastCommand, setLastCommand] = useState('')
  const [lastOutput, setLastOutput] = useState('')
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])

  const handleQuestionChange = useCallback((index: number) => {
    setCurrentQuestionIndex(index)
  }, [])

  const handleQuestionComplete = useCallback((questionId: string) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === questionId ? { ...q, completed: true } : q
      )
    )
  }, [])

  const handleCommand = useCallback((command: string) => {
    setLastCommand(command)
    setCommandHistory(prev => [...prev, command])
  }, [])

  const handleOutput = useCallback((output: string) => {
    setLastOutput(output)
  }, [])

  const resetLab = () => {
    setQuestions(prev => prev.map(q => ({ ...q, completed: false })))
    setCurrentQuestionIndex(0)
    setLastCommand('')
    setLastOutput('')
    setCommandHistory([])
  }

  const toggleLeftPanel = () => {
    setLeftPanelCollapsed(!leftPanelCollapsed)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const completedCount = questions.filter(q => q.completed).length
  const isLabComplete = completedCount === questions.length

  return (
    <div className={`h-screen flex flex-col bg-gray-50 ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">{labTitle}</h1>
          <Badge variant={isLabComplete ? 'default' : 'outline'}>
            {completedCount} / {questions.length} completed
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLeftPanel}
            title={leftPanelCollapsed ? 'Show questions' : 'Hide questions'}
          >
            {leftPanelCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetLab}
            title="Reset lab progress"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            title="Lab settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Questions */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          leftPanelCollapsed ? 'w-0' : 'w-96'
        } flex-shrink-0`}>
          {!leftPanelCollapsed && (
            <QuestionPanel
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              onQuestionChange={handleQuestionChange}
              onQuestionComplete={handleQuestionComplete}
              lastCommand={lastCommand}
              lastOutput={lastOutput}
              className="h-full"
            />
          )}
        </div>

        {/* Right Panel - Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-white font-medium">Terminal</h3>
                <div className="text-gray-400 text-sm">
                  Commands executed: {commandHistory.length}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Lab Environment</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="flex-1">
            <InteractiveTerminal
              labId={labId}
              onCommand={handleCommand}
              onOutput={handleOutput}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Completion Modal/Overlay */}
      {isLabComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                🎉 Lab Completed!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Congratulations! You've successfully completed all {questions.length} steps 
                of the {labTitle} lab.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Commands executed: {commandHistory.length}
                </div>
                <div className="text-sm text-gray-600">
                  Steps completed: {completedCount} / {questions.length}
                </div>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={resetLab}
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => window.location.href = '/labs'}
                >
                  Back to Labs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}