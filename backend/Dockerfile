FROM node:18-alpine

# Install Azure CLI and required dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    gcc \
    musl-dev \
    python3-dev \
    libffi-dev \
    openssl-dev \
    cargo \
    bash \
    curl

# Install Azure CLI using --break-system-packages flag to bypass externally managed environment
RUN pip3 install --no-cache-dir --break-system-packages azure-cli

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
