import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filter from './Components/Filter/Filter';
import RocketDetails from './Components/RocketDetails/RocketDetails';

const SpaceXComponentContainer = styled.div`
	background: #f2f2f2;
	header {
		font-size: 23px;
		font-weight: 600;
		text-align: left;
	}
	.app-container {
		height: 93vh;
    	overflow: auto;
		display: grid;
		grid-column-gap: 15px;
		grid-template-columns: 1fr 5fr;
		.filter-container {
			display: flex;
			justify-content: center;
			background: #f2f2f2;
			padding-top: 14px;
		}
		.content-container {
            padding: 0 10px 24px 10px;
            margin-top: 15px;
            overflow: auto;
			.loading {
                font-size: 16px;
                font-family: fantasy;
                font-weight: bold;
                position: absolute;
                text-align: center;
                left: 50%;
                top: 50%;
                transform: translate(-50%);
            }
		}
	}
	footer {
		margin-top:7px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		.developer-name {
			font-weight: 500;
		}
	}
	@media screen and (max-width: 700px) {
		header {
			text-align:center;
		}
		.app-container {
            grid-template-columns: 1fr;
            .content-container {
                overflow: visible;
            }
		}
	}
	
`;

function SpaceXComponent() {
	const [rocketDetails, setRocketDetails] = useState([]);
	const [activeYear, setActiveYear] = useState();
	const [successfulLaunch, setSuccessfulLaunch] = useState();
	const [successfulLanding, setSuccessfulLanding] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [isManuallyChanges, setIsManuallyChanges] = useState(true);

	useEffect(() => {
		const queryString = getParam(); //check url have querystring or not
		queryString !== '?' ? getRocketDetails(queryString) : getRocketDetails('?limit=100');
	}, []);

	useEffect(() => {   //generate Querystring when filter
		if (isManuallyChanges && (activeYear || successfulLaunch || successfulLanding)) {
			let currentUrl = `/100`,
				queryString = `?limit=100`;

			if (activeYear && activeYear !== ' ') {
				currentUrl += `/${activeYear}`;
				queryString += `&launch_year=${activeYear}`;
			} else {
				currentUrl += `/ `;
			}
			if (successfulLaunch) {
				currentUrl += `/${successfulLaunch}`;
				queryString += `&launch_success=${successfulLaunch}`;
			} else {
				currentUrl += `/ `;
			}
			if (successfulLanding) {
				currentUrl += `/${successfulLanding}`;
				queryString += `&land_success=${successfulLanding}`;
			} else {
				currentUrl += `/ `;
			}
			getRocketDetails(queryString);
			const newUrl = window.location.protocol + "//" + window.location.host + '/sapient-assignment' + queryString;
			console.log(newUrl);
			window.history.pushState({ path: newUrl }, '', newUrl);
		}
	}, [isManuallyChanges, activeYear, successfulLaunch, successfulLanding]);

	const getRocketDetails = (str: string = '') => {
		setIsLoading(true);
		fetch(`https://api.spacexdata.com/v3/launches${str}`)
			.then(response => response.json())
			.then(data => {
				setRocketDetails(data);
				setIsLoading(false);
			})
	}

	const queryStringToObjectConverter = () => {
		var search = window.location.search.substring(1);
		if (search) {
			return JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) });
		}
		return {};
	}

	const getParam = () => {    //If url have querystring set the values to respective state
		let queryString = '?';
		const queryParams: any = queryStringToObjectConverter() || {};
		console.log(queryParams);
		for (let param in queryParams) {
			if (queryParams[param] && queryParams[param] !== ' ') {
				if (param === 'launch_year') {
					setActiveYear(queryParams[param]);
				} else if (param === 'launch_success') {
					setSuccessfulLaunch(queryParams[param]);
				} else if (param === 'land_success') {
					setSuccessfulLanding(queryParams[param]);
				}
				setIsManuallyChanges(false);
				queryString += `&${param}=${queryParams[param]}`;
			}
		}
		return queryString;
	}



	return (
		<SpaceXComponentContainer>
			<div className="App">
				<header>SpaceX Launch Programs</header>
				<div className='app-container'>
					<div className='filter-container'>
						<Filter
							activeYear={activeYear}
							setActiveYear={setActiveYear}
							successfulLaunch={successfulLaunch}
							setSuccessfulLaunch={setSuccessfulLaunch}
							successfulLanding={successfulLanding}
							setSuccessfulLanding={setSuccessfulLanding}
							setIsManuallyChanges={setIsManuallyChanges}
						/>
					</div>
					<div className='content-container'>
						{/* show loader message while the API is in process */}
						{isLoading && <p className='loading'>Loading Please Wait...</p>}
						{/* show all the rocket details in the cards after the API call is done */}
						{!isLoading && rocketDetails.length > 0 && <RocketDetails rocketDetails={rocketDetails} />}
						{/* show user that no data found if API call is done and API got empty response */}
						{!isLoading && !rocketDetails.length && <p className='loading'>No Missions found...</p>}
					</div>
				</div>
				<footer>Developed By: <span className='developer-name'>Gowtham V</span></footer>
			</div>
		</SpaceXComponentContainer>
	);
}

export default SpaceXComponent;
