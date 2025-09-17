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
        if (filename === 'file1.txt' || filename === 'notes.txt') {
          output = 'Learning Linux commands'
        } else if (filename === 'file2.txt' || filename === 'config.conf') {
          output = 'Configuration file content'
        } else if (filename === 'server.log') {
          output = `ERROR: Connection failed
INFO: Server started
WARN: Low memory
ERROR: Database error
INFO: Request processed`
        } else if (filename === 'fruits.txt') {
          output = `apple
banana
cherry
apple`
        } else if (filename.includes('Dockerfile')) {
          output = `FROM alpine:latest
LABEL maintainer="student@skillpath.com"
WORKDIR /app
COPY . .
RUN apk add --no-cache curl
CMD ["echo", "Hello from Docker!"]`
        } else if (filename === 'docker-compose.yml') {
          output = `version: "3.8"
services:
  web:
    image: nginx:alpine
    ports:
      - "8082:80"
  db:
    image: postgres:13-alpine
    environment:
      POSTGRES_PASSWORD: mypassword`
        } else {
          output = `cat: ${filename}: No such file or directory`
        }
      } else if (command === 'clear') {
        term.clear()
        return
      } else if (command.startsWith('docker')) {
        if (command.includes('--version')) {
          output = 'Docker version 20.10.21, build baeda1f'
        } else if (command.includes('info')) {
          output = `Client:
 Context:    default
 Debug Mode: false

Server:
 Containers: 3
  Running: 2
  Paused: 0
  Stopped: 1
 Images: 15`
        } else if (command.includes('pull')) {
          output = 'Using default tag: latest\nlatest: Pulling from library/nginx\nPull complete'
        } else if (command.includes('images')) {
          output = `REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         latest    605c77e624dd   2 weeks ago    141MB
alpine        latest    c059bfaa849c   4 weeks ago    5.59MB`
        } else if (command.includes('ps')) {
          if (command.includes('-a')) {
            output = `CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
abc123def456   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   80/tcp    web-server
def456ghi789   alpine    "sleep 3600"             5 minutes ago   Exited (0)     -         test-container`
          } else {
            output = `CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS     NAMES
abc123def456   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   80/tcp    web-server`
          }
        } else if (command.includes('logs')) {
          output = '/docker-entrypoint.sh: Configuration complete; ready for start up'
        } else if (command.includes('build')) {
          output = `Sending build context to Docker daemon  2.048kB
Step 1/6 : FROM alpine:latest
 ---> c059bfaa849c
Successfully built abc123def456
Successfully tagged my-alpine-app:latest`
        } else if (command.includes('run')) {
          output = 'Container started successfully'
        } else {
          output = 'Docker command executed'
        }
      } else if (command.startsWith('kubectl')) {
        if (command.includes('version')) {
          output = `Client Version: version.Info{Major:"1", Minor:"28", GitVersion:"v1.28.2"}`
        } else if (command.includes('cluster-info')) {
          output = `Kubernetes control plane is running at https://kubernetes.docker.internal:6443
CoreDNS is running at https://kubernetes.docker.internal:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy`
        } else if (command.includes('get nodes')) {
          output = `NAME             STATUS   ROLES           AGE   VERSION
docker-desktop   Ready    control-plane   15d   v1.28.2`
        } else if (command.includes('get pods')) {
          output = `NAME                       READY   STATUS    RESTARTS   AGE
my-pod                     1/1     Running   0          2m
web-app-7d4b5c6f8b-abc12   1/1     Running   0          5m`
        } else if (command.includes('get deployments')) {
          output = `NAME      READY   UP-TO-DATE   AVAILABLE   AGE
web-app   3/3     3            3           10m`
        } else if (command.includes('get services')) {
          output = `NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1      <none>        443/TCP   15d
web-service  ClusterIP   10.96.1.100    <none>        80/TCP    5m`
        } else if (command.includes('describe')) {
          output = `Name:         my-pod
Namespace:    default
Priority:     0
Node:         docker-desktop/192.168.65.4
Start Time:   Wed, 17 Sep 2025 10:30:00 +0000
Status:       Running`
        } else {
          output = 'Kubernetes command executed'
        }
      } else if (command.startsWith('terraform')) {
        if (command.includes('version')) {
          output = 'Terraform v1.5.7'
        } else if (command.includes('init')) {
          output = `Initializing the backend...
Terraform has been successfully initialized!`
        } else if (command.includes('plan')) {
          output = `Plan: 3 to add, 0 to change, 0 to destroy.`
        } else if (command.includes('apply')) {
          output = `Apply complete! Resources: 3 added, 0 changed, 0 destroyed.`
        } else {
          output = 'Terraform command executed'
        }
      } else if (command.startsWith('ansible')) {
        if (command.includes('--version')) {
          output = 'ansible [core 2.15.5]'
        } else if (command.includes('playbook')) {
          output = `PLAY [all] *********************************************************************

TASK [Gathering Facts] *********************************************************
ok: [localhost]

PLAY RECAP *********************************************************************
localhost                  : ok=1    changed=0    unreachable=0    failed=0`
        } else {
          output = 'Ansible command executed'
        }
      } else if (command.startsWith('jenkins')) {
        output = 'Jenkins CLI command executed'
      } else if (command.startsWith('free')) {
        output = `              total        used        free      shared  buff/cache   available
Mem:        8054528     2048000     4096000      102400     1910528     5644800
Swap:       2097148           0     2097148`
      } else if (command.startsWith('df')) {
        output = `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        20G  8.5G   11G  45% /
tmpfs           4.0G     0  4.0G   0% /dev/shm`
      } else if (command === 'uptime') {
        output = ' 10:30:45 up 5 days,  2:15,  1 user,  load average: 0.15, 0.10, 0.05'
      } else if (command.startsWith('uname')) {
        output = 'Linux skillpath-lab 5.15.0-91-generic #101-Ubuntu SMP Tue Nov 14 13:30:08 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux'
      } else if (command.startsWith('ip addr')) {
        output = `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0`
      } else if (command.startsWith('ping')) {
        output = `PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=56 time=14.2 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=56 time=13.8 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=56 time=14.1 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=56 time=13.9 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3005ms`
      } else if (command === 'help') {
        output = `Available commands:

Linux Basics:
  ls [-la]       - List directory contents
  cd [dir]       - Change directory  
  pwd            - Print working directory
  mkdir <dir>    - Create directory
  touch <file>   - Create empty file
  cat <file>     - Display file contents
  echo <text>    - Display text
  cp <src> <dst> - Copy files
  mv <src> <dst> - Move/rename files
  chmod <perms>  - Change file permissions
  whoami         - Display current user
  date           - Display current date
  uptime         - Show system uptime
  free -h        - Show memory usage
  df -h          - Show disk usage
  ps aux         - List processes
  grep <pattern> - Search text patterns
  find <path>    - Find files
  tar            - Archive files
  ping <host>    - Test network connectivity
  ip addr show   - Show network interfaces

Docker Commands:
  docker --version    - Show Docker version
  docker info         - Show Docker system info
  docker pull <image> - Pull Docker image
  docker images       - List Docker images
  docker ps [-a]      - List containers
  docker run <image>  - Run container
  docker build        - Build image from Dockerfile
  docker logs <name>  - Show container logs

Kubernetes Commands:
  kubectl version     - Show kubectl version
  kubectl cluster-info - Show cluster info
  kubectl get <resource> - List resources
  kubectl describe <resource> - Describe resource
  kubectl apply -f <file> - Apply manifest
  kubectl delete <resource> - Delete resource

Other:
  terraform version   - Show Terraform version
  ansible --version   - Show Ansible version
  clear              - Clear terminal
  help               - Show this help message`
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