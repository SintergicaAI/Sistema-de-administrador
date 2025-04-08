import {Route, Routes} from "react-router";
import ModelOverview from "../../../pages/ModelOverview.tsx";
import {ModelDetail} from "../../../pages/ModelDetail.tsx";
import {KnowledgeOverview} from "../../../pages/knowledgeOverview.tsx";

export const WorkspaceRoutes = () =>{
    return (
        <Routes>
            <Route index element={<ModelOverview/>}/>
             <Route path={"models"}>
                <Route index element={
                    <ModelOverview/>
                }/>
                <Route path=":id" element={<ModelDetail/>}/>
                </Route>
            <Route path={"knowledge"} element={<KnowledgeOverview/>}/>
        </Routes>
    )
}