import { Navigate, useRoutes } from "react-router-dom";
import { JobListing, PostJob } from "../pages";


const Routes = () => {
    return useRoutes([
        {
            path: "/",
            element: <JobListing />,
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
