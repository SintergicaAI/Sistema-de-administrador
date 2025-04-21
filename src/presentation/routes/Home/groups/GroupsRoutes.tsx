import {Route, Routes} from "react-router";
import {GroupsListView} from "../../../views/Groups/GroupsListView.tsx";
import {Groups} from "../../../pages/home/Groups.tsx";

export const GroupsRoutes = ()=>{
    return (
        <Routes>
            <Route element={<Groups/>}>
                <Route index element={<GroupsListView/>}/>
            </Route>
        </Routes>
    )
}