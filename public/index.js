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
var list2 = document.getElementById("list2");

search.addEventListener("click", function() {
  list.innerHTML = "";
  list2.innerHTML = "";

  var bookName;
  name = searchBar.value;
  request(`http://www.omdbapi.com/?t=${name}&apikey=9cdd68b6`, result => {
    var title = result.Title;
    var poster = result.Poster;

    var card = document.createElement("div");
    card.classList.add("card");
    var img = document.createElement("img");
    img.setAttribute("src", poster);
    var filmeTitle = document.createElement("h4");
    filmeTitle.innerHTML = title;
    filmeTitle.classList.add("title");

    list.appendChild(card);
    card.appendChild(img);
    card.appendChild(filmeTitle);
    bookName = title;
    request(
      `https://api.nytimes.com/svc/books/v3/reviews.json?title=${bookName}&api-key=pKM6Vxvw7qWRoionxqcDexccXqWDZgAJ`,
      result => {
        console.log("rs", result);
        var data2 = result.results.map(ele => {
          return {
            book_title: ele.book_title,
            author: ele.book_author,
            summery: ele.summary
          };
        });
        console.log(data2);
        data2.forEach(element => {
          console.log(element.summery);
          var card = document.createElement("div");
          card.classList.add("card");

          var bookTitle = document.createElement("h4");
          bookTitle.innerHTML = element.book_title;
          bookTitle.classList.add("title");

          var bookAuthor = document.createElement("h4");
          bookAuthor.innerHTML = element.author;
          bookAuthor.classList.add("title");

          var bookSummery = document.createElement("h4");
          bookSummery.innerHTML = element.summery;
          bookSummery.classList.add("title");

          list2.appendChild(card);
          card.appendChild(bookTitle);
          card.appendChild(bookAuthor);
          card.appendChild(bookSummery);
        });
      }
    );
    // console.log(data);
  });
  ///////

  /////
});
