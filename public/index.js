function request(url, cb) {
	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return cb(data);
		});
}

request("http://www.omdbapi.com/?s=harry&apikey=9cdd68b6", result => {
	console.log(result);
	var title = result.Search.map(ele => ele.Title);
	console.log(title);
	var poster = result.Search.map(ele => ele.poster);
	var list = document.getElementById("list");

	title.forEach(function(ele) {
		console.log(ele);
		var li = document.createElement("li");
		li.innerText = ele;
		list.appendChild(li);
	});

	poster.forEach(function(ele) {
		var img = document.createElement("img");
		img.setAttribute("src", "ele");
		list.appendChild(img);
	});
});
