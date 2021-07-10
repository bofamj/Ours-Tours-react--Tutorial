import React, { useState, useEffect } from 'react';
import Tours from './Tours';
import Loading from './Loading';

const url = 'https://course-api.com/react-tours-project';

function App() {
	const [ loading, setLoading ] = useState(true);
	const [ tours, setTours ] = useState([]);

	const removeTour = (id) => {
		const newTour = tours.filter((tour) => tour.id !== id);
		setTours(newTour);
	};

	const fetchTours = async () => {
		setLoading(false);

		try {
			const response = await fetch(url);
			const tours = await response.json();
			setLoading(false);
			setTours(tours);
		} catch (error) {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchTours();
	}, []);
	if (loading) {
		<main>
			<Loading />
		</main>;
	}
	if (tours.length === 0) {
		return (
			<main>
				<div className="title">
					<h1>no tours left</h1>
					<button className="btn" onClick={fetchTours}>
						relod
					</button>
				</div>
			</main>
		);
	}
	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	);
}

export default App;
