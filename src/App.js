import { useState, useEffect } from 'react';
import {notification} from '@tauri-apps/api';
import Clock from './Clock';
import alarmSound from './sounds/clock.wav';
import ProgressBar from './ProgressBar';

function App() {
    const options = [
        [25, 5],
        [50, 10]
    ];
    const [minutes, setMinutes] = useState(0.1);
    const [relaxingMinutes, setRelaxingMinutes] = useState(0.05);
    const [status, setStatus] = useState('working');
    const [pomodoro, setPomodoro] = useState(0);

    function work() {
        setStatus('working');
    }

    function drinkBeer() {
        setStatus('breaking');
        setPomodoro(pomodoro + 1);
    }

    function changeMode(workingMinutes, relaxingMinutes) {
        setMinutes(workingMinutes);
        setRelaxingMinutes(relaxingMinutes);
        setStatus('working');
    }

    function playSound() {
        const audio = new Audio('./sounds/clock.wav');
        audio.load();
        audio.play();
    }

    return (
        <div className="w-full h-screen bg-gray-800">
            <div className="container max-w-xl mx-auto flex items-center flex-col pt-10">
                <button onClick={() => playSound()} className="border p-2 hidden">Play sound</button>

                <Clock minutes={minutes} status={status} work={work} relax={drinkBeer} />

                <div className="block mt-20">
                    <div className="flex w-full justify-around space-x-5">
                        {
                            options.map(([w, r]) => (
                                <div
                                    onClick={() => changeMode(w, r)}
                                    className={`cursor-pointer px-10 text-2xl text-gray-700 font-mono py-3 transition hover:text-green-500 ${w === minutes ? 'text-white' : ''}`}>
                                    {w}/{r}
                                </div>
                            ))
                        }
                    </div>
                </div>

                <ProgressBar total={pomodoro} className="flex flex-col space-y-3 absolute bottom-3 right-3" />
            </div>
        </div>
    );
}


export default App;
