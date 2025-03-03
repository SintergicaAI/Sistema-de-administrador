import {ReactNode} from "react";

type Props = {
    children: ReactNode,

}

export const RadioGroup = ({children}:Props) =>{
    return (
        <div
            style={{display: "flex", flexDirection: "column", gap:3}}
        >
            {children}
        </div>
    )
}