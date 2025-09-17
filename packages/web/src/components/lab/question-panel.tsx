'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Lightbulb, 
  Target,
  BookOpen,
  Terminal,
  AlertCircle
} from 'lucide-react'

export interface Question {
  id: string
  title: string
  description: string
  instructions: string[]
  hints: string[]
  expectedCommands?: string[]
  validationRules?: {
    type: 'command' | 'output' | 'file_exists'
    pattern: string
    description: string
  }[]
  completed: boolean
}

interface QuestionPanelProps {
  questions: Question[]
  currentQuestionIndex: number
  onQuestionChange: (index: number) => void
  onQuestionComplete: (questionId: string) => void
  lastCommand?: string
  lastOutput?: string
  className?: string
}

export function QuestionPanel({
  questions,
  currentQuestionIndex,
  onQuestionChange,
  onQuestionComplete,
  lastCommand = '',
  lastOutput = '',
  className = ''
}: QuestionPanelProps) {
  const [showHints, setShowHints] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [validationStatus, setValidationStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle')

  const currentQuestion = questions[currentQuestionIndex]
  const completedCount = questions.filter(q => q.completed).length
  const progressPercentage = (completedCount / questions.length) * 100

  // Auto-validate when command or output changes
  useEffect(() => {
    if (currentQuestion && !currentQuestion.completed && (lastCommand || lastOutput)) {
      validateQuestion()
    }
  }, [lastCommand, lastOutput, currentQuestion])

  const validateQuestion = async () => {
    if (!currentQuestion || !currentQuestion.validationRules) return

    setValidationStatus('checking')
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500))

    let isValid = true

    for (const rule of currentQuestion.validationRules) {
      switch (rule.type) {
        case 'command':
          if (!new RegExp(rule.pattern, 'i').test(lastCommand)) {
            isValid = false
          }
          break
        case 'output':
          if (!new RegExp(rule.pattern, 'i').test(lastOutput)) {
            isValid = false
          }
          break
        case 'file_exists':
          // Mock file existence check
          if (lastCommand.includes('touch') || lastCommand.includes('mkdir')) {
            // Assume file/directory was created
          } else {
            isValid = false
          }
          break
      }
    }

    if (isValid) {
      setValidationStatus('success')
      onQuestionComplete(currentQuestion.id)
      
      // Auto-advance to next question after a delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          onQuestionChange(currentQuestionIndex + 1)
        }
        setValidationStatus('idle')
      }, 1500)
    } else {
      setValidationStatus('error')
      setTimeout(() => setValidationStatus('idle'), 2000)
    }
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      onQuestionChange(currentQuestionIndex + 1)
      setShowHints(false)
      setCurrentHintIndex(0)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      onQuestionChange(currentQuestionIndex - 1)
      setShowHints(false)
      setCurrentHintIndex(0)
    }
  }

  const toggleHints = () => {
    setShowHints(!showHints)
    setCurrentHintIndex(0)
  }

  const nextHint = () => {
    if (currentHintIndex < currentQuestion.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
  }

  const getValidationIcon = () => {
    switch (validationStatus) {
      case 'checking':
        return <div className="w-5 h-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header with Progress */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Interactive Lab</h2>
          <Badge variant="outline">
            {completedCount} / {questions.length} completed
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>

      {/* Question Navigation */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onQuestionChange(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : question.completed
                  ? 'bg-green-100 text-green-700 border-2 border-green-200'
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200'
              }`}
            >
              {question.completed ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
              <span>Step {index + 1}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="flex-1 overflow-y-auto p-6">
        {currentQuestion ? (
          <div className="space-y-6">
            {/* Question Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Step {currentQuestionIndex + 1}: {currentQuestion.title}
                </h3>
                {getValidationIcon()}
              </div>
              
              <p className="text-gray-600">{currentQuestion.description}</p>
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{instruction}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Expected Commands */}
            {currentQuestion.expectedCommands && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Terminal className="w-5 h-5" />
                    Expected Commands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                    {currentQuestion.expectedCommands.map((command, index) => (
                      <div key={index} className="mb-1">
                        <span className="text-green-400">$ </span>
                        {command}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hints */}
            {currentQuestion.hints.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightbulb className="w-5 h-5" />
                      Hints
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleHints}
                    >
                      {showHints ? 'Hide' : 'Show'} Hints
                    </Button>
                  </div>
                </CardHeader>
                {showHints && (
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Hint {currentHintIndex + 1} of {currentQuestion.hints.length}</span>
                        {currentHintIndex < currentQuestion.hints.length - 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={nextHint}
                          >
                            Next Hint
                          </Button>
                        )}
                      </div>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                          {currentQuestion.hints[currentHintIndex]}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )}

            {/* Validation Status */}
            {validationStatus !== 'idle' && (
              <Card className={`border-2 ${
                validationStatus === 'success' ? 'border-green-200 bg-green-50' :
                validationStatus === 'error' ? 'border-red-200 bg-red-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    {getValidationIcon()}
                    <span className={`font-medium ${
                      validationStatus === 'success' ? 'text-green-800' :
                      validationStatus === 'error' ? 'text-red-800' :
                      'text-blue-800'
                    }`}>
                      {validationStatus === 'checking' && 'Checking your solution...'}
                      {validationStatus === 'success' && 'Great job! Moving to next step...'}
                      {validationStatus === 'error' && 'Not quite right. Try again or check the hints.'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>No questions available</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            {currentQuestionIndex + 1} of {questions.length}
          </span>
          
          <Button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}