FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y ffmpeg && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl transcriber/requirements.txt ./

RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl && \
    pip install --no-cache-dir -r requirements.txt

COPY transcriber/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]