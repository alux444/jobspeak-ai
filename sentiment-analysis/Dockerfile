FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install dependencies
COPY torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl sentiment-analysis/requirements.txt ./

RUN pip install --upgrade pip && \
    pip install --no-cache-dir torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl && \
    pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY sentiment-analysis/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]