import React from "react";
import { useState, useEffect } from "react";
import ROSLIB from "roslib";

import Config from "../scripts/Config";
const Connection = () => {
    const [connected, setConnected] = useState(false);
    const [ros, setRos] = useState(new ROSLIB.Ros());
    const [timer, setTimer] = useState(null);

    const initRosConnection = () => {
        console.log("Connecting to ROS");
        ros.on("connection", () => {
            console.log("Connected to ROS");
            clearTimeout(timer);
            setConnected(true)
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
            setConnected(false)
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


    useEffect(() => {
        initRosConnection();
    }, [])

    return (
        <>
            {
                connected ?
                    <h1 className="p-1 text-center bg-lime-300 text-black">Connected</h1> :
                    <h1 className="p-1 text-center bg-rose-600">Disconnected</h1>
            }
        </>

    );
}

export default Connection;