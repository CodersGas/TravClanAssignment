const getUsersList = "/merchants";

const buildAPIURL = (endpoint) => {
	return `https://intense-tor-76305.herokuapp.com${eval(endpoint)}`;
}

const connectAPI = async (endpoint) => {

	var headers = {'Content-type': 'application/json; charset=UTF-8'};

	var apiURL = buildAPIURL(endpoint);

	try {
		const response = await fetch(apiURL, {
			method: 'GET',
			headers: headers
		});

		if(response.ok) {
			const data = await response.json();
			return data;
		}
	}catch(error) {
		console.log('api error ', error);
	}
}

export default connectAPI;