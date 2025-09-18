'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Play, 
  Square, 
  RefreshCw, 
  Terminal, 
  Cpu, 
  HardDrive,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

interface EnvironmentStatus {
  status: 'stopped' | 'starting' | 'running' | 'stopping' | 'error'
  containerId?: string
  startTime?: Date
  resources: {
    cpu: number
    memory: number
    disk: number
  }
}

interface EnvironmentManagerProps {
  labId: string
  environment: {
    type: string
    image: string
    ports?: number[]
    resources?: {
      cpu: string
      memory: string
    }
  }
  onStatusChange?: (status: EnvironmentStatus) => void
}

export function EnvironmentManager({ labId, environment, onStatusChange }: EnvironmentManagerProps) {
  const [status, setStatus] = useState<EnvironmentStatus>({
    status: 'stopped',
    resources: { cpu: 0, memory: 0, disk: 0 }
  })
  const [logs, setLogs] = useState<string[]>([])
  const [timeElapsed, setTimeElapsed] = useState(0)

  // Simulate resource usage
  useEffect(() => {
    if (status.status === 'running') {
      const interval = setInterval(() => {
        setStatus(prev => ({
          ...prev,
          resources: {
            cpu: Math.random() * 30 + 10,
            memory: Math.random() * 20 + 40,
            disk: Math.random() * 5 + 15
          }
        }))
        setTimeElapsed(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [status.status])

  const startEnvironment = async () => {
    setStatus(prev => ({ ...prev, status: 'starting' }))
    addLog('Starting Docker container...')
    
    // Simulate startup process
    setTimeout(() => {
      addLog(`Pulling image ${environment.image}...`)
    }, 500)
    
    setTimeout(() => {
      addLog('Creating container...')
    }, 1500)
    
    setTimeout(() => {
      addLog('Starting container...')
      const containerId = Math.random().toString(36).substring(7)
      setStatus({
        status: 'running',
        containerId,
        startTime: new Date(),
        resources: { cpu: 15, memory: 45, disk: 20 }
      })
      addLog(`Container ${containerId} started successfully`)
      if (environment.ports) {
        addLog(`Exposed ports: ${environment.ports.join(', ')}`)
      }
      if (onStatusChange) {
        onStatusChange({
          status: 'running',
          containerId,
          startTime: new Date(),
          resources: { cpu: 15, memory: 45, disk: 20 }
        })
      }
    }, 3000)
  }

  const stopEnvironment = async () => {
    setStatus(prev => ({ ...prev, status: 'stopping' }))
    addLog('Stopping container...')
    
    setTimeout(() => {
      addLog('Container stopped')
      setStatus({
        status: 'stopped',
        resources: { cpu: 0, memory: 0, disk: 0 }
      })
      setTimeElapsed(0)
      if (onStatusChange) {
        onStatusChange({
          status: 'stopped',
          resources: { cpu: 0, memory: 0, disk: 0 }
        })
      }
    }, 1500)
  }

  const restartEnvironment = async () => {
    await stopEnvironment()
    setTimeout(() => {
      startEnvironment()
    }, 2000)
  }

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, `[${timestamp}] ${message}`])
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusIcon = () => {
    switch (status.status) {
      case 'running':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'stopped':
        return <Square className="w-5 h-5 text-gray-500" />
      case 'starting':
      case 'stopping':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (status.status) {
      case 'running':
        return 'success'
      case 'stopped':
        return 'secondary'
      case 'starting':
      case 'stopping':
        return 'warning'
      case 'error':
        return 'destructive'
    }
  }

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Environment Status</CardTitle>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <Badge variant={getStatusColor() as any}>
                {status.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Environment Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{environment.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Image:</span>
                <span className="ml-2 font-medium">{environment.image}</span>
              </div>
              {status.containerId && (
                <div>
                  <span className="text-gray-600">Container ID:</span>
                  <span className="ml-2 font-mono text-xs">{status.containerId}</span>
                </div>
              )}
              {status.status === 'running' && (
                <div>
                  <span className="text-gray-600">Uptime:</span>
                  <span className="ml-2 font-medium">{formatTime(timeElapsed)}</span>
                </div>
              )}
            </div>

            {/* Resource Usage */}
            {status.status === 'running' && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Resource Usage</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 w-16">CPU</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${status.resources.cpu}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {status.resources.cpu.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600 w-16">Memory</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${status.resources.memory}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {status.resources.memory.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600 w-16">Disk</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${status.resources.disk}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {status.resources.disk.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-2">
              {status.status === 'stopped' && (
                <Button 
                  onClick={startEnvironment}
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Start Environment
                </Button>
              )}
              
              {status.status === 'running' && (
                <>
                  <Button 
                    onClick={stopEnvironment}
                    variant="destructive"
                    className="flex-1"
                  >
                    <Square className="w-4 h-4 mr-1" />
                    Stop
                  </Button>
                  <Button 
                    onClick={restartEnvironment}
                    variant="outline"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Restart
                  </Button>
                </>
              )}
              
              {(status.status === 'starting' || status.status === 'stopping') && (
                <Button disabled className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  {status.status === 'starting' ? 'Starting...' : 'Stopping...'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Environment Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs h-32 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">No logs yet. Start the environment to see logs.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">{log}</div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}