import { createBrowserRouter, redirect } from "react-router-dom";
import Parent from "../views/Parent";
import Home from "../views/Home";
import Wishlist from "../views/Wishlist";
const SERVER_URL = "http://34.87.75.188";

const router = createBrowserRouter([
    {
        element: <Parent />,
        children: [
            { path: "books", element: <Home url={SERVER_URL} /> },
            { path: "wishlist", element: <Wishlist url={SERVER_URL} /> }
        ]
    },
    // "/" will redirect to /books
    {
        path: "/",
        loader: () => redirect("/books")
    },
    // any other URLs will redirect to /books
    {
        path: "*",
        loader: async () => {
            return redirect('/books')
        },
    }
]);

export default router;