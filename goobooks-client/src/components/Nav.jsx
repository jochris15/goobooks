import { Link } from "react-router-dom";

export default function Nav() {
    return (<>
        <nav className="navbar sticky top-0 z-10 p-3 bg-base-200 shadow">
            <div className="navbar-center">
                <Link to="/books" className="text-4xl font-bold px-6">
                    <span className="text-blue-500">G </span>
                    <span className="text-red-500">O </span>
                    <span className="text-yellow-500">O </span>
                    <span className="text-accent">B O O K S</span>
                </Link>
            </div>
            <div className="navbar-center">
                <Link to="/wishlist" className="btn btn-ghost px-6">Wishlist</Link>
            </div>
        </nav>
    </>)
}