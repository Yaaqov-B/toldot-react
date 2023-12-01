import React from "react";
import "./styles.css";
import Graph from "react-graph-vis";



const VisualGraph = ({ elements }) => {
    const options = {
        layout: {
            hierarchical: true
        },
        edges: {
            color: "#000000"
        },
        height: "500px"
    };

    const events = {
        // select: function(event) {
        //     const { nodes, edge } = event;
        // }
    };
    return (
        <Graph
            graph={elements}
            options={options}
            events={events}
            getNetwork={() => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );
};



export default VisualGraph;
