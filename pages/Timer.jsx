import React, { useState, useEffect, useRef } from 'react';

const Timer = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Create audio context for beep sound
  useEffect(() => {
    const createBeepSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    };

    audioRef.current = createBeepSound;
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            // Play sound
            if (audioRef.current) {
              audioRef.current();
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsActive(true);
      setIsCompleted(false);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setIsCompleted(false);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? ((minutes * 60 + seconds - timeLeft) / (minutes * 60 + seconds)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl border border-gray-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Timer</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </div>

        {/* Time Display */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-mono font-bold mb-4 transition-colors duration-300 ${
            isCompleted ? 'text-green-500 animate-pulse' : 
            isActive ? 'text-gray-800' : 'text-gray-500'
          }`}>
            {timeLeft > 0 ? formatTime(timeLeft) : formatTime(minutes * 60 + seconds)}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {isCompleted && (
            <div className="text-green-500 font-semibold animate-bounce">
              Time's Up! 🎉
            </div>
          )}
        </div>

        {/* Time Input */}
        {!isActive && timeLeft === 0 && (
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-6">
              <div className="text-center">
                <label className="block text-white text-sm font-medium mb-2">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="text-center">
                <label className="block text-white text-sm font-medium mb-2">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-20 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Time Buttons */}
        {!isActive && timeLeft === 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '1 min', mins: 1, secs: 0 },
                { label: '5 min', mins: 5, secs: 0 },
                { label: '10 min', mins: 10, secs: 0 },
                { label: '15 min', mins: 15, secs: 0 },
                { label: '30 min', mins: 30, secs: 0 },
                { label: '1 hr', mins: 60, secs: 0 }
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setMinutes(preset.mins);
                    setSeconds(preset.secs);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          {!isActive && timeLeft === 0 ? (
            <button
              onClick={startTimer}
              disabled={minutes === 0 && seconds === 0}
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Timer
            </button>
          ) : (
            <>
              <button
                onClick={isActive ? pauseTimer : startTimer}
                className="px-8 py-3 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isActive ? 'Pause' : 'Resume'}
              </button>
              <button
                onClick={resetTimer}
                className="px-8 py-3 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Reset
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Set your time and start focusing! 🕰️
        </div>
      </div>
    </div>
  );
};

export default Timer;