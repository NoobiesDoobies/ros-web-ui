import React from "react";
import { useState, useEffect } from "react";

import MotorComponent from "../components/MotorComponent";

const Motor = () => {
    const [numMotor, setNumMotor] = useState(4);

    return (
        <div className="flex-1 flex w-100 h-100">
            <div className="flex-1 grid grid-rows-2 grid-cols-2 gap-4 bg-black items-center p-4 justify-items-center">
                {
                    <>
                        <MotorComponent motorName="Motor FL" />
                        <MotorComponent motorName="Motor FR" />
                        <MotorComponent motorName="Motor BL" />
                        <MotorComponent motorName="Motor BR" />
                    </>
                }
            </div>
        </div>
    );
}

export default Motor;