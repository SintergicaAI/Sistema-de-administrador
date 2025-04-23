import {Route, Routes} from "react-router";
import {GroupsListView} from "../../../views/Groups/GroupsListView.tsx";
import {Groups} from "../../../pages/home/Groups.tsx";
import {GroupInfoVIew} from "../../../views/Groups/GroupInfoVIew.tsx";

export const GroupsRoutes = ()=>{
    return (
        <Routes>
                <Route element={<Groups/>}>
                    <Route index element=
                        {
                        <GroupsListView/>
                        }
                    />
                    <Route path='/:nameGroup' element={<GroupInfoVIew/>}/>
                </Route>
        </Routes>
    )
}