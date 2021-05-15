import { useState, useEffect } from 'react';
import useInterval from './hooks/useInterval';

function App() {
  const workingMinutes = 0.05;
  const relaxingMinutes = 0.1;
  const [minutes, setMinutes] = useState(workingMinutes);
  const [status, setStatus] = useState('working');

  function work() {
    setStatus('working');
    setMinutes(workingMinutes);
  }

 function drinkBeer() {
    setStatus('breaking');
    setMinutes(relaxingMinutes);
  }

  return (
    <div className="App bg-cyan-500">
      <div className="container">
        Minutes: <input type="number" className="border" value={minutes}
          onChange={(e) => setMinutes(e.target.value)} />
        <div>{minutes}</div>
        <div>{status}</div>
        <Clock minutes={minutes} status={status} work={work} relax={drinkBeer} />
      </div>
    </div>
  );
}

function Clock({ minutes, status, work, relax }) {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    setSeconds(minutes * 60);
  }, [minutes, status]);

  console.log(seconds);

  useInterval(() => {
    setSeconds(seconds - 1)
    if (seconds === 0) {
      if (status === 'working') {
        setRunning(true);
        relax();
      } else {
        setRunning(false);
        work();
      }
    }
  }, running ? 1000 : null);

  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <div className="clock relative bg-white w-64 h-64 mx-auto rounded-full flex items-center cursor-pointer overflow-hidden">
        <div className="bg-cyan-500 w-60 h-60 mx-auto rounded-full flex items-center">
        </div>
        <div className="absolute w-full font-mono text-center text-white text-4xl tracking-wide">
          {seconds > 0 ? formatTime(seconds) : '00:00'}
        </div>

        <div className="pla-button absolute rounded-full w-full h-full" onClick={() => setRunning(!running)}>
          <svg xmlns="http://www.w3.org/2000/svg"
            className={`absolute top-1/2 left-1/2 -mt-12 -ml-12 h-24 w-24 transition text-gray-900 opacity-50 hover:text-gray-600 cursor-pointer ${running ? 'invisible' : 'visible'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

      </div>
      <button type="button" className="border p-3"
        onClick={() => setRunning(!running)}>
        {running ? 'pause' : 'start'}
      </button>
    </div>
  );
}

export default App;
