import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton.js';
import 'react-circular-progressbar/dist/styles.css';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../contexts/SettingsContext';
import bell from '../sounds/bell.mp3';

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const audio = new Audio(bell);

  const playSound = (sound) => sound.play();
  function switchMode() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds =
      (nextMode === 'work'
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  function initTimer() {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
  }

  function tick() {
    setSecondsLeft(secondsLeftRef.current--);
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        playSound(audio);
        return switchMode();
      }
      tick();
    }, 100);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === 'work'
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;

  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = '0' + seconds;
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          pathColor: mode === 'work' ? '#f54e4e' : '#4aec8c',
          textColor: '#fff',
          tailColor: '#rgba(255, 255, 255, .2)',
        })}
      />
      <div>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>

      <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
    </div>
  );
}

export default Timer;
