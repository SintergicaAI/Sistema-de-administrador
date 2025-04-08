import {Route, Routes} from "react-router";
import {Home} from "../../pages/home/Home.tsx";
import UserProfile from "../../pages/UserProfile.tsx";
import {Administration} from "../../pages/home/Administration.tsx";
import {Navigate} from "react-router-dom";


export const HomeRoutes = () =>{
    return (
        <Routes>
            <Route element={<Home/>}>
                <Route index element={<UserProfile userId={"1"}/>}/>
                <Route path="administration" element={<Administration texto="Mi equipo"/>} />
                {/*<Route path="workspace" element={<WorkspaceRoutes/>}/>*/}

                <Route path="/*" element={<Navigate to="/"/>} />
            </Route>
        </Routes>
    )
}