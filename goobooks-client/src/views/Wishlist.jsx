import WishlistCard from "../components/WishlistCard"
import axios from 'axios';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import gearLoad from "./assets/Gear-0.2s-264px.svg"

export default function Wishlist({ url }) {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false)

    async function fetchWishlist() {
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/wishlist`);
            console.log(data, "data awal <<<<<");
            setWishlist(data);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchWishlist();
    }, [])

    if (wishlist.length == 0) {
        return (
            <>
                <h1 className="mt-60 text-5xl flex justify-center items-center">You don't have any wishlist</h1>
            </>
        )
    }

    return (
        <>
            <>
                {loading ? (
                    <div className="mt-28 flex justify-center items-center">
                        <img src={gearLoad} />
                    </div>
                ) : (
                    <div id="PAGE-HOME" className="">
                        {/* main content */}
                        <main className="grid grid-cols-4 gap-5 px-10 my-8 bg-base-100">
                            {wishlist.map(wishlist => {
                                return <WishlistCard key={wishlist.id} wishlist={wishlist} fetchWishlist={fetchWishlist} url={url} />
                            })}
                        </main>
                    </div>
                )}

            </>
        </>
    )
}