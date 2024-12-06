# Job Listings Website Frontend

This project is a frontend application for a job listings platform built with **Next.js**. It includes job search, filtering, posting, and a detailed view for jobs. The application uses mock APIs and local storage for managing data and authentication.

---

## Features

### **1. Home Page**
- A hero section with a job search bar.
- Autoplay carousel showcasing featured jobs.
- List of job categories that redirect users to filtered job listings.

### **2. Job Listings Page**
- Displays all jobs in a grid layout with filtering options.
- Filters by:
  - **Category**
  - **Location**
  - **Job Type** (e.g., Full-time, Part-time).
- Pagination for easy navigation through job listings.

### **3. Job Details Page**
- Displays detailed information about a job, including:
  - **Description**
  - **Requirements**
  - **Company Info**
- Tabs for switching between job details.

### **4. Post a Job**
- A private route for posting jobs, accessible only to authenticated users.
- A form with validation to add job details.
- Stores job data in local storage and displays it on the job listings page.

### **5. Authentication**
- Signup and login forms with validation.
- Stores users and session data in local storage.
- Protects routes that require authentication (e.g., "Post a Job").

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** for type safety.
- **Tailwind CSS** for responsive design.
- **Formik** and **Yup** for form validation.
- **Local Storage** for user data, job data, and chat history.
- **React Slick** for the featured jobs carousel.

---

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- A text editor like **VS Code**

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>

#Install Dependencies
npm install
#OR
yarn install

#Create a .env.local file in the root directory with the following:
NEXT_PUBLIC_LOCALSERVER=http://localhost:3000

#Start the Development Server
npm run dev

src/
├── app/
│   ├── home/
│   │   ├── page.tsx  # Home page component
│   ├── jobs/
│   │   ├── page.tsx  # Job listings page
│   │   ├── [id]/page.tsx  # Job details page (dynamic routing)
│   ├── post-job/
│   │   ├── page.tsx  # Post a job form (protected route)
│   ├── api/
│   │   ├── jobs/route.ts  # Mock API for job data
│   │   ├── job-details/route.ts  # Mock API for job details
│   │   ├── job-categories/route.ts  # Mock API for categories
│   ├── layout.tsx  # Root layout
│   ├── globals.css  # Global CSS
├── components/
│   ├── Header.tsx  # Header with conditional rendering for auth
│   ├── LogoutButton.tsx  # Logout button
│   ├── JobDetails.tsx  # Detailed job view
│   ├── FeaturedJobsSlider.tsx  # Carousel for featured jobs
│   ├── JobCategories.tsx  # Job categories component
│   ├── SearchBar.tsx  # Search bar for jobs
│   ├── CustomPagination.tsx  # Pagination component
├── context/
│   ├── AuthProvider.tsx  # Authentication context
├── hooks/
│   ├── useDebounce.ts  # Custom debounce hook
├── styles/
│   ├── globals.css  # Tailwind CSS configuration
├── db/
│   ├── db.js  # Mock job data
├── themes/
│   ├── colors.js  # Centralized theme colors
├── types/
│   ├── job.ts  # Type definitions for jobs


