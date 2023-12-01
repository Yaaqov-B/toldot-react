import React from "react";

const SearchBox = (props) => {
    return (
        <div>
        <input
            id='search'
            type="text"
            placeholder="חפש..."
            value={props.value}
            onChange={props.onChange}
        />
        <button className="btn" onClick={props.handleClearSearchInput}>X</button>
        </div>
);
};

export default SearchBox;