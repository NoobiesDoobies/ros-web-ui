import React from 'react';
import { useState, useEffect } from "react";
import ROSLIB from "roslib";

import Config from "../scripts/Config";

const Map = () => {
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

    const viewMap = () => {
        const viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480
        });

        const navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: ros,
            rootObject: viewer.scene,
            viewer: viewer,
            continuous: true,
            severName: "/move_base",
            withOrienation: true,
        });
    }

    useEffect(() => {
        initRosConnection();
        viewMap();
    }, [])




    return (
        <div id="nav_div"></div>
    );
}

export default Map;