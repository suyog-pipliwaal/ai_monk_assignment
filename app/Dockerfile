# Use official Python image
FROM python:3.9

# Set the working directory
WORKDIR /app



RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*
# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . /app

# Expose the FastAPI port
EXPOSE 8000

# Start FastAPI server
# CMD ["fastapi", "dev", "model.py"]
CMD ["uvicorn", "model:app", "--host", "0.0.0.0", "--port", "8000"]
# CMD ["python", "-m", "uvicorn", "model:app", "--host", "0.0.0.0", "--port", "8000"]

