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
	list.innerHTML = "";

	name = searchBar.value;
	request(`http://www.omdbapi.com/?s=${name}&apikey=9cdd68b6`, result => {
		var data  = result.Search.map((elm)=>{
			return{
				title: elm.Title,
				poster:elm.Poster
			}
		})
		console.log(data);
 data.forEach(element => {
				 var card = document.createElement("div");
				 card.classList.add("card");
				 var img = document.createElement("img");
				img.setAttribute("src", element.poster);
				var filmeTitle = document.createElement("h4");
				filmeTitle.innerHTML= element.title;
				filmeTitle.classList.add("title");

								 
list.appendChild(card);
card.appendChild(img);
card.appendChild(filmeTitle);
								 


 });
	 
	});

});
