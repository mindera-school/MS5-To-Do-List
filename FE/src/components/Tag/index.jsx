import React from "react";
import {StyledTag} from "./styled-components.js";

export default function Tag({tagText, color, displayed}){
    return(
        <StyledTag tagColor = {color}>
            <h4> {tagText} </h4>
            {displayed}
        </StyledTag>
    );
}