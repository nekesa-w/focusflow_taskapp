# FocusFlow - NLP Powered Task Management App
FocusFlow is a web-based task management app designed to assist users, particularly those with ADHD, by breaking down tasks into smaller, manageable steps. The app integrates the **SmolLM2-135M-INSTRUCT** model, which is used to help users deconstruct complex tasks into more digestible and motivational sub-tasks.

---

## Features

- **Task Management**: Create, update, delete and track tasks.
- **Task Breakdown**: Automatically generate sub-tasks based on a given task using a LLM (SmolLM2-135M-INSTRUCT).
- **User-Friendly Interface**: Simple and intuitive frontend built with React.
- **LLM Integration**: Uses a custom-trained language model to break down complex tasks.
- **MySQL Database**: Stores user data and tasks.

---

## Images

**Home**  

The main dashboard of FocusFlow, providing an overview of tasks and productivity insights.  
![Home](frontend/public/home.png)  

**Login**  

The user authentication page allowing registered users to securely log into FocusFlow.  
![Login](frontend/public/login.png)  

**Register** 

The sign-up page where new users can create an account to start managing their tasks.  
![Register](frontend/public/register.png)  

**New Task**  

A dedicated page for users to add new tasks with deadlines, priorities, and categories.  
![NewTask](frontend/public/newtask.png)  

**Subtasks**  

Allows users to break down complex tasks into smaller, manageable subtasks for better organization using AI.  
![Subtask](frontend/public/subtasks.png)  

**Subtask Created** 

A confirmation page showing that a subtask has been successfully added to a main task.  
![SubtaskCreated](frontend/public/subtaskscreated.png)  

**Edit Task**  

Users can modify task details such as due date, priority, and description.  
![Edit](frontend/public/edittask.png)  

**To-Do Subtask**  

Displays a list of pending subtasks that need to be completed before the main task is done.  
![ToDoSubtask](frontend/public/todosubtask.png)  

**Done**  

Shows completed tasks and subtasks, helping users track their productivity.  
![Done](frontend/public/done.png)  

**Past Due**  

A section highlighting overdue tasks that need urgent attention.  
![Pastdue](frontend/public/pastdue.png)  


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
   git clone https://github.com/nekesa-w/focusflow_taskapp
   cd taskapp/
   ```

2. **Build and start all services using Docker Compose**:
   From the root directory (where `docker-compose.yml` is located), run the following command to build and start all containers:

   ```bash
   docker-compose up --build
   ```

3. **Access the Services**:

   - **Backend (Django)**: Open your browser and navigate to `http://localhost:8000` for the backend.
   - **Frontend (React/Vite)**: Open `http://localhost:5173` to access the frontend.
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
2. **Frontend**: React application (served via Vite) running on port `5173`.
3. **LLM**: Jupyter Notebook file, which allows interaction with the `SmolLM2-135M-INSTRUCT` model, accessible on port `8888`.
4. **MySQL**: MySQL database running on port `3306`, configured with root, no password and the `taskapp` schema.

---

## Backend Configuration

Ensure that your Django `settings.py` file is configured to use MySQL by setting the following environment variables:

```python
import os

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "taskapp",
        "USER": "root",
        "PASSWORD": "",
        "HOST": "localhost",
        "PORT": "3306",
        "OPTIONS": {
            "init_command": "SET default_storage_engine=INNODB",
        },
    }
}
```

---

## Running Jupyter Notebook for LLM

The LLM module is set up with Jupyter Notebook running on port `8888`. This allows users to interact with the fine-tuned **SmolLM2-135M-INSTRUCT** model, break down tasks, and experiment with the model directly.

To interact with the Jupyter notebook:

1. Open `http://localhost:8888` in your browser.
2. Run the `testsmol135.ipynb` notebook or other notebooks to explore the model’s capabilities.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
