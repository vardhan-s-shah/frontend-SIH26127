import React, { useState } from 'react';
import { ScreenId } from './types';
import { AppLayout } from './components/layout/AppLayout';
import { AppLoadingScreen } from './pages/AppLoadingScreen';
import { LoginScreen } from './pages/LoginScreen';
import { DashboardScreen } from './pages/DashboardScreen';
import { VehiclesScreen } from './pages/VehiclesScreen';
import { LocalTrackingScreen } from './pages/LocalTrackingScreen';
import { CrossCamReIDScreen } from './pages/CrossCamReIDScreen';
import { TrajectoryMapScreen } from './pages/TrajectoryMapScreen';
import { TrajectoryTimelineScreen } from './pages/TrajectoryTimelineScreen';
import { CameraHealthScreen } from './pages/CameraHealthScreen';
import { TravelTimeScreen } from './pages/TravelTimeScreen';
import { CongestionAnalyticsScreen } from './pages/CongestionAnalyticsScreen';
import { InfrastructureScreen } from './pages/InfrastructureScreen';
import { PoliceDeploymentScreen } from './pages/PoliceDeploymentScreen';
import { AlertsScreen } from './pages/AlertsScreen';
import { EvidenceViewerScreen } from './pages/EvidenceViewerScreen';
import { ViolationDetectionScreen } from './pages/ViolationDetectionScreen';
import { TrajectoryPredictionScreen } from './pages/TrajectoryPredictionScreen';
import { GreenCorridorScreen } from './pages/GreenCorridorScreen';
import { SettingsScreen } from './pages/SettingsScreen';

import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');

  const handleNavigate = (screen: ScreenId) => {
    if (screen === 'login') {
      setIsLoggedIn(false);
    } else {
      setCurrentScreen(screen);
    }
  };

  const handleLogout = () => setIsLoggedIn(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  return (
    <>
      {isAppLoading && (
        <AppLoadingScreen onComplete={() => setIsAppLoading(false)} />
      )}

      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AppLayout
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        >

          {currentScreen === 'dashboard'           && <DashboardScreen onNavigate={handleNavigate} />}
          {currentScreen === 'vehicles'            && <VehiclesScreen onNavigate={handleNavigate} />}
          {currentScreen === 'local_tracking'      && <LocalTrackingScreen onNavigate={handleNavigate} />}
          {currentScreen === 'reid'                && <CrossCamReIDScreen onNavigate={handleNavigate} />}
          {currentScreen === 'trajectory_map'      && <TrajectoryMapScreen onNavigate={handleNavigate} />}
          {currentScreen === 'trajectory_timeline' && <TrajectoryTimelineScreen onNavigate={handleNavigate} />}
          {currentScreen === 'camera_health'       && <CameraHealthScreen onNavigate={handleNavigate} />}
          {currentScreen === 'travel_time'         && <TravelTimeScreen onNavigate={handleNavigate} />}
          {currentScreen === 'congestion'          && <CongestionAnalyticsScreen onNavigate={handleNavigate} />}
          {currentScreen === 'infrastructure'      && <InfrastructureScreen onNavigate={handleNavigate} />}
          {currentScreen === 'police_deployment'   && <PoliceDeploymentScreen onNavigate={handleNavigate} />}
          {currentScreen === 'alerts'              && <AlertsScreen onNavigate={handleNavigate} />}
          {currentScreen === 'evidence'            && <EvidenceViewerScreen onNavigate={handleNavigate} />}
          {currentScreen === 'violations'          && <ViolationDetectionScreen onNavigate={handleNavigate} />}
          {currentScreen === 'prediction'          && <TrajectoryPredictionScreen onNavigate={handleNavigate} />}
          {currentScreen === 'green_corridor'      && <GreenCorridorScreen onNavigate={handleNavigate} />}
          {currentScreen === 'settings'            && <SettingsScreen onNavigate={handleNavigate} />}
        </AppLayout>
      )}
    </>
  );
}

export default App;
