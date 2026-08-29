export type StatusState = 'healthy' | 'warning' | 'offline' | 'high' | 'medium' | 'low';

export interface Camera {
  id: string;
  name: string;
  location: string;
  status: StatusState;
  lastUpdated: string;
  lat: number;
  lng: number;
}

export interface Detection {
  id: string;
  plate: string;
  timestamp: string;
  cameraId: string;
  location: string;
  speed?: number;
  confidence: number;
  vehicleType: string;
  vehicleColor: string;
}

export interface VehicleSighting {
  cameraId: string;
  cameraName: string;
  timestamp: string;
  location: string;
  status: StatusState;
  travelTime?: string;
  distance?: string;
}

export interface AlertItem {
  id: string;
  type: 'duplicate' | 'camera_fault' | 'speed_violation' | 'red_light' | 'anomaly';
  title: string;
  subtitle: string;
  time: string;
  severity: 'red' | 'amber' | 'green';
  plate?: string;
  status: 'Under Review' | 'Confirmed' | 'Resolved';
}

export interface TrackedObject {
  id: string;
  trackId: string;
  type: string;
  entryTime: string;
  exitTime?: string;
  direction: string;
  status: 'Exited' | 'Active';
}

export interface ReIDMetric {
  label: string;
  score: number;
  flagged?: boolean;
  flaggedReason?: string;
}

export type ScreenId =
  | 'login'
  | 'dashboard'
  | 'vehicles'
  | 'local_tracking'
  | 'reid'
  | 'trajectory_map'
  | 'trajectory_timeline'
  | 'camera_health'
  | 'travel_time'
  | 'congestion'
  | 'infrastructure'
  | 'police_deployment'
  | 'alerts'
  | 'evidence'
  | 'violations'
  | 'prediction'
  | 'green_corridor'
  | 'settings';
