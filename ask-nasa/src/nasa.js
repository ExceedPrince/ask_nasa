import React, { useEffect, useState } from 'react';

import { YOUR_API_KEY } from './gallery';

let n = new Date();
let year = n.getFullYear();
const month = () => String(n.getMonth() + 1).length === 1 ? "0" + Number(n.getMonth() + 1) : Number(n.getMonth() + 1);
const day = () => String(n.getDate()).length === 1 ? "0" + Number(n.getDate()) : n.getDate();
let randomDate = year + "-" + month() + "-" + day();
console.log(randomDate);

const Nasa = (props) => {
	const [date, setDate] = useState(randomDate)
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`https://api.nasa.gov/planetary/apod?api_key=${YOUR_API_KEY}&date=${date}`)
			.then(response => response.json())
			.then((json) => setData([json.title, json.date, json.url, json.copyright, json.explanation, json.media_type]));
	}, [date]);

	const getVal = (e) => {
		let currDate = e.target.value;
		setDate(currDate);
	}

	const imgOrVideo = () => {
		if (data[5] === "image") {
			return <div><img src={data[2]} alt={data[2]} /></div>
		} else {
			return <iframe src={data[2]} frameborder='0' width="900px" height="506px" allow='autoplay; encrypted-media' allowfullscreen title='video' />
		}
	}

	console.log(data)

	return (
		<>
			{props.children}
			<div>
				<input type="date" id="inputDate" value={date} onChange={getVal} />
				<h1>{data[0]}</h1>
				<p>{data[1]}</p>
				{imgOrVideo()}
				<p id="copy"><b>Image Credit & Copyright: {data[3]}</b></p>
				<p>{data[4]}</p>
			</div>
		</>
	)

}

export default Nasa;
