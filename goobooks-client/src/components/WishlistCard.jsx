import Rating from "react-rating"
import axios from 'axios';
import Swal from "sweetalert2";

export default function Card({ wishlist, fetchWishlist, url }) {

    async function removeWishlist(id) {
        try {
            const { data } = await axios.delete(`${url}/wishlist/${id}`);
            console.log(data);
            Swal.fire({
                icon: "success",
                title: data.message,
            });
            fetchWishlist()
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    }

    return (<>
        <div className="card bg-base-100 shadow-xl flex flex-row">
            <figure>
                <img
                    src={wishlist.preview}
                    alt="wishlist image"
                />
            </figure>
            <div className="card-body flex-1">
                <b className="card-title">{wishlist.title}</b>
                <div className="flex-1">{wishlist.author}</div>
                <Rating
                    placeholderRating={wishlist.rating}
                    placeholderSymbol="fa fa-star"
                    emptySymbol="fa fa-star-o"
                    fullSymbol="fa fa-star"
                />
                <div className="items-end">
                    <button onClick={() => { removeWishlist(wishlist.id) }} className="btn btn-accent text-gray-800">Remove</button>
                </div>
            </div>
        </div>
    </>)
}