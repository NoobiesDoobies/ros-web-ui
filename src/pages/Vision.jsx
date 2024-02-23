import React, { useEffect } from 'react';
import { useState } from 'react';
import ROSLIB from 'roslib';
import ReactModal from 'react-modal';

import Config from '../scripts/Config';
import Slider from '../shared/Slider';



const Vision = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ros, setRos] = useState(new ROSLIB.Ros());
    const [timer, setTimer] = useState(null);
    const [hsvConfig, setHsvConfig] = useState({
        hl: { name: "hl", value: 0, },
        hh: { name: "hh", value: 255, },
        sl: { name: "sl", value: 0, },
        sh: { name: "sh", value: 255, },
        vl: { name: "vl", value: 0, },
        vh: { name: "vh", value: 255, },

    });

    const initRosConnection = () => {
        console.log("Connecting to ROS");
        ros.on("connection", () => {
            console.log("Connected to ROS");
            clearTimeout(timer);
        });

        ros.on("close", () => {
            console.log("Disconnected from ROS");
            setTimer(setTimeout(() => {
                try {
                    console.log("connecting")
                    ros.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`)
                } catch (e) {
                    console.error(e)
                }
            }
                , Config.RECONNECTION_TIMER));
        });

        ros.on("error", (error) => {
            console.log("Error connecting to ROS: ", error);
        });

        try {
            ros.connect(`ws://${Config.ROSBRIDGE_SERVER_IP}:${Config.ROSBRIDGE_SERVER_PORT}`)
        } catch (e) {
            console.error(e)
        }
    }


    const slidersOnChange = (e) => {
        const { name, value } = e.target;
        setHsvConfig(prevState => ({
            ...prevState,
            [name]: { ...prevState[name], value: parseInt(value) }
        }));

    }


    useEffect(() => {
        initRosConnection();
    }, [])

    useEffect(() => {
        const hsvConfigPub = new ROSLIB.Topic({
            ros: ros,
            name: Config.HSV_CONFIG_TOPIC,
            messageType: Config.HSV_CONFIG_TOPIC_MESSAGE_TYPE
        });

        const hsvConfigMsg = new ROSLIB.Message({
            data: [hsvConfig.hl.value, hsvConfig.hh.value, hsvConfig.sl.value, hsvConfig.sh.value, hsvConfig.vl.value, hsvConfig.vh.value]
        });

        hsvConfigPub.publish(hsvConfigMsg);

        console.log(hsvConfig.hl.value, hsvConfig.hh.value, hsvConfig.sl.value, hsvConfig.sh.value, hsvConfig.vl.value, hsvConfig.vh.value)
    })

    const openModal = () => {
        setModalIsOpen(true)
        alert("HSV Config Saved")
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <div className='flex-1 flex flex-col'>

            <div className="flex-1 flex justify-around items-center m-2">
                <img
                    src={`http://${Config.ROSBRIDGE_SERVER_IP}:${Config.IMAGE_STREAM_SERVER_PORT}/stream?topic=${Config.IMAGE_RAW_TOPIC}`} alt="Vision"

                    className="border-4 rounded-lg w-2/4 border-white"
                />

                <div className="flex flex-col justify-center items-stretch">
                    {
                        Object.keys(hsvConfig).map((key) => {
                            return <Slider key={key} name={hsvConfig[key].name} val={hsvConfig[key].value} className="p-2" onChange={slidersOnChange} minVal={0} maxVal={255} />
                        })
                    }
                    <button className="bg-blue-500 p-2 m-2 rounded-xl self-center w-16 text-white" onClick={openModal}>Save</button>


                </div>

            </div>
        </div>
    );
}

export default Vision;