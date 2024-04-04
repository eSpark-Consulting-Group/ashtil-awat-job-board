import { Navigate, useRoutes } from "react-router-dom";
import { Portal, PostJob } from "../components";

const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <Portal />,
        },
        {
            path: "/post-a-job",
            element: <PostJob />,
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ]);
};

export default Routes;
