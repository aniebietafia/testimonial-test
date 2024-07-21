# HNG Integration Documentation

## Overview

## Folder Structure

```
|--- src
|    |--- index.ts
|--- .env.local
|--- .gitignore
|--- package.json
|--- tsconfig.json
```

## Dependencies (Dev)

- Node.js
- TypeScript
- Express
- ts-node-dev
- postgres

## Getting Started

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [Git](https://git-scm.com/)

## Usage

### Register User `POST /api/v1/auth/register`

- Request

```json
{
  "fullname": "John Doe",
  "email": "test@email.com",
  "password": "password"
}
```

- Response

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "fullname": "John Doe",
    "email": "test@email.com",
    "created_at": "2021-08-01T00:00:00.000Z"
  }
}
```

### Login User `POST /api/v1/auth/login`

- Request

```json
{
  "email": "test@email.com",
  "password": "password"
}
```

- Response

```json
{
  "status": "success",
  "message": "User logged in successfully",
  "data": {
    "id": 1,
    "fullname": "John Doe",
    "email": "test@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzQwNjI4LCJleHAiOjE2Mjg3NDQyMjh9.7"
}
```

### Add a Testimonial `POST /api/v1/testimonials`

- Request

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzQwNjI4LCJleHAiOjE2Mjg3NDQyMjh9.7
{
  "client_name": "John Doe",
  "client_position": "Backend Developer",
  "testimonial": "This is a great platform to showcase my skills."
}
```

- Response

```json
{
  "status": "success",
  "message": "Testimonial added successfully",
  "data": {
    "id": 1,
    "client_name": "John Doe",
    "client_position": "Backend Developer",
    "testimonial": "This is a great platform to showcase my skills.",
    "created_at": "2021-08-01T00:00:00.000Z"
  }
}
```

### Get All Testimonials `GET /api/v1/testimonials`

- Response

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzQwNjI4LCJleHAiOjE2Mjg3NDQyMjh9.7
{
  "status": "success",
  "message": "Testimonials retrieved successfully",
  "data": [
    {
      "id": 1,
      "client_name": "John Doe",
      "client_position": "Backend Developer",
      "testimonial": "This is a great platform to showcase my skills.",
      "created_at": "2021-08-01T00:00:00.000Z"
    }
  ]
}
```

### Get a Testimonial `GET /api/v1/testimonials/:id`

- Response

```json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI4NzQwNjI4LCJleHAiOjE2Mjg3NDQyMjh9.7
{
  "status": "success",
  "message": "Testimonial retrieved successfully",
  "data": {
    "id": 1,
    "client_name": "John Doe",
    "client_position": "Backend Developer",
    "testimonial": "This is a great platform to showcase my skills.",
    "created_at": "2021-08-01T00:00:00.000Z"
  }
}
```

## Getting Started

#### If you don't have git on your machine, [install it](https://docs.github.com/en/get-started/quickstart/set-up-git).

## Clone the repository

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/clone.png" alt="clone this repository" />

Now clone the forked repository to your machine. Go to your GitHub account, open the forked repository, click on the code button and then click the _copy to clipboard_ icon.

Open a terminal and run the following git command:

```bash
git clone "url you just copied"
```

where "url you just copied" (without the quotation marks) is the url to this repository (your fork of this project). See the previous steps to obtain the url.

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/copy-to-clipboard.png" alt="copy URL to clipboard" />

For example:

```bash
git clone git@github.com:this-is-you/hng_project.git
```

where `this-is-you` is your GitHub username. Here you're copying the contents of the first-contributions repository on GitHub to your computer.

## Create a branch

Change to the repository directory on your computer (if you are not already there):

```bash
cd hng_project
```

Now create a branch using the `git switch` command:

```bash
git switch -c your-new-branch-name
```

For example:

```bash
git switch -c add-alonzo-church
```

### Important notice:

```bash
  console.log
```

is not allowed

a default logger has been created

```bash
  import log from "./utils/logger";

  log.info("information")
```

### Make Changes

Make your changes to the codebase. Ensure your code follows the project's coding standards and guidelines.

## commit those changes

Now open `Contributors.md` file in a text editor, add your name to it. Don't add it at the beginning or end of the file. Put it anywhere in between. Now, save the file.

<img align="right" width="450" src="https://firstcontributions.github.io/assets/Readme/git-status.png" alt="git status" />

If you go to the project directory and execute the command `git status`, you'll see there are changes.

Add those changes to the branch you just created using the `git add` command:

## Push changes to GitHub

Push your changes using the command `git push`:

```bash
git push -u origin your-branch-name
```

replacing `your-branch-name` with the name of the branch you created earlier.

<details>
<summary> <strong>If you get any errors while pushing, click here:</strong> </summary>

- ### Authentication Error
     <pre>remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
  remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
  fatal: Authentication failed for 'https://github.com/<your-username>/first-contributions.git/'</pre>
  Go to [GitHub's tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) on generating and configuring an SSH key to your account.

</details>

## Submit your changes for review into Staging

If you go to your repository on GitHub, you'll see a `Compare & pull request` button. Click on that button.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/compare-and-pull.png" alt="create a pull request" />

Now submit the pull request.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/submit-pull-request.png" alt="submit pull request" />

Soon your changes will be merged into the staging branch of this project. You will get a notification email once the changes have been merged.

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/your-username/[app-name].git
cd [app-name]
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies.

```sh
yarn
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your environment-specific variables. You can use the provided `.env.example` file as a reference.

```sh
cp .env.example .env
```

Edit the `.env` file to match your environment configuration.

### 4. Run the Development Server

Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.

```sh
yarn start:dev
```

### 5. Run the Production Server

To run the application in a production environment, use the following command:

```sh
yarn start
```

### 7. Verify the Setup

Open your browser and navigate to `http://localhost:8080` to verify that the application is running correctly.

## API Endpoints

All API endpoints can be referenced in the [API Reference](API_REFERENCE.md) document.

## Versioning

This project is versioned to ensure backward compatibility and easy maintenance. The current version is [version 1].

## route naming conventions

all routes should have a prefix of

```bash
  api/v1
```
