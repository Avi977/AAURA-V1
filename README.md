<!-- For devs: if you getting a key error, its likely due to the fact that you are missing a .env file
create a .env file with these:
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION
found in the aws access portal in YOUR LOGIN!
PATHe {path to your aws.exe after installation} -->

-->

# A.U.R.A. – AI-Utilized Responsive Assistant

## Project Setup & Dependencies

This project is a web application built using **Django (backend)** and **React (frontend)**, integrated with **AWS S3** for cloud storage.

---

## **1. Prerequisites**

Before starting, ensure you have the following installed:

- **Python** (>= 3.8)
- **Node.js** (>= 22)
- **pip** (Python package manager)
- **virtualenv** (for Python virtual environment)
- **PostgreSQL** (Optional, if using PostgreSQL instead of SQLite)

---

## **2. Backend (Django) Setup**

### **Install Dependencies**

```bash
# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### **Environment Variables (`.env`)**

Create a `.env` file in the backend directory and add:

```ini
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=your-region
DEBUG=True
SECRET_KEY=your-secret-key
```

---

## **3. Frontend (React) Setup**

### **Install Node.js Dependencies**

# Install Node.js and npm globally if not installed

https://nodejs.org/en/download/

---

### **Required NPM Packages**

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-router-dom": "^6.14",
    "axios": "^1.6",
    "tailwindcss": "^4.0"
  }
}
```

## **4. AWS S3 Integration**

### **Install AWS SDK for Django**

```bash
pip install boto3 django-storages
```

### **Enable S3 Storage in `settings.py`**

```python
INSTALLED_APPS = [
    'storages',
]
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
```

---

## **5. Running the Application**

### **Start Django Backend**

```bash
python manage.py runserver  # Runs backend on localhost:8000
```

### **Start React Frontend**

```bash
cd frontend
npm start  # Runs frontend on localhost:3000
#or
npm run dev #runs development mode on localhost:3000
```

---

## **6. API Endpoints**

| Endpoint         | Method | Description         |
| ---------------- | ------ | ------------------- |
| `/api/login/`    | POST   | User login          |
| `/api/register/` | POST   | User registration   |
| `/api/upload/`   | POST   | Upload file to S3   |
| `/api/files/`    | GET    | List uploaded files |

---

## **7. Deployment**

### **Deploy Django Backend**

- Use **Gunicorn** & **NGINX** for production.
- Deploy to **AWS EC2 / DigitalOcean / Heroku**.

### **Deploy React Frontend**

- Build React app: `npm run build`
- Deploy on **Vercel / Netlify / AWS Amplify**.

---

## **8. Future Improvements**

- Implement **JWT authentication**.
- Add **AI-powered chatbot**.
- Optimize **AWS S3 file handling**.

---

## **Contributors**

- **Ace** - Backend Developer
- **Ruzan** - Frontend Developer
- **Swopnab** - Cloud Engineer

---

## **License**

License © 2025 A.U.R.A. Project
