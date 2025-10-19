# P4P System Setup Guide

This guide will help you set up and run the complete project with all backend services and the frontend.

## Table of Contents

1. [Azure Account and Subscription Setup](#azure-account-and-subscription-setup)
2. [Azure AI Foundry Setup](#azure-ai-foundry-setup)
3. [Prerequisites](#prerequisites)
4. [Quick Start](#quick-start)
5. [Service Architecture](#service-architecture)
6. [Troubleshooting](#troubleshooting)

## Azure Account and Subscription Setup

If you don't already have an Azure account, follow these steps to create one and set up your subscription.

### Step 1: Create a Microsoft Account (if needed)

1. **Visit Microsoft Account Creation Page**
   - Go to [https://account.microsoft.com/](https://account.microsoft.com/)
   - Click **"Create a Microsoft account"** or **"Sign up"**

2. **Choose Your Account Type**
   - Use an existing email address, or
   - Create a new Outlook.com email address

3. **Complete Registration**
   - Fill in your personal information
   - Verify your email/phone number
   - Create a strong password

### Step 2: Create an Azure Account

1. **Navigate to Azure Portal**
   - Go to [https://azure.microsoft.com/free/](https://azure.microsoft.com/free/)
   - Click **"Start free"** or **"Free account"**

2. **Sign In with Microsoft Account**
   - Use the Microsoft account you created or already have
   - Click **"Sign in"**

3. **Complete the Azure Account Setup**
   - Fill in details until you have an Azure subscription

4. **Wait for Account Creation**
   - Azure will create your account and subscription

### Step 3: Navigate Azure Portal

1. **Access the Azure Portal**
   - Go to [https://portal.azure.com/](https://portal.azure.com/)
   - Sign in with your Microsoft account
   - You'll see the Azure Portal dashboard

2. **Explore Key Sections**
   - **Home**: Your dashboard and recent resources
   - **All services**: Complete list of Azure services
   - **Cost Management + Billing**: Monitor your spending
   - **Subscriptions**: View and manage your subscriptions

### Step 4: Create a Resource Group

Resource groups help organize your Azure resources.

1. **Navigate to Resource Groups**
   - In Azure Portal, search for "Resource groups" in the top search bar
   - Click **"+ Create"** or **"+ Add"**

2. **Configure Resource Group**
   - **Subscription**: Select your subscription
   - **Resource group name**: Enter a descriptive name (e.g., `p4p-interview-rg`)
   - **Region**: Choose a region close to you:
     - `East US`, `East US 2`
     - `West US`, `West US 2`
     - `West Europe`
     - `Southeast Asia`
     - `Australia East`

3. **Review and Create**
   - Click **"Review + create"**
   - Click **"Create"**
   - Wait for the resource group to be created

### Step 5: Set Up Cost Management and Alerts

Protect yourself from unexpected charges:

1. **Create a Budget Alert**
   - In Azure Portal, go to **"Cost Management + Billing"**
   - Select your subscription
   - Click **"Budgets"** in the left menu
   - Click **"+ Add"**

2. **Configure Budget**
   - **Name**: e.g., "Monthly Development Budget"
   - **Amount**: Set a reasonable limit (e.g., $50)
   - **Time period**: Monthly
   - **Alert conditions**: Set alerts at 50%, 75%, 90%, and 100%
   - **Alert recipients**: Add your email

3. **Enable Cost Alerts**
   - Go to **"Cost alerts"** in Cost Management
   - Enable alerts for budget thresholds
   - Configure email notifications

### Step 6: Install Azure CLI

The Azure CLI is required for authentication and resource management.

#### macOS:
```bash
# Using Homebrew
brew update && brew install azure-cli

# Verify installation
az --version
```

#### Ubuntu/Debian Linux:
```bash
# One-line install
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Verify installation
az --version
```

#### Windows:
```powershell
# Download and run the MSI installer from:
# https://aka.ms/installazurecliwindows

# Or using Windows Package Manager (winget)
winget install -e --id Microsoft.AzureCLI

# Verify installation
az --version
```

#### Alternative: Docker Container
```bash
# Run Azure CLI in Docker
docker run -it mcr.microsoft.com/azure-cli

# Or add to your project's docker-compose.yml if needed
```

### Step 7: Authenticate with Azure CLI

1. **Login to Azure**
   ```bash
   az login
   ```
   - This will open a browser window
   - Sign in with your Microsoft account
   - Close the browser after successful authentication

2. **Verify Authentication**
   ```bash
   # View your account details
   az account show
   
   # List all subscriptions
   az account list --output table
   ```

3. **Set Default Subscription (if you have multiple)**
   ```bash
   az account set --subscription "Your Subscription Name"
   ```

### Step 9: Verify Your Setup

Run these commands to ensure everything is configured:

```bash
# Check Azure CLI version
az --version

# View current subscription
az account show --output table

# List available locations
az account list-locations --output table

# Check available resource providers
az provider list --query "[?registrationState=='Registered'].namespace" --output table
```

### Common Issues and Solutions

#### Issue: "az command not found"
**Solution**: Azure CLI is not installed or not in PATH
- Reinstall Azure CLI using instructions above
- Restart your terminal
- Check PATH: `echo $PATH` (macOS/Linux) or `echo %PATH%` (Windows)

#### Issue: "No subscriptions found"
**Solution**: Account not properly set up
- Complete the Azure account creation process
- Verify billing information is added
- Wait a few minutes and try again: `az account list`

#### Issue: "Subscription is disabled"
**Solution**: Free trial expired or billing issue
- Check subscription status in Azure Portal
- Add payment method if free trial expired
- Contact Azure support if needed

#### Issue: Browser doesn't open for `az login`
**Solution**: Use device code authentication
```bash
az login --use-device-code
```
- Follow the instructions to enter the code at https://microsoft.com/devicelogin

### Important: Keep Your Credentials Safe

⚠️ **Security Best Practices**:

1. **Never commit credentials to Git**
   - The `.env` file is in `.gitignore`
   - Always use `.env` for secrets, never hardcode

2. **Rotate keys regularly**
   - Generate new API keys every 90 days
   - Use Azure Key Vault for production

3. **Use role-based access control (RBAC)**
   - Create service principals with minimal permissions
   - Don't use owner-level credentials in applications

4. **Monitor usage and access**
   - Regularly check Azure activity logs
   - Set up security alerts in Azure Security Center

5. **Enable Multi-Factor Authentication (MFA)**
   - Go to Azure Portal → Azure Active Directory → Security → MFA
   - Enable MFA for your account

## Azure AI Foundry Setup

Now that you have an Azure subscription, you can set up Azure AI Foundry for the intelligent analysis features.

### Step 1: Create Azure AI Foundry Instance (Azure Portal Method)

You can create an Azure AI Foundry instance either through the Azure Portal or the AI Foundry portal. This method uses the Azure Portal for more control.

1. **Navigate to Azure Portal**
   - Go to [https://portal.azure.com/](https://portal.azure.com/)
   - Sign in with your Microsoft account

2. **Create Azure AI Services Resource**
   - In the search bar at the top, type **"Azure AI services"**
   - Click on **"Azure AI services"** in the results
   - Click **"+ Create"** or **"+ Add"**

3. **Configure Basic Settings**
   - **Subscription**: Select your Azure subscription
   - **Resource group**: Select the resource group you created earlier (e.g., `p4p-interview-rg`)
   - **Region**: Choose a region with AI services support:
     - Recommended: `East US 2`, `West US 2`, `West Europe`, `Sweden Central`
   - **Name**: Enter a unique name (e.g., `p4p-ai-services`)
   - **Pricing tier**: Select based on your needs:
     - **Free (F0)**: Limited requests, good for testing (if available)
     - **Standard (S0)**: Pay-as-you-go, recommended for development
     - **S1**: Higher tier for production workloads

4. **Review and Create**
   - Click **"Review + create"**
   - Verify all settings are correct
   - Click **"Create"**
   - Wait 2-3 minutes for deployment to complete

5. **Verify Deployment**
   - Once deployment is complete, click **"Go to resource"**
   - You should see your Azure AI Services resource dashboard

### Step 2: Access Azure AI Foundry Studio

1. **Navigate to Azure AI Foundry Portal**
   - Go to [https://ai.azure.com/](https://ai.azure.com/)
   - Sign in with your Microsoft account (the one linked to Azure)

2. **Accept Terms and Conditions**
   - If this is your first time, you may need to accept terms
   - Review and accept the Azure AI Foundry terms of service

3. **Link Your Azure Subscription**
   - AI Foundry will detect your Azure subscriptions
   - Ensure the subscription containing your AI Services resource is selected

### Step 3: Create an Azure AI Hub

1. **Create a New Hub**
   - In AI Foundry, click **"All hubs"** in the left navigation
   - Click **"+ New hub"** or **"+ Create hub"**

2. **Configure Hub Settings**
   - **Hub name**: Choose a descriptive name (e.g., `p4p-interview-hub`)
   - **Subscription**: Select your Azure subscription
   - **Resource group**: Select the resource group you created earlier (e.g., `p4p-interview-rg`)
   - **Location**: Choose the same region as your Azure AI Services resource
     - Recommended: `East US 2`, `West US 2`, or `West Europe` for best AI model availability
   - **Connect Azure AI Services**: 
     - Select **"Use existing"** and choose the AI Services resource you created
     - Or select **"Create new"** to create a new one automatically
   - **Connect Azure AI Search**: Optional, can skip for basic setup
   - **Storage account**: Will be created automatically or select an existing one

3. **Configure Additional Resources (Optional)**
   - **Key Vault**: For storing secrets securely (recommended for production)
   - **Application Insights**: For monitoring and logging
   - **Container Registry**: For custom container deployments

4. **Review and Create**
   - Review your configuration
   - Ensure all regions match for optimal performance
   - Click **"Create"** or **"Next: Review + create"**
   - Wait 3-5 minutes for the hub to be created

5. **Verify Hub Creation**
   - Once created, you'll see your hub in the **"All hubs"** list
   - Click on the hub name to view its details
   - Note the hub's resource group and location for reference

### Step 4: Create an Azure AI Project

1. **Create a New Project**
   - Once your hub is ready, click **"+ New project"** or **"Create project"**
   - Alternatively, from your hub page, click **"+ New project"**
   
2. **Configure Project Settings**
   - **Project name**: e.g., `p4p-interview-analyzer`
   - **Hub**: Select the hub you just created
   - **Description** (Optional): e.g., "Interview response analysis and feedback system"
   - Click **"Create"**

3. **Wait for Project Creation**
   - This typically takes 1-2 minutes
   - You'll be redirected to your project dashboard
   - The project inherits all resources from the hub (AI Services, Storage, etc.)

4. **Explore Project Dashboard**
   - **Overview**: View project details and quick actions
   - **Playgrounds**: Test models interactively
   - **Deployments**: Manage model deployments
   - **Tools**: Access various AI capabilities
   - **Settings**: Configuration and credentials

### Step 5: Get Your Endpoint and API Key

1. **Find Your Project Settings**
   - In your project, look for **"Settings"** or the gear icon (⚙️)
   - Or click **"Overview"** then look for connection information

2. **Copy Your Endpoint**
   - Look for **"Project endpoint"** or **"API endpoint"**
   - Format: `https://<your-ai-hub-name>.<region>.api.azureml.ms/discovery/workspaces/<workspace-id>`
   - Copy the entire URL
   - Save it for `AZURE_AI_FOUNDRY_ENDPOINT` in your `.env` file

3. **Get Your API Key (Method 1: AI Foundry Studio)**
   - In your project Settings, find **"Keys and endpoint"** section
   - You'll see **"Primary key"** and **"Secondary key"**
   - Copy the **Primary key**
   - Save it for `AZURE_AI_FOUNDRY_API_KEY` in your `.env` file

4. **Get Your API Key (Method 2: Azure Portal)**
   - Go to [Azure Portal](https://portal.azure.com)
   - Navigate to your resource group (e.g., `p4p-interview-rg`)
   - Find your Azure AI Services resource
     - It may be named like your hub or `p4p-ai-services`
   - Click on the resource
   - In the left menu, click **"Keys and Endpoint"** under Resource Management
   - You'll see:
     - **Endpoint**: Your API endpoint URL
     - **KEY 1**: Your primary API key
     - **KEY 2**: Your secondary API key (backup)
   - Copy **KEY 1**
   - Save it to your `.env` file

5. **Verify Your Credentials**
   ```bash
   # Test your connection (requires curl)
   curl -X GET "YOUR_ENDPOINT" \
     -H "api-key: YOUR_API_KEY"
   ```

### Step 6: Deploy Required AI Models

Before creating agents, ensure you have the required models deployed in your project.

1. **Navigate to Deployments**
   - In your Azure AI Foundry project, click **"Deployments"** in the left menu
   - Or go to **"Model catalog"** → **"My deployments"**

2. **Check Existing Deployments**
   - See if `gpt-4o`, `gpt-4`, `gpt-4-mini` or `gpt-3.5-turbo` are already deployed
   - If you have deployments, note their names (you'll need them for agents)

3. **Deploy Models (if needed)**
   - Click **"+ Create deployment"** or **"+ Deploy model"**
   - **Select model**: Choose from available models:
     - **gpt-4o**: Most capable, best for complex analysis
     - **gpt-4**: Very capable, good balance
     - **gpt-4-mini**: Cost-effective, faster, sufficient for most tasks
     - **gpt-3.5-turbo**: Cheapest, fastest, good for simple tasks
   - **Deployment name**: e.g., `gpt-4o-deployment` or `gpt-4-mini`
   - **Model version**: Select latest available
   - **Deployment type**: Standard
   - **Rate limit (TPM)**: Start with default (adjust based on usage)
   - Click **"Deploy"**
   - Wait 1-2 minutes for deployment to complete

4. **Deploy Multiple Models (Recommended)**
   - Deploy at least 2 different models for flexibility:
     - `gpt-4o-deployment` or `gpt-4-mini` for complex tasks
     - `gpt-35-turbo-deployment` for simpler tasks (cost savings)

5. **Note Your Deployment Names**
   - Write down the exact deployment names
   - You'll use these names when configuring agents
   - Example: `gpt-4-mini`, `gpt-4o-deployment`, `gpt-35-turbo`

### Step 7: Create AI Agents

You need to create 8 AI agents for different analysis tasks. The prompts are already prepared in the `agent-prompts/` directory.

#### Agent Creation Process:

For each of the following agents, follow these steps:

1. **Navigate to Agents**
   - In Azure AI Foundry project, click **"Agents"** or **"Assistants"** in the left menu
   - You may find this under **"Tools"**, **"Build"**, or in the main navigation
   - Click **"+ Create"** or **"+ New agent"** or **"+ New assistant"**

2. **Configure Agent Settings**
   - **Name**: Use a descriptive name from the table below
   - **Instructions/System Message**: 
     - Open the corresponding `.txt` file in `agent-prompts/` directory
     - Copy the entire content
     - Paste it into the Instructions or System Message field
   - **Deployment**: Select one of your deployed models:
     - For most agents: Use `gpt-4-mini` (balanced performance/cost)
     - For complex analysis: Use `gpt-4o-deployment` if available
     - For simple tasks: Use `gpt-35-turbo-deployment`
   - **Parameters**:
     - **Temperature**: `0.7` (balanced creativity and consistency)
     - **Max response tokens**: `2000-4000` (adjust based on agent needs)
     - **Top P**: `0.95` (default, usually works well)
     - **Frequency penalty**: `0` (default)
     - **Presence penalty**: `0` (default)
   - **Tools/Functions**: Leave empty unless you need code interpreter or file search
   - **Files**: Not needed for this project

3. **Create and Save Agent**
   - Click **"Create"** or **"Save"**
   - Wait for agent creation (usually instant)
   - You'll see the agent in your agents list

4. **Copy Agent ID**
   - Click on the newly created agent to view details
   - Find and copy the **Agent ID** or **Assistant ID**
   - Format: `asst_xxxxxxxxxxxxxxxxxxxx` (starts with "asst_")
   - Save it to your `.env` file with the corresponding environment variable name

#### Required Agents:

| Agent Purpose | Prompt File | Environment Variable | Recommended Model |
|---------------|-------------|---------------------|-------------------|
| Audio Analysis | `response-audio-analysis.txt` | `AZURE_AI_FOUNDRY_AUDIO_ANALYSIS_AGENT_ID` | gpt-4o |
| Content Analysis | `response-content-analysis.txt` | `AZURE_AI_FOUNDRY_RESPONSE_CONTENT_ANALYSIS_AGENT_ID` | gpt-4o |
| Sentiment Analysis | `response-sentiment-analysis.txt` | `AZURE_AI_FOUNDRY_RESPONSE_SENTIMENT_ANALYSIS_AGENT_ID` | gpt-4 |
| Keyword Analysis | `response-keyword-analysis.txt` | `AZURE_AI_FOUNDRY_KEYWORD_ANALYSIS_AGENT_ID` | gpt-4 |
| Keyword Generator | `keyword-generator.txt` | `AZURE_AI_FOUNDRY_JOB_DESCRIPTION_KEYWORDS_GENERATION_AGENT_ID` | gpt-3.5-turbo |
| Video Analysis | `response-video-analysis.txt` | `AZURE_AI_FOUNDRY_VIDEO_ANALYSIS_AGENT_ID` | gpt-4 |
| Feedback Summariser | `feedback-summariser.txt` | `AZURE_AI_FOUNDRY_FEEDBACK_SUMMARISER_AGENT_ID` | gpt-4o |
| Job Summary Converter | `job-summary-conversion.txt` | `AZURE_AI_FOUNDRY_JOB_SUMMARY_CONVERSION_AGENT_ID` | gpt-3.5-turbo |

#### Example: Creating the Audio Analysis Agent

```bash
# 1. Open agent-prompts/response-audio-analysis.txt
# 2. Copy the entire content
# 3. In Azure AI Foundry:
#    - Click "Create Agent"
#    - Name: "Audio Analysis Agent"
#    - Paste the prompt in "Instructions"
#    - Model: gpt-4o
#    - Temperature: 0.7
#    - Max tokens: 3000
#    - Click "Create"
# 4. Copy the Agent ID (e.g., asst_abc123xyz789)
# 5. Add to .env:
#    AZURE_AI_FOUNDRY_AUDIO_ANALYSIS_AGENT_ID=asst_abc123xyz789
```

### Step 6: Configure Environment Variables

1. **Create the `.env` file**
   ```bash
   # In the project root directory
   cp .env.example .env
   ```

2. **Edit the `.env` file**
   ```bash
   # Use your preferred editor
   nano .env
   # or
   code .env
   # or
   vim .env
   ```

3. **Fill in your Azure credentials**
   ```bash
   # Azure AI Foundry Connection
   AZURE_AI_FOUNDRY_ENDPOINT=https://your-hub-name.region.api.azureml.ms/discovery/workspaces/workspace-id
   AZURE_AI_FOUNDRY_API_KEY=your_primary_key_here
   
   # AI Agent IDs (replace with your actual agent IDs)
   AZURE_AI_FOUNDRY_AUDIO_ANALYSIS_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_RESPONSE_CONTENT_ANALYSIS_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_RESPONSE_SENTIMENT_ANALYSIS_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_JOB_DESCRIPTION_KEYWORDS_GENERATION_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_KEYWORD_ANALYSIS_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_VIDEO_ANALYSIS_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_FEEDBACK_SUMMARISER_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   AZURE_AI_FOUNDRY_JOB_SUMMARY_CONVERSION_AGENT_ID=asst_xxxxxxxxxxxxxxxxxxxx
   ```

4. **Verify the file**
   ```bash
   # Check that .env is in project root
   ls -la .env
   
   # Verify it's not tracked by git
   git status
   # .env should NOT appear in the list
   ```

### Step 7: Test Your Azure AI Setup

1. **Verify Azure CLI Authentication**
   ```bash
   az login
   az account show
   ```

2. **Test API Connection** (optional)
   ```bash
   # You can test the endpoint with curl
   curl -X GET "YOUR_ENDPOINT_URL" \
     -H "api-key: YOUR_API_KEY"
   ```

3. **Start the Docker Services**
   ```bash
   # Build base image
   docker build -f Dockerfile.base -t base-image:latest .
   
   # Start all services
   docker compose up -d
   
   # Check services are running
   docker compose ps
   ```

4. **Run Agent Tests**
   ```bash
   # Test Azure AI agents
   cd tests
   python test-services.py --service agents
   ```

### Cost Estimation and Management

#### Expected Costs for Development:

Using the **$200 free credit**, you can expect:

- **GPT-4o**: ~$0.005-0.015 per 1K tokens (input) | ~$0.015-0.045 per 1K tokens (output)
- **GPT-4**: ~$0.03-0.06 per 1K tokens
- **GPT-3.5-turbo**: ~$0.0005-0.0015 per 1K tokens

**Per interview analysis**:
- Input: ~2,000-3,000 tokens
- Output: ~1,500-2,500 tokens
- Cost per analysis: ~$0.15-0.50 (using GPT-4/4o mix)

**Free credit coverage**:
- $200 credit ≈ 400-1,300 interview analyses
- Should last throughout development and testing phase

#### Monitor Your Spending:

1. **Azure Portal Dashboard**
   - Go to **"Cost Management + Billing"**
   - View **"Cost analysis"**
   - Check daily spending trends

2. **Set Up Alerts**
   - Create budgets as described in Step 6
   - Get email notifications at spending thresholds

3. **Optimize Costs**
   - Use GPT-3.5-turbo for simpler agents (keyword generator, job summary)
   - Use GPT-4o/GPT-4 for complex analysis (content, sentiment, feedback)
   - Implement caching for repeated prompts
   - Set reasonable max token limits

### Troubleshooting Azure AI Foundry

#### Issue: "Cannot find AI Foundry in Azure Portal"

**Solution**: 
- AI Foundry is accessed via [ai.azure.com](https://ai.azure.com), not Azure Portal
- Make sure you have an active Azure subscription
- Clear browser cache and try again

#### Issue: "No models available" or "Model not found"

**Solution**:
- Some regions have limited model availability
- Try creating your hub in: `East US 2`, `West US 2`, or `West Europe`
- Check [Azure OpenAI model availability](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)

#### Issue: "Quota exceeded" or "Rate limit reached"

**Solution**:
- You've hit your subscription's rate limits
- Wait a few minutes and retry
- Request quota increase in Azure Portal → Azure OpenAI → Quotas
- Consider distributing load across multiple regions

#### Issue: "Agent not responding" or "Timeout errors"

**Solution**:
- Check agent is properly deployed
- Verify endpoint and API key are correct
- Increase timeout settings in your application
- Check Azure service health status

#### Issue: "Invalid agent ID" or "Agent not found"

**Solution**:
- Verify agent ID format: `asst_` followed by characters
- Make sure agent is created and active in AI Foundry
- Check you're using agent ID, not deployment ID
- Recreate agent if necessary

## Prerequisites

- Docker and Docker Compose installed
- Node.js (for local development)
- Python 3.8+ (for running test scripts)
- Azure CLI installed and authenticated (for backend Azure AI services)

## Quick Start

### 1. Azure CLI Authentication Setup

Before starting the services, ensure you're authenticated with Azure CLI:

>Note: For Windows users, you may need to run the Azure CLI commands to login within the Docker container to ensure the backend can access Azure services.
```bash
docker exec -it p4p-backend-1 //bin/sh
# Then sign in to Azure with the commands below
```

```bash
# Install Azure CLI (if not already installed)
# macOS: brew install azure-cli
# Ubuntu: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify authentication
az account show
```

### 2. Environment Configuration (Backend)

Create a `.env` file in the **root directory**. Match the env file described in the `./backend` directory

**Note**: The .env file should be in the project root directory, not in the backend/ directory. Docker Compose will automatically read this file and pass the variables to the backend container.

### 3. Start All Services

```bash
# Build the base image - only need to do this once
docker build -f Dockerfile.base -t base-image:latest .

# Start all services using Docker Compose
docker compose up -d

# Check if all services are running
docker compose ps
```

### 4. Verify Services

Run the test script to verify all services are working:

```bash
python test-services.py
```

You should see all services marked as "Healthy" and "Working".

### 5. Test Azure Authentication (Optional)

To verify that Azure CLI authentication is working in the backend container:

```bash
# Test Azure authentication in the backend container
docker-compose exec backend node test-azure-auth.js
```

You should see your Azure account information displayed.

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Audio Analysis**: http://localhost:8000
- **Sentiment Analysis**: http://localhost:8001
- **Transcriber**: http://localhost:8002

## Service Architecture

```
Frontend (React) → Backend Services
    ↓
├── Transcriber Service (Whisper AI) → Frontend (for editing)
├── Audio Analysis Service (Librosa) ← Receives transcription from frontend
├── Sentiment Analysis Service (Transformers) ← Receives transcription from frontend
└── Backend API (Express.js)
```

## Workflow

1. **Recording**: User records video/audio in frontend
2. **Transcription**: Video sent to transcriber service, returns text
3. **Editing**: User reviews and edits transcription in frontend
4. **Analysis**: Edited transcription sent to both audio and sentiment analysis services
5. **Results**: Combined results displayed to user

## API Endpoints

### Transcriber Service (Port 8002)

- `POST /transcribe/` - Transcribe video/audio files
- `GET /health` - Health check

### Audio Analysis Service (Port 8000)

- `POST /analyse-audio/` - Analyze audio features (requires file + transcription text)
  - Form data: `file` (audio/video file) + `transcription` (text)
- `GET /health` - Health check

### Sentiment Analysis Service (Port 8001)

- `POST /sentiment-analysis` - Analyze sentiment
  - JSON body: `{"question": "...", "answer": "..."}`
- `GET /health` - Health check

### Backend API (Port 3000)

- `GET /` - Health check
- Various Azure AI analysis endpoints

## Troubleshooting

### Common Issues

1. **Services not starting**

   ```bash
   # Check logs
   docker-compose logs [service-name]

   # Restart specific service
   docker-compose restart [service-name]
   ```

2. **Port conflicts**

   - Ensure ports 3000, 5173, 8000, 8001, 8002 are available
   - Stop any existing services using these ports

3. **CORS issues**

   - All services have CORS enabled for development
   - Check browser console for CORS errors

4. **Model loading issues**

   - First run may take longer as models are downloaded
   - Check service logs for model download progress

5. **Azure authentication issues**
   - Ensure you're logged in with `az login` on your host machine
   - Verify `~/.azure` directory exists and contains credentials
   - Check backend logs: `docker-compose logs backend`
   - Test authentication: `docker-compose exec backend node test-azure-auth.js`

### Service-Specific Issues

#### Transcriber Service

- Requires Whisper model download on first run
- Supports: .mp4, .mkv, .mov, .webm files

#### Audio Analysis Service

- Requires audio processing libraries
- Supports: .wav, .mp3, .flac, .ogg, .webm files

#### Sentiment Analysis Service

- Requires Transformers models download on first run
- Uses emotion detection model

## Development

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Individual Service Development

Each service can be run independently for development:

```bash
# Transcriber
cd transcriber
python -m uvicorn main:app --reload --port 8002

# Audio Analysis
cd audio-analysis
python -m uvicorn main:app --reload --port 8000

# Sentiment Analysis
cd sentiment-analysis
python -m uvicorn main:app --reload --port 8001
```

## Testing

### Manual Testing

1. Open http://localhost:5173
2. Allow camera/microphone access
3. Record a video
4. Test transcription and analysis flow

### Automated Testing

```bash
# Change directory to tests
cd tests
# Run all service tests
python test-services.py

# Test specific services
python test-services.py --service health      # Health endpoints only
python test-services.py --service transcriber # Transcription service only
python test-services.py --service audio       # Audio analysis only
python test-services.py --service sentiment   # Sentiment analysis only
python test-services.py --service backend     # Backend API only
python test-services.py --service agents      # Azure AI agents only
python test-services.py --service workflow    # Full workflow only

# List available services
python test-services.py --list

# Custom timeout (default: 120s)
python test-services.py --timeout 60

# Skip waiting for services to be ready
python test-services.py --no-wait

# Run frontend tests (if available)
cd frontend
npm test
```

### Testing with Real Files

The test script now uses the real `test-recording.webm` file from the `media/` folder for comprehensive testing.

**Test File**: `media/test-recording.webm`

This provides:

- ✅ **Real audio content** for transcription testing
- ✅ **Actual speech patterns** for audio analysis
- ✅ **Genuine sentiment data** for emotion detection
- ✅ **End-to-end workflow validation**

If you want to use a different test file, simply replace `media/test-recording.webm` with your own video file.

## Production Deployment

For production deployment:

1. Update CORS settings in all services
2. Set proper environment variables
3. Use production Docker images
4. Configure proper networking and security
5. Set up monitoring and logging

## Support

If you encounter issues:

1. Check the service logs: `docker-compose logs [service-name]`
2. Verify all services are running: `docker-compose ps`
3. Test individual endpoints using the test script
4. Check browser console for frontend errors
