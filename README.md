# FocusFlow
A web-based task management app designed to assist users, particularly those with ADHD, by breaking down tasks into smaller, manageable steps. The app integrates a **SmolLM2-135M-INSTRUCT** model, which uses NLP to help users deconstruct complex tasks into more digestible sub-tasks.

---

## Features

- **Task Management**: Create, update, delete and track tasks.
- **Task Breakdown**: Automatically generate sub-tasks based on a given task using a LLM (SmolLM2-135M-INSTRUCT).
- **User-Friendly Interface**: Simple and intuitive frontend built with React.
- **LLM Integration**: Uses a custom-trained language model to break down complex tasks.
- **MySQL Database**: Stores user data and tasks.

---

## Project Structure

```
project/
├── backend/                    # Django backend
│   ├── Dockerfile               # Dockerfile for the backend
│   ├── requirements.txt         # Backend dependencies
│   └── taskapp/                 # Django app folder
├── frontend/                    # React frontend
│   ├── Dockerfile               # Dockerfile for the frontend
│   ├── package.json             # Frontend dependencies
│   ├── package-lock.json        # Lock file for React dependencies
│   └── public/                  # Public directory for React
│   └── src/                     # Source code for React
├── llm/                         # LLM model directory
│   ├── Dockerfile               # Dockerfile for the LLM module
│   ├── requirements.txt         # LLM module dependencies
│   ├── merged_model/            # Contains the SmolLM2-135M-INSTRUCT model and tokenizers
│   └── testsmol135.ipynb        # Jupyter notebook for LLM module
└── docker-compose.yml           # Docker Compose configuration for all services
```

---

## Requirements

Before running the project, ensure you have the following installed:

- Docker
- Docker Compose

---

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd project/
   ```

2. **Build and start all services using Docker Compose**:
   From the root directory (where `docker-compose.yml` is located), run the following command to build and start all containers:

   ```bash
   docker-compose up --build
   ```

3. **Access the Services**:

   - **Backend (Django)**: Open your browser and navigate to `http://localhost:8000` for the backend.
   - **Frontend (React/Vite)**: Open `http://localhost:3000` to access the frontend.
   - **LLM Module (Jupyter Notebook)**: Access Jupyter at `http://localhost:8888` (no authentication required).
   - **MySQL Database**: The MySQL database is accessible at `localhost:3306`.

4. **Stop the Containers**:
   To stop the containers, use the following command:
   ```bash
   docker-compose down
   ```

---

## Docker Compose Configuration

The `docker-compose.yml` file contains the configuration to spin up four services:

1. **Backend**: Django application running on port `8000`.
2. **Frontend**: React application (served via Vite) running on port `3000`.
3. **LLM**: A Python container that runs Jupyter Notebook, which allows interaction with the `SmolLM2-135M-INSTRUCT` model, accessible on port `8888`.
4. **MySQL**: MySQL database running on port `3306`, configured with `rootpassword` and the `mydatabase` schema.

Here’s the configuration:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - DB_HOST=database
      - DB_PORT=3306
      - DB_NAME=mydatabase
      - DB_USER=root
      - DB_PASSWORD=rootpassword
    depends_on:
      - database

  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:5173"
    volumes:
      - ./frontend:/app
    environment:
      - VITE_API_URL=http://backend:8000   # For frontend to interact with backend

  llm:
    build:
      context: ./llm
    ports:
      - "8888:8888"
    volumes:
      - ./llm:/app
    environment:
      - MERGED_MODEL_PATH=/app/merged_model   # Path to merged model
    depends_on:
      - backend

  database:
    image: mysql:8.0
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: root
      MYSQL_PASSWORD: rootpassword
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

---

## Backend Configuration

Ensure that your Django `settings.py` file is configured to use MySQL by setting the following environment variables:

```python
import os

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME', 'mydatabase'),
        'USER': os.getenv('DB_USER', 'root'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'rootpassword'),
        'HOST': os.getenv('DB_HOST', 'database'),
        'PORT': os.getenv('DB_PORT', '3306'),
    }
}
```

---

## Running Jupyter Notebook for LLM

The LLM module is set up with Jupyter Notebook running on port `8888`. This allows users to interact with the **SmolLM2-135M-INSTRUCT** model, break down tasks, and experiment with the model directly.

To interact with the Jupyter notebook:

1. Open `http://localhost:8888` in your browser.
2. Run the `testsmol135.ipynb` notebook or other notebooks to explore the model’s capabilities.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
