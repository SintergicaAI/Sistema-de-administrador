import { Route, Routes } from "react-router";
import { CompanyListView } from "../../../views/Company/CompanyListView";
import { Company } from "../../../pages/home/Company";


export const CompanyRoutes = () => {
    return (
        <Routes>
            <Route element={<Company />}>
                <Route
                    index
                    element={<CompanyListView />}
                />

            </Route>
        </Routes>
    );
};