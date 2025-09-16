# Linux Basics Lab Environment
FROM ubuntu:20.04

# Set non-interactive mode for apt
ENV DEBIAN_FRONTEND=noninteractive

# Install essential packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    vim \
    nano \
    git \
    htop \
    tree \
    unzip \
    zip \
    jq \
    net-tools \
    iputils-ping \
    traceroute \
    telnet \
    openssh-client \
    sudo \
    man-db \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -s /bin/bash labuser && \
    echo "labuser:labuser" | chpasswd && \
    adduser labuser sudo && \
    echo "labuser ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set up the lab environment
WORKDIR /home/labuser
USER labuser

# Create initial directory structure
RUN mkdir -p ~/Documents ~/Downloads ~/Projects

# Add some sample files for practice
RUN echo "Welcome to the Linux Basics Lab!" > ~/README.txt && \
    echo -e "apple\nbanana\ncherry\norange\napple" > ~/fruits.txt && \
    echo -e "John Doe,Software Engineer,30\nJane Smith,DevOps Engineer,28\nBob Johnson,System Administrator,35" > ~/employees.csv

# Set up bash aliases for convenience
RUN echo 'alias ll="ls -la"' >> ~/.bashrc && \
    echo 'alias la="ls -A"' >> ~/.bashrc && \
    echo 'alias l="ls -CF"' >> ~/.bashrc && \
    echo 'export PS1="\u@linux-lab:\w$ "' >> ~/.bashrc

# Add a welcome message
RUN echo 'echo "🐧 Welcome to the Linux Basics Lab Environment!"' >> ~/.bashrc && \
    echo 'echo "📚 Type '\''ls'\'' to see available files"' >> ~/.bashrc && \
    echo 'echo "❓ Use '\''man command'\'' to get help for any command"' >> ~/.bashrc

# Expose SSH port (optional)
EXPOSE 22

# Start with bash shell
CMD ["/bin/bash"]