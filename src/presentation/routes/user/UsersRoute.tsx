import {Route, Routes} from "react-router";
import {Register} from "../../pages/auth/Register.tsx";
import {RegisterLayout} from "../../Layout/RegisterLayout.tsx";

export const UsersRoute = ()=>{
    return (<Routes>

        <Route path='register' element={<RegisterLayout>
            <Register/>
        </RegisterLayout>} />

    </Routes>)
};