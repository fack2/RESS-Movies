function request(url, cb) {
	fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
			return cb(data);
		});
}

var list = document.getElementById("list");
var searchBar = document.getElementById("searchBar");
var name = document.getElementById("searchBar").value;
var search = document.getElementById("search");
var list = document.getElementById("list");

search.addEventListener("click", function() {
	name = searchBar.value;
	request(`http://www.omdbapi.com/?s=${name}&apikey=9cdd68b6`, result => {
		var title = result.Search.map(ele => ele.Title);
		var poster = result.Search.map(ele => ele.Poster);

		if (searchBar.value) {
			title.forEach(function(ele) {
				var li = document.createElement("li");
				li.innerText = ele;
				list.appendChild(li);
			});
			poster.forEach(function(ele) {
				var img = document.createElement("img");
				img.setAttribute("src", ele);
				list.appendChild(img);
			});
		} else {
			search.disabled = true;
		}
	});
});
