import React, { useEffect } from "react"
import { useState } from "react";
import Chart from 'react-apexcharts'

import Slider from "../shared/Slider";

const dampingRatio = 0.7;
const naturalFrequency = 2;
const setpoint = Math.random() * 1 + 30
console.log(setpoint)
const noiseMagnitude = 0.1

function generateSetPointData(n) {
    let data = []
    for (let i = 0; i < n; i++) {
        data.push(setpoint)
    }
    return data
}

function generateRandData(n) {
    let data = []
    let currentValue = Math.random() * 2 - 1;
    let currentVelocity = 0;
    for (let i = 0; i < n; i++) {
        // Calculate error (difference from setpoint)
        const error = setpoint - currentValue;
      
        // Calculate control effort (velocity)
        const controlEffort = -2 * dampingRatio * naturalFrequency * currentVelocity +
                               naturalFrequency * naturalFrequency * error;
      
        // Update velocity using Euler integration
        currentVelocity += controlEffort * 0.1; // Assuming a time step of 0.1 (adjust as needed)
      
        // Add noise to velocity
        currentVelocity += (Math.random() * 2 - 1) * noiseMagnitude;
      
        // Update value using Euler integration
        currentValue += currentVelocity * 0.1; // Assuming a time step of 0.1 (adjust as needed)
      
        // Add noise to value
        currentValue += (Math.random() * 2 - 1) * noiseMagnitude;
      
        // Store the current value
        data.push(currentValue);
      }
    return data
}

const MotorComponent = ({ motorName }) => {
    const [nData, setnData] = useState(20);
    const [data, setData] = useState(generateRandData(nData))

    const [pidConfig, setPidConfig] = useState({
        p: 0,
        i: 0,
        d: 0
    });
    const [options, setOptions] = useState({
        borderWidth: 50,
        borderStyle: 'solid',
        borderColor: '#FFFFFF',
        title: {
            show: true,
            text: motorName,
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#FFFFFF'
            }

        },

        xaxis: {
            show: true,
            labels: {
                style: {
                    colors: '#FFFFFF'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },

        yaxis: {
            show: true,
            labels: {
                style: {
                    colors: '#FFFFFF'
                }
            },

        },
        chart: {
            id: 'apexchart-example',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },

            stroke: {
                curve: 'smooth'
            },
            background: "#000000",

        },

    });
    const [series, setSeries] = useState(
        [
            {
                name: 'output',
                data:  data,

            },
            {
                name: 'setpoint',
                data: generateSetPointData(nData)
            }
        ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setData((d)=>{
                let newData = d.slice()
                newData.push(d[d.length-1] + Math.random()*2-1)
                newData.shift()

                return(newData)

            })
        }, 100);
        return () => clearInterval(interval);
    }, []);

    useEffect(()=>{
        console.log(data)
        setSeries(series.map((s, i) => {
            if(i!=0){
                return{
                    ...s,
                }
            }
            
            return {
                name: s.name,
                data: data
            }
        }))
    }, [data])

    return (
        <div className="bg-black p-4 text-center rounded-xl">
            <Chart
                options={options}
                series={series}
                type="line"
                width={800}
                height={320}
            />
            <div className="flex flex-row justify-between items-center">

                <Slider className="text-white border-2 " name="P" onChange={(e) => console.log(e.target.value)} />
                <Slider className="text-white border-2 " name="I" onChange={(e) => console.log(e.target.value)} />
                <Slider className="text-white border-2 " name="D" onChange={(e) => console.log(e.target.value)} />

            </div>
        </div>
    )
}

export default MotorComponent;