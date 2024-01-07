import React from "react";
import "./styles.css";
import Graph from "react-graph-vis";



const VisualGraph = ({ elements }) => {
    const options = {

        layout: {
            hierarchical: {
                direction: "UD", // UD or LR
                // sortMethod: "directed", // directed or undirected
                levelSeparation: 150,
                // nodeSpacing: 100,
                // treeSpacing: 200,
                // blockShifting: false,
                // edgeMinimization: false,
                // parentCentralization: false,
                // direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'hubsize',  // hubsize, directed
                // shakeTowards: 'leaves'  // roots, leaves
            },
        },

        nodes: {
            // shape: "circle",
            // size: 30,
            // font: {
            //     size: 14,
            // },
        },
        // edges: {
        //     width: 2,
        //     color: "#ccc",
        // },
        physics: {
            enabled: true,
            // repulsion: {
            //     centralGravity: 0,
            //     springLength: 10,
            //     springConstant: 0.99,
            //     nodeDistance: 1,
            //     damping: 0.89
            // },
            hierarchicalRepulsion: {
                centralGravity: 0.3,
                springLength: 600,
                springConstant: 0.0001,
                nodeDistance: 80,
                damping: 0.09,
                avoidOverlap: 1
            },
            maxVelocity: 50,
            minVelocity: 0.1,
            solver: 'hierarchicalRepulsion',
            stabilization: {
                enabled: true,
                iterations: 1000,
                updateInterval: 100,
                onlyDynamicEdges: false,
                fit: true
            },
            timestep: 0.5,
            adaptiveTimestep: true,
            wind: { x: 0, y: 0 }
        },
        interaction:{
            dragNodes:true,
            dragView: true,
            hideEdgesOnDrag: false,
            hideEdgesOnZoom: false,
            hideNodesOnDrag: false,
            hover: false,
            hoverConnectedEdges: true,
            keyboard: {
                enabled: false,
                speed: {x: 10, y: 10, zoom: 0.02},
                bindToWindow: true,
                autoFocus: true,
            },
            multiselect: false,
            navigationButtons: false,
            selectable: true,
            selectConnectedEdges: true,
            tooltipDelay: 300,
            zoomSpeed: 1,
            zoomView: true
        },
        edges: {
            color: "#000000"
        },
        // height: "500px"

    };

    const events = {
        // select: function(event) {
        //     const { nodes, edge } = event;
        // }
    };
    return (
        <div style={{ width: "100vw", height: "80vh" }}>
        <Graph
            graph={elements}
            options={options}
            events={events}
            getNetwork={() => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
        </div>
    );
};



export default VisualGraph;
