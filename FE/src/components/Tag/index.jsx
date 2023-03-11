import React from "react";

export default function Tag({tagText, color}){
    const tagColor = "task-tag--"+color;
    return(
        <div className={tagColor}>
            <h4> {tagText} </h4>
        </div>
    );
}