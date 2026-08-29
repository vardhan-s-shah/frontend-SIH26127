# City-Wide AI Engine — Multi-Camera ANPR Operations Command Center

A high-performance, real-time urban traffic surveillance and multi-camera ANPR operations command center frontend built with React, TypeScript, Vite, Tailwind CSS, and Leaflet.

## ✨ Features

- **Dashboard**: Glanceable KPI metrics, live ANPR detection stream, and interactive geospatial camera health map.
- **Vehicle Detection & ANPR Database**: Multi-frame temporal voting OCR inspection, vehicle specs, and sighting history.
- **Vehicle Tracking & Multi-Cam Feeds**: Real-time multi-camera CCTV grid with bounding box indicators, plate tags, and expandable single-camera ByteTrack Kalman filter tracking.
- **Cross-Camera Re-Identification (ReID)**: Multi-vector spatial-temporal candidate matching across network nodes.
- **Trajectory Mapping & Prediction**: Historical route tracing with recency gradients and destination probability distribution.
- **Traffic & Congestion Analytics**: Hourly volume vs. velocity trends, bottleneck warnings, and corridor heatmap visualization.
- **Green Corridor Emergency Preemption**: Priority route preemption and emergency vehicle tracking for ambulances.
- **Incident & Violation Enforcement**: Red-light stop-line crossing inspector, speeding evidence, and wrong-way detection.
- **Dark & Light Mode**: Complete color token design system matching operations command-center standards with local storage persistence.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
`ash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Navigate to project directory
cd SIH FRONTEND

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
`

### Build for Production
`ash
npm run build
`

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom theme variables
- **Mapping**: Leaflet + React-Leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
