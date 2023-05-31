import Timer from './Timer';
import Settings from './Settings';
import { useState } from 'react';
import SettingsContext from '../contexts/SettingsContext';

function App() {
  const workInitial = localStorage.getItem('work')
    ? Number(localStorage.getItem('work'))
    : 25;

  const breakInitial = localStorage.getItem('break')
    ? Number(localStorage.getItem('break'))
    : 15;

  const lightThemeInitial = localStorage.getItem('theme')
    ? localStorage.getItem('theme') === 'true'
    : false;

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(workInitial);
  const [breakMinutes, setBreakMinutes] = useState(breakInitial);
  const [lightTheme, setLightTheme] = useState(lightThemeInitial);

  return (
    <main className={`page${lightTheme ? ' light-theme' : ''}`}>
      <div className="container">
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
            lightTheme,
            setLightTheme,
          }}
        >
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
    </main>
  );
}

export default App;
