'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Trophy, 
  Star,
  Zap,
  Target,
  Flag,
  AlertCircle
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  validation?: {
    type: 'command' | 'file' | 'output'
    expected: string | string[]
  }
  completed: boolean
  points: number
}

interface ProgressTrackerProps {
  labId: string
  tasks: Task[]
  onTaskComplete?: (taskId: string) => void
  onLabComplete?: () => void
}

export function ProgressTracker({ labId, tasks, onTaskComplete, onLabComplete }: ProgressTrackerProps) {
  const [currentTasks, setCurrentTasks] = useState(tasks)
  const [showCelebration, setShowCelebration] = useState(false)
  const [achievements, setAchievements] = useState<string[]>([])

  const completedTasks = currentTasks.filter(t => t.completed).length
  const totalTasks = currentTasks.length
  const progress = (completedTasks / totalTasks) * 100
  const totalPoints = currentTasks.reduce((sum, task) => sum + (task.completed ? task.points : 0), 0)

  useEffect(() => {
    // Check for achievements
    if (completedTasks === 1 && !achievements.includes('first-task')) {
      setAchievements(prev => [...prev, 'first-task'])
      showAchievement('First Step! 🎯')
    }
    
    if (completedTasks === Math.floor(totalTasks / 2) && !achievements.includes('halfway')) {
      setAchievements(prev => [...prev, 'halfway'])
      showAchievement('Halfway There! 🌟')
    }
    
    if (completedTasks === totalTasks && !achievements.includes('complete')) {
      setAchievements(prev => [...prev, 'complete'])
      setShowCelebration(true)
      showAchievement('Lab Complete! 🏆')
      if (onLabComplete) {
        onLabComplete()
      }
    }
  }, [completedTasks, totalTasks])

  const showAchievement = (message: string) => {
    // In a real app, this would show a toast notification
    console.log('Achievement:', message)
  }

  const markTaskComplete = (taskId: string) => {
    setCurrentTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    )
    
    if (onTaskComplete) {
      onTaskComplete(taskId)
    }
  }

  const validateTask = async (task: Task) => {
    // In a real implementation, this would check against actual Docker output
    // For demo, we'll simulate validation
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.3) // 70% success rate for demo
      }, 1000)
    })
  }

  const getTaskIcon = (task: Task) => {
    if (task.completed) {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return <Circle className="w-5 h-5 text-gray-400" />
  }

  const getProgressColor = () => {
    if (progress === 100) return 'bg-green-500'
    if (progress >= 75) return 'bg-blue-500'
    if (progress >= 50) return 'bg-yellow-500'
    if (progress >= 25) return 'bg-orange-500'
    return 'bg-gray-400'
  }

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Lab Progress
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                {totalPoints} pts
              </Badge>
              <Badge variant={progress === 100 ? 'success' : 'secondary'}>
                {completedTasks}/{totalTasks} Tasks
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Achievement Badges */}
            {achievements.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {achievements.includes('first-task') && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    First Step
                  </Badge>
                )}
                {achievements.includes('halfway') && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Halfway Hero
                  </Badge>
                )}
                {achievements.includes('complete') && (
                  <Badge variant="success" className="flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    Lab Master
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Flag className="w-5 h-5" />
            Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentTasks.map((task, index) => (
              <div 
                key={task.id}
                className={`p-4 rounded-lg border transition-all ${
                  task.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getTaskIcon(task)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          Task {index + 1}: {task.title}
                          {task.completed && (
                            <Badge variant="success" className="text-xs">
                              +{task.points} pts
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      </div>
                      {!task.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markTaskComplete(task.id)}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                    
                    {task.validation && !task.completed && (
                      <div className="mt-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-gray-500">
                          Auto-validation available
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs"
                          onClick={async () => {
                            const isValid = await validateTask(task)
                            if (isValid) {
                              markTaskComplete(task.id)
                            } else {
                              // Show error in real implementation
                              console.log('Validation failed')
                            }
                          }}
                        >
                          Validate
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md animate-bounce">
            <CardContent className="pt-6 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
              <p className="text-gray-600 mb-4">
                You've completed all tasks in this lab!
              </p>
              <p className="text-lg font-medium mb-6">
                Total Points Earned: {totalPoints}
              </p>
              <Button onClick={() => setShowCelebration(false)}>
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}