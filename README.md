# LearnLynx

LearnLynx is a modern e-learning portal designed to provide a wide range of courses to help users gain new skills and knowledge. The platform allows users to browse, enroll, and participate in various courses, with features for both students and administrators.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/learnlynx.git
cd learnlynx
```

2. Install dependencies for both the frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the `backend` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Usage

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000` to access LearnLynx.

## Project Structure

```
learnlynx/
├── backend/                 # Backend API
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   └── server.js            # Express server setup
├── frontend/                # Frontend React app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # React pages
│   │   ├── context/         # Context API for state management
│   │   ├── App.jsx          # Main app component
│   │   ├── index.js         # Entry point
│   └── public/
├── .gitignore               # Git ignore file
├── README.md                # Project readme file
└── package.json             # Project metadata and scripts
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user

### Courses

- `GET /courses`: Get all courses

### Lectures

- `GET /api/course/:id/lectures`: Get all lectures for a course
- `POST /api/admin/course/:id/lectures`: Add a lecture to a course (Admin only)

### User

- `GET /api/course/mycourses`: Get enrolled courses for the user
- `POST /api/course/enroll/:id`: Enroll in a course

## Contributing

We welcome contributions to LearnLynx! If you have any improvements or new features you'd like to add, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request


![web app design](https://github.com/user-attachments/assets/c88a2619-5a84-42a1-8089-151ed59fcc66)
