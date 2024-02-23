import React from "react"

const Slider = ({ name, onChange, val, minVal = 0, maxVal = 100, className = "" }) => {
    return (
        <div className={`grid grid-cols-2 justify-items-stretch items-stretch ${className}` } style={{gridTemplateColumns: "1fr 10fr"}}>
            <label className="text-center">{name}:{val}</label>
            <div className="flex-1 grid grid-cols-3 justify-items-stretch" style={{gridTemplateColumns: "1fr 5fr 1fr"}}>
                <div className="text-center">{minVal}</div>
                <input name={name} type="range" value={val} min={minVal} max={maxVal} className="mx-2 flex-1" id="myRange" onChange={onChange} />
                <div className="text-center">{maxVal}</div>
            </div>

        </div>
    )
}

export default Slider;