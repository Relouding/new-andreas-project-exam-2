import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants/api";
import { Link } from "react-router-dom";

export default function ViewPage() {
	const [page, setPage] = useState(null);
	const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

	let { id } = useParams();

	useEffect(
		function () {
			async function getPage() {
				try {
					const response = await fetch(BASE_URL + "wp/v2/hotel/" + id);
					const json = await response.json();

				    setPage(json);

				} catch (error) {
					console.log(error);
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}

			getPage();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	if (loading) return <div>Loading establishment...</div>;

	if (error) return <div>{}</div>;

	return (
		<>
			<div key={page.id}>
                <p>{page.hotel_name}</p>
                <p>{page.hotel_description}</p>
				<div>
				<Link to="/booking">
				    Booking
			    </Link>
				</div>
            </div>
        </>
	);
}