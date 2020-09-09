import React, { useState } from "react"
import { Star } from 'react-bootstrap-icons';


interface IProps {
    stars: number,
    starsColor?: string
}



export enum StarColors {
    primary = "red",
    secondary = "blue"
}

export default function Rank(props: IProps) {
    // const [starColor, setStarColor] = useState(StarColors.primary)
    // function changeStartsColor() {
    //     const color = starColor === StarColors.primary ? StarColors.secondary : StarColors.primary
    //     setStarColor(color)
    // }
    const numberOfStars = new Array(props.stars).fill(true, 0)
    return <div>
        {numberOfStars.map((_, index) => <Star key={index} fill={props.starsColor || "yellow"} onClick={() => { }} />)}
    </div>
} 