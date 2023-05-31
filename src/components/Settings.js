import { useContext } from 'react';
import ReactSlider from 'react-slider';
import SettingsContext from '../contexts/SettingsContext';
import BackButton from './BackButton';

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div className="settings">
      <label>Work duration(min): {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        classname="slider"
        thumbClassName="thumb"
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        min={1}
        max={90}
        onChange={(newValue) => {
          settingsInfo.setWorkMinutes(newValue);
          localStorage.setItem('work', newValue);
        }}
      />
      <label>Break duration(min): {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className="slider green"
        thumbClassName="thumb"
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        min={1}
        max={30}
        onChange={(newValue) => {
          settingsInfo.setBreakMinutes(newValue);
          localStorage.setItem('break', newValue);
        }}
      />
      <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
    </div>
  );
}

export default Settings;
