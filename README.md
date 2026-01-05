## Forkify Application 🍳 <br>
A modern recipe searching application with custom recipe uploads, serving adjustments, and bookmarking capabilities. Built as part of the Complete JavaScript Course.

## 🚀 Live Demo
**[forkify-topaz.vercel.app](https://forkify-topaz.vercel.app)**

## ✨ Features
### 🔍 Recipe Search
Search from over 1,000,000 recipes.<br>
Seamlessly fetches data from the Forkify API.

### 🍱 Serving Adjustments
Dynamically update ingredient quantities by changing the number of servings.<br>
All quantities update instantly in the UI without a page reload.

### 🔖 Bookmarking
Save your favorite recipes for later.<br>
Local Storage Integration: Your bookmarks are persisted, meaning they will still be there even if you refresh the page or close the browser.

### 📤 Add Custom Recipes
Upload your own recipes directly to the API.

Custom recipes are automatically bookmarked and marked with a unique user icon.

### 🛠️ Built With
JavaScript (ES6+) - Functional logic and MVC architecture.<br>

HTML & SCSS - Modern, responsive user interface.<br>

Parcel 2 - Build tool and module bundler.<br>

Vercel - Production deployment and hosting.<br>

Forkify API - Backend data source.

## 📂 Project Structure
This project follows the Model-View-Controller (MVC) architectural pattern to ensure clean, maintainable code:<br>

Model: Handles all data logic, API calls, and local storage management.<br>

Views: Responsible for rendering the UI and listening for user events.<br>

Controller: The "brain" that connects the Model and the Views.

## ⚙️ How to Run Locally
### Clone the repository

Bash

`git clone https://github.com/chandan200209/forkify.git`
### Install dependencies

Bash

`npm install`
### Start the development server

Bash

`npm start`
### Build for production

Bash

`npm run build`
## 📝 License
This project is for educational purposes as part of Jonas Schmedtmann's JavaScript Course.
