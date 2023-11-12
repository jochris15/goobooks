import Rating from "react-rating"
import axios from 'axios';
import Swal from "sweetalert2";

export default function Card({ book, url }) {
    async function addToWishlist(id) {
        try {
            const { data } = await axios.post(`${url}/wishlist/${id}`);
            console.log(data);
            Swal.fire({
                icon: "success",
                title: data.message,
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: error.response.data.message,
            });
        }
    }

    return (<>
        <div className="card bg-base-100 shadow-2xl flex flex-row">
            <figure>
                <img
                    src={book.preview}
                    alt="book image"
                />
            </figure>
            <div className="card-body flex-1">
                <b className="card-title">{book.title}</b>
                <div className="flex-1">{book.author}</div>
                <Rating
                    placeholderRating={book.rating}
                    placeholderSymbol="fa fa-star"
                    emptySymbol="fa fa-star-o"
                    fullSymbol="fa fa-star"
                />
                <div className="items-end">
                    <button onClick={() => addToWishlist(book.id)} className="btn btn-primary">Add to Wishlist</button>
                </div>
            </div>
        </div>
    </>)
}