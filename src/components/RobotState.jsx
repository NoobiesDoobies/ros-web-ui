import React from "react";
import { useState, useEffect } from "react";
import ROSLIB from "roslib";
import * as Three from "three"

import Config from "../scripts/Config";

const RobotState = () => {
    const [connected, setConnected] = useState(false);
    const [ros, setRos] = useState(new ROSLIB.Ros());
    const [timer, setTimer] = useState(null);
    const [state, setState] = useState({
        x: 0,
        y: 0,
        orientation: 0,
        linear_velocity: 0,
        angular_velocity: 0
    })

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

    const getOrientationFromQuaternion = (ros_orientation_quaternion) => {
        var q = new Three.Quaternion(
            ros_orientation_quaternion.x,
            ros_orientation_quaternion.y,
            ros_orientation_quaternion.z,
            ros_orientation_quaternion.w
        )

        var RPY = new Three.Euler().setFromQuaternion(q)

        return RPY["_z"] * (180/Math.PI)
    }

    useEffect(() => {
        initRosConnection();

        const pose_subscriber = new ROSLIB.Topic({
            ros: ros,
            name: Config.POSE_TOPIC,
            messageType: Config.POSE_TOPIC_MESSAGE_TYPE
        })

        pose_subscriber.subscribe((message)=>{
            console.log(message.pose.pose)
            setState({
                x: message.pose.pose.position.x.toFixed(2),
                y: message.pose.pose.position.y.toFixed(2),
                orientation: getOrientationFromQuaternion(message.pose.pose.orientation).toFixed(2)
            })
        })
        

        const velocity_subscriber = new ROSLIB.Topic({
            ros: ros,
            name: "/odom",
            messageType: "nav_msgs/Odometry"
        })

        velocity_subscriber.subscribe((message)=>{
            setState((prevState)=>({
                ...prevState,
                linear_velocity: message.twist.twist.linear.x.toFixed(2),
                angular_velocity: (message.twist.twist.angular.z * 180/Math.PI ).toFixed(2)
            }))
        })
    }, [])


    return (
        <div className='grid grid-cols-6 m-3 justify-items-center'>
            <div>x: {state.x} m  </div>
            <div>y: {state.y} m  </div>
            <div>θ: {state.orientation}°   </div>
            <div>v: {state.linear_velocity} m/s  </div>
            <div>ω: {state.angular_velocity} °/s  </div>
        </div>
    )


}

export default RobotState