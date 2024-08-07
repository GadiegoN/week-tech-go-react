import { createBrowserRouter } from "react-router-dom";
import { Room } from "./pages/room";
import { CreateRoom } from "./pages/create-room";
import { AppLayout } from "./pages/_layout/app";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <CreateRoom /> },
            { path: '/room/:roomId', element: <Room /> },
        ]
    }
])