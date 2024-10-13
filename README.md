## Sensor Data Dashboard

This project is a fully-featured sensor data dashboard built to visualize and analyze sensor data in real-time. The dashboard is designed to work seamlessly with sensors connected to The Things Network, but ultimately accepts data via webhooks, making it flexible for various use cases.

The dashboard focuses on two key entities:
- **Devices**: Representing the sensors that collect data.
- **Readings**: Representing the data points collected by each device, linked via `device_id`.

### Features

- **View Devices on Map or as a Table**: Easily visualize the location of devices on an interactive map, or switch to table view to see all devices in a detailed list format.
  
- **Easy Filtering by Date**: Filter readings by specific date ranges to narrow down the data you want to analyze. This makes it simple to zoom in on specific time periods.
  
- **Aggregation by Bucket (Day, Week, Month)**: Aggregate sensor readings into different time buckets, allowing you to view trends and patterns on a daily, weekly, or monthly basis.
  
- **View Readings in Charts or as a Table**: Choose to visualize sensor readings using interactive charts for a clear overview of trends, or view them as a table for detailed data analysis.

### Tech Stack Breakdown

- **Next.js**: A powerful React framework for building fast and scalable web applications. It provides server-side rendering, static site generation, and API routes, making it perfect for creating dynamic, high-performance dashboards.
  
- **TypeScript**: TypeScript is used to enhance JavaScript with static typing, providing improved code quality, better tooling support, and easier scalability across the project.
  
- **MongoDB**: A NoSQL database that stores sensor data in a flexible, document-oriented structure. It's ideal for handling large amounts of time-series data from multiple devices.

- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, simplifying interactions with the database by providing schema-based data validation and querying methods.

- **Mapbox**: A powerful mapping and geolocation platform used to display sensor locations and data overlays. This helps visualize the geographical distribution of devices and their associated readings in real-time.

- **Recharts**: A flexible charting library built on top of React, used to visualize time-series data. It makes it easy to create responsive, customizable charts that provide insights into sensor readings over time.

- **Tailwind CSS**: A utility-first CSS framework that helps build responsive and custom UI components quickly. It provides flexibility and ensures a modern, clean design for the dashboard interface.

- **ShadCN/ui**: A collection of styled components that integrate with Tailwind CSS to speed up development. It offers pre-built UI components with accessibility and design consistency in mind.


## Getting Started

To get started, you need to set up a database and deploy a copy of the dashboard. This is incredibly easy to do even if you have no development experience. 

### 1. Deploy to Vercel

To deploy this project to Vercel, click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/import?repository-url=https://github.com/your-repo-url)


### 2. Set Up MongoDB with Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in.
2. Click on **Build a Database** and select the free tier (AWS/GCP/Azure).
3. Choose a region for your cluster.
4. Once the cluster is created, click on **Connect**.
5. In the **Connect** modal:
   - Choose **Connect Your Application**.
   - Select the driver as `Node.js`.
   - Copy the provided connection string. You will need this in the next steps.

### 3. Set Up Mapbox Studio

To visualize sensor locations on a map, you need to set up a Mapbox account and generate an API key.

1. Go to [Mapbox Studio](https://studio.mapbox.com/) and sign up or log in.
2. From your Mapbox dashboard, navigate to **Account** and scroll down to **Access tokens**.
3. Click on **Create a new token**. You can name this token anything (e.g., "Sensor Dashboard API Token").
4. Copy the newly created **Access token**. This will be used in the next step.

### 4. Set environment variables in Vercel

1. After deploying, go to your Vercel dashboard.
2. Find your newly deployed project, and navigate to **Settings** > **Environment Variables**.
3. Add a new environment variable:
   - Key: `MONGODB_URI`
   - Value: Paste the MongoDB connection string you copied earlier.
   - Key: `NEXT_PUBLIC_MAPBOX_TOKEN`
   - Value: Paste the Mapbox token you copied earlier.

Example:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
NEXT_PUBLIC_MAPBOX_API_KEY=pk.eyJ1IjoibWFwYm94dXNlciIsImEiOiJjanB1N25hYWUwMDAzM3pueTFpczJhdnZqIn0.TulbCgBlklYf2P4MijhkjA
```

## Development Setup

1. Clone the repository to your local machine. `git clone https://github.com/your-repo-url.git`
2. Install dependencies by running `yarn`.
3. Create a local .env file by running `touch .env.local`
4. Paste in the environment variables in the form of the example below. You can also use the Vercel CLI to pull the environment variables from the dashboard. 
5. Run the dev server with `yarn dev`

Example:
```bash
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
NEXT_PUBLIC_MAPBOX_API_KEY=pk.eyJ1IjoibWFwYm94dXNlciIsImEiOiJjanB1N25hYWUwMDAzM3pueTFpczJhdnZqIn0.TulbCgBlklYf2P4MijhkjA
```