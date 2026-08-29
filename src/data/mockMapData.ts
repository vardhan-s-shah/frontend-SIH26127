export interface MapCameraNode {
  id: string;
  name: string;
  location: string;
  status: 'healthy' | 'warning' | 'offline';
  lat: number;
  lng: number;
  speed: string;
  vehicleType?: string;
  lastUpdated: string;
}

export interface TrajectorySegment {
  id: string;
  fromCam: string;
  toCam: string;
  positions: [number, number][];
  color: string;
  label: string;
}

export const CITY_MAP_CONFIG = {
  cityName: 'Ahmedabad, Gujarat',
  center: [23.0225, 72.5714] as [number, number],
  defaultZoom: 13,
  // Plain OpenStreetMap tiles (100% free, no API key or account required)
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

export const MOCK_CAMERA_NODES: MapCameraNode[] = [
  {
    id: 'CAM 01',
    name: 'CAM 01 · Sector 12',
    location: 'Ashram Road, Sector 12',
    status: 'healthy',
    lat: 23.0300,
    lng: 72.5600,
    speed: '42 km/h',
    vehicleType: 'Sedan',
    lastUpdated: '10:34:21 AM',
  },
  {
    id: 'CAM 02',
    name: 'CAM 02 · MG Road',
    location: 'MG Road Junction (Nehru Bridge)',
    status: 'healthy',
    lat: 23.0250,
    lng: 72.5720,
    speed: '38 km/h',
    vehicleType: 'SUV',
    lastUpdated: '10:34:18 AM',
  },
  {
    id: 'CAM 03',
    name: 'CAM 03 · Paldi Bus Stop',
    location: 'Paldi Bus Station Corridor',
    status: 'warning',
    lat: 23.0180,
    lng: 72.5650,
    speed: '28 km/h',
    vehicleType: 'Public Bus',
    lastUpdated: '10:33:58 AM',
  },
  {
    id: 'CAM 04',
    name: 'CAM 04 · Income Tax Flyover',
    location: 'City Center Flyover (Income Tax Circle)',
    status: 'offline',
    lat: 23.0380,
    lng: 72.5520,
    speed: '0 km/h',
    vehicleType: '—',
    lastUpdated: '10:20:11 AM',
  },
  {
    id: 'CAM 05',
    name: 'CAM 05 · SG Highway',
    location: 'SG Highway Commerce Zone',
    status: 'healthy',
    lat: 23.0450,
    lng: 72.5250,
    speed: '58 km/h',
    vehicleType: 'Car',
    lastUpdated: '10:34:25 AM',
  },
  {
    id: 'CAM 09',
    name: 'CAM 09 · University Circle',
    location: 'University Road Intersection',
    status: 'healthy',
    lat: 23.0600,
    lng: 72.5300,
    speed: '45 km/h',
    vehicleType: 'Car',
    lastUpdated: '10:34:12 AM',
  },
  {
    id: 'CAM 11',
    name: 'CAM 11 · Astodia Gate',
    location: 'East Expressway Junction',
    status: 'healthy',
    lat: 23.0150,
    lng: 72.5850,
    speed: '52 km/h',
    vehicleType: 'Motorcycle',
    lastUpdated: '10:34:05 AM',
  },
  {
    id: 'CAM 15',
    name: 'CAM 15 · Airport Road',
    location: 'SVPI Airport Expressway',
    status: 'warning',
    lat: 23.0750,
    lng: 72.6260,
    speed: '24 km/h',
    vehicleType: 'Sedan',
    lastUpdated: '11:04:11 AM',
  },
  {
    id: 'CAM 18',
    name: 'CAM 18 · Airport Terminal',
    location: 'Airport Terminal 1 Interchange',
    status: 'healthy',
    lat: 23.0900,
    lng: 72.6350,
    speed: '48 km/h',
    vehicleType: 'Car',
    lastUpdated: '11:14:00 AM',
  },
];

// Gradient-colored trajectory path following real roads in Ahmedabad (Design Spec Section 8)
export const MOCK_TRAJECTORY_SEGMENTS: TrajectorySegment[] = [
  {
    id: 'seg-1',
    fromCam: 'CAM 01',
    toCam: 'CAM 02',
    positions: [
      [23.0300, 72.5600],
      [23.0280, 72.5650],
      [23.0250, 72.5720],
    ],
    color: '#3DDC84', // Clear Green (Oldest segment)
    label: 'CAM 01 → CAM 02 (10:22 AM)',
  },
  {
    id: 'seg-2',
    fromCam: 'CAM 02',
    toCam: 'CAM 04',
    positions: [
      [23.0250, 72.5720],
      [23.0320, 72.5620],
      [23.0380, 72.5520],
    ],
    color: '#80DC59', // Green-Amber transition
    label: 'CAM 02 → CAM 04 (10:32 AM)',
  },
  {
    id: 'seg-3',
    fromCam: 'CAM 04',
    toCam: 'CAM 09',
    positions: [
      [23.0380, 72.5520],
      [23.0480, 72.5410],
      [23.0600, 72.5300],
    ],
    color: '#F0B429', // Caution Amber
    label: 'CAM 04 → CAM 09 (10:43 AM)',
  },
  {
    id: 'seg-4',
    fromCam: 'CAM 09',
    toCam: 'CAM 15',
    positions: [
      [23.0600, 72.5300],
      [23.0670, 72.5780],
      [23.0750, 72.6260],
    ],
    color: '#F0473F', // Alert Red (Newest segment)
    label: 'CAM 09 → CAM 15 (11:04 AM)',
  },
];

// Emergency Green Corridor path
export const MOCK_GREEN_CORRIDOR_POSITIONS: [number, number][] = [
  [23.0180, 72.5650], // Paldi Junction 3
  [23.0250, 72.5720], // MG Road Junction 5
  [23.0380, 72.5520], // Income Tax Junction 8
  [23.0750, 72.6260], // Airport Road Junction 11
];
