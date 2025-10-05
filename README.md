# DivHacks


## 🌟 Introduction


LINKUP - a web app that simplifies how groups choose where to meet by combining fairness, efficiency, and data-driven insight.


## 💡 Inspiration


We’ve all been there — trying to plan a hangout in NYC that actually works for everyone. One friend’s in Queens, another’s in Brooklyn, and someone’s already complaining about the subway transfers. That’s why we built LINKUP to make finding a fair meetup spot easy. Instead of endless group chats and Google Maps links, LINKUP does the work for you, finding the perfect middle ground so everyone meets halfway.


## 🚀 What it does


LINKUP brings your crew together in one shared session where everyone drops their location. Once the squad's in, the app crunches the location data to find meetup spots that are actually fair for everyone. The top three suggestions pop up on Google Maps so you can see exactly where you're headed. To assist our decision-making, our GenAI summary with LangChain gives you the inside scoop on why each spot made the cut, so you're not just picking randomly—you've got smart, data-backed reasons behind your choice.


## 🔨 How we built it


### Frontend


- React (Vite)
- Google Maps JavaScript API (map + pins)
- Fetch / Axios for API calls
- MUI or Bootstrap for UI components
- Deployment


### Backend


- Node.js + Express
- In-memory sessions (simple sessions object for hackathon MVP)
- Google APIs: Geocoding: Places (Nearby Search), Distance Matrix (transit mode)
- LangChain: Summaries for top venues
- Optional: Opik (AI evaluation)
- Deployment


## 📱 Demo


## 🛠️ Development
Web version can be visited at https://linkup-nyc-client.onrender.com/


To develop the project, we can also contribute using these steps:


### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Google Maps API keys for front-end and back-end


### Running the Application


#### 1. Clone the Repository
```bash
git clone https://github.com/tasmiachow/DivHacks.git
```
#### 2. Run back end
- Navigate to the backend from the root folder:
```bash
cd server
```
- Create a .env file with the content: GOOGLE_MAPS_API_KEY=[your-google-api-key]
- Dependencies setup and server launch:
```bash
npm install
npm start
```
#### 3. Run front end
- Navigate to the front end from the root folder:
```bash
cd server
```
- Create a .env file with the content: VITE_GOOGLE_MAPS_API_KEY=[your-google-api-key]
- Dependencies setup and server launch:
```bash
npm install
npm run dev
```
The development environment should now be set up. After this, the app should be running locally.


Frontend: http://localhost:5173 (or on Port 5174)


Backend: http://localhost:5000

