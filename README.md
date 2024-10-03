# Audiobook Web App

This is a Flask-based web application that allows users to vote for their favorite audiobooks. The app provides user authentication via JWT tokens and ensures that users can only vote for each audiobook once. It also includes a frontend built with React and TypeScript, and the backend API is hosted on PythonAnywhere.

## Features

- **User Authentication**: Users can register and log in using email and password. JWT tokens are used for authentication.
- **Vote for Audiobooks**: Authenticated users can vote for audiobooks. Each user can vote only once for a particular audiobook.
- **Persistent Vote Tracking**: The app tracks user votes, ensuring that the "Vote" button is disabled after a user has voted.
- **Live Voting Results**: Audiobooks are displayed with their current vote counts, which update in real-time after votes are cast.

## Technologies Used

- **Frontend**: React with TypeScript and TailwindCSS
- **Backend**: Flask (Python)
- **Database**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT (JSON Web Token) and React-Auth-Kit
- **Hosting**: Netlify for the Frontend and PythonAnywhere for the Backend

## Live Site

You can access the live version of the app [audiobooks101.netlify.app](https://audiobooks101.netlify.app/).

---

## Running the App Locally

To run the app on your local machine, follow these steps:

### Prerequisites

1. **Python 3.7+**: Make sure you have Python installed. You can download it from [here](https://www.python.org/downloads/).
2. **Node.js**: Ensure Node.js and npm are installed for the frontend. You can download them from [here](https://nodejs.org/).

### 1. Clone the Repository
```bash
git clone https://github.com/arfeloreed/audiobooks.git
cd audiobooks
```

### 2. Backend Setup (Flask)
#### 2.1 Create and activate a virtual environment
```bash
cd backend
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```
#### 2.2 Install dependencies
```bash
pip install -r requirements.txt
```

#### 2.3 Set environment variables
Create a `.env` file in the root directory and add the following values:
```bash
SECRET_KEY="yourSecretkey"
SQLALCHEMY_DATABASE_URI="sqlite:///../audiobooks.db"
JWT_SECRET_KEY="jwtsecretkey"
```

#### 2.4 Run database migrations
To initialize the SQLite database:
```bash
# initialize db
flask db init
# apply migrations
flask db migrate
flask db upgrade
```

#### 2.5 Run the Flask app
```bash
python3 main.py
```

### 3. Frontend Setup (React with vite)
#### 3.1 Navigate to the frontend folder
```bash
cd frontend
```

#### 3.2 Set environment variables
Create a `.env` file in the root directory and add the following values:
```bash
VITE_SERVER_URL="set your url"
```

#### 3.3 Install dependencies and run app
```bash
# install dependencies
npm install
# run app
npm run dev
```
