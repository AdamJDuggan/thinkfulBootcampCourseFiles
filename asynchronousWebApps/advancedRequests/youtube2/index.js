'use strict';

// put your own value below!
const apiKey = 'AIzaSyDseHD-MGpaDJTbEmSkIAYCT2cgUun9_c0'; 
const searchURL = 'https://www.googleapis.com/youtube/v3/search';

function formatQueryParams(params) {
  //Function gets passed an arbitrary object of query parameters, and iterates over the keys in the object. 
  const queryItems = Object.keys(params)
  //It uses .map, to generate an array whose items are strings representing each key-value pair. 
  //For each key, it uses the built-in JavaScript function encodeURIComponent, which converts strings to URL safe formats by escaping characters like spaces to %20. 
  //It does the same for each value, connecting the key and value with an = character. After mapping each of the key-value pairs, formatQueryParams finally returns a single string generated by joining each array item with the "&" character.
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

//getYouTubeVideos differs from our earlier examples of calling APIs in that it deals with URL query parameters
function getYouTubeVideos(query, maxResults=10) {
  //Initially, we create an object called params, with key-value pairs for each of the URL query parameters we need to provide. 
  const params = {
    key: apiKey,
    q: query,
    part: 'snippet',
    maxResults
  };
  
  const queryString = formatQueryParams(params)
  //we create the URL we'll make the GET request to by combining the base search URL, a ? character, and our query parameters string.
  const url = searchURL + '?' + queryString;
  // We call fetch, followed by a .then block where we confirm the response was ok. If not we throw an error, otherwise, we call response.json, and finally, we log the response data to the console
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

//When the app loads, we run the watchForm function, which is similar to what we've already seen. In this case, we retrieve two values from the form: the search term and the maximum number of results to return. We pass these values to our getYouTubeVideos function, which is where "the magic" happens.
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, maxResults);
  });
}

$(watchForm);