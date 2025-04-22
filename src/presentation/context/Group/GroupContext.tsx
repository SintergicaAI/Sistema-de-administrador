import {createContext} from "react";

interface GroupContextType {
    totalGroups: number,
    setTotalGroups:(newTotalGroups: number) => void,
}

export const GroupContext = createContext<GroupContextType|null>(null)