import React, { createContext, useState, useEffect } from "react";

export let DataContext = createContext();

export let DataProvider = (props) => {


    const colors = ["green", "blue", "red", "yellow", "purple", "pink"]
    const [markers, setMarkers] = useState(JSON.parse(localStorage.getItem("markers")) || [])
    useEffect(() => {
        localStorage.setItem("markers", JSON.stringify(markers))
    }, [markers])



    return (
        <DataContext.Provider
            value={{ markers, setMarkers, colors }}
        >
            {props.children}
        </DataContext.Provider>
    );
};