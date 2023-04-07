import React from "react";
import {StyledTag} from "./styled-components.js";

export default function Tag({tagText, color, displayed, display}){
    return(
        <StyledTag tagColor = {color} display={display}> 
            <h4> {tagText} </h4>
            {displayed}
        </StyledTag>
    );
}