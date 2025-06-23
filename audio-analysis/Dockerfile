FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app
 
COPY torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl /app/torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl
COPY sentiment-analysis/requirements.txt ./

RUN pip install --no-cache-dir /app/torch-2.3.0+cpu-cp311-cp311-linux_x86_64.whl && \
    pip install --no-cache-dir -r requirements.txt

COPY audio-analysis/. .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]