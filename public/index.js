function request(url, cb) {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    });
}
var container = document.getElementById("container");
var list = document.getElementById("list");
var searchBar = document.getElementById("searchBar");
var name = document.getElementById("searchBar").value;
var search = document.getElementById("search");
var list = document.getElementById("list");
var list2 = document.getElementById("list2");
var movies1 = document.getElementById("movies1");
var book1 = document.getElementById("book1");

search.addEventListener("click", function() {
  list.innerText = "";
  list2.innerText = "";
  var bookName;
  name = searchBar.value;

  if (name !== "" && /\S/.test(name)) {
    var movieSection = document.createElement("h2");
    movieSection.style.textAlign = "center";
    movieSection.style.marginTop = "15px";
    movieSection.innerText = "Movies :";
    movies1.appendChild(movieSection);

    request(`https://www.omdbapi.com/?t=${name}&apikey=9cdd68b6`, result => {
      var title = result.Title;
      var poster = result.Poster;

      var card = document.createElement("div");
      card.classList.add("card");
      var img = document.createElement("img");
      img.setAttribute("src", poster);
      var filmeTitle = document.createElement("h4");
      filmeTitle.innerText = title;
      filmeTitle.classList.add("title");

      list.appendChild(card);
      card.appendChild(img);
      card.appendChild(filmeTitle);
      bookName = title;

      var movieSection = document.createElement("h2");
      movieSection.style.textAlign = "center";
      movieSection.style.marginTop = "15px";
      movieSection.innerText = "Books :";
      book1.appendChild(movieSection);

      request(
        `https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookName}&api-key=pKM6Vxvw7qWRoionxqcDexccXqWDZgAJ`,
        result => {
          var data2 = result.results.map(ele => {
            return {
              book_title: ele.book_title,
              author: ele.book_author,
              summery: ele.summary
            };
          });

          data2.forEach(element => {
            var card = document.createElement("div");
            card.classList.add("card");

            var bookTitle = document.createElement("h4");
            bookTitle.innerText = " Book Title : " + element.book_title;
            bookTitle.classList.add("title");

            var bookAuthor = document.createElement("h4");
            bookAuthor.innerText = " Author : " + element.author;
            bookAuthor.classList.add("title");

            var bookSummery = document.createElement("h4");
            bookSummery.innerText = "Summary : " + element.summery;
            bookSummery.classList.add("title");

            list2.appendChild(card);
            card.appendChild(bookTitle);
            card.appendChild(bookAuthor);
            card.appendChild(bookSummery);
          });
        }
      );
    });
  } else {
    search.disabled = true;
  }
  search.disabled = false;
});
