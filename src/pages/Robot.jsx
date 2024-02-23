import React, { useState } from 'react';
import BatteryGauge from 'react-battery-gauge';
import Map from '../components/Map';
import RobotState from '../components/RobotState';

const Robot = () => {
    const [team, setTeam] = useState("Red");

    const toggleTeam = () => {
        setTeam(team === 'Red' ? 'Blue' : 'Red');
    }

    return (
        <div className='max-h-full flex flex-col'>
            <div className="flex justify-between h-3/4 mt-4 p-4">
                <div className="flex justify-center items-center w-1/2">
                    <img src="/assets/lapangan_KRAI.jpg" alt="Lapangan KRAI" className="max-h-full" />
                </div>
                <div className="p-4 flex justify-center items-center w-1/2">
                    <Map />
                </div>
            </div>

            <div className='grid grid-cols-3 grid-gap-3 mx-4 items-center h-20'>
                <div className='mx-10'>
                    Team:
                    {
                        team=="Red"? <button className='bg-red-500 py-1 px-2 rounded-md w-16 mx-4' onClick={toggleTeam}>{team}</button>
                        :
                        <button className='bg-blue-500 py-1 px-2 rounded-md w-16 mx-4' onClick={toggleTeam}>{team}</button>
                    }
                </div>
                <RobotState />

                <div className='flex justify-end '>
                    <BatteryGauge value={67} size={100} />
                </div>
            </div>

        </div>

    );
}

export default Robot;
