// Custom Hook to allow D3 to interact directly with the DOM

// Package Imports
import {useEffect, useRef} from "react";
import * as d3 from 'd3';

// Local Imports


// useD3 Hook Component

const useD3 = (renderingFunction, dependencies) => {
    // Create Reference
    const ref = useRef();

    useEffect(() => {
        renderingFunction(d3.select(ref.current));
        return () => {};
    }, [dependencies])
}

export default useD3;