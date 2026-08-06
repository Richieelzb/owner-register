FROM python:3.12-slim

# Prevent Python from creating .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Force stdout/stderr flushing
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create uploads folder if needed
RUN mkdir -p uploads

EXPOSE 5000

CMD ["gunicorn", "--workers=4", "--bind=0.0.0.0:5000", "app:app"]