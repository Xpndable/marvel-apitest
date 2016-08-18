var mUri = "http://gateway.marvel.com:80/v1/public/"
var mKey = "?apikey=06c36cdc534980828c033b6660ad88a2"

function Comics(searchVal) {
  var marvel = mUri + "comics" + mKey
  if (searchVal) {
     marvel += "&titleStartsWith=" + searchVal
  }
  ReadData(marvel, function(comics) {
    comics = JSON.parse(comics)
    ReadData("comics.html", function(res) {
      document.getElementById("shell").innerHTML = TemplateEngine(res, comics.data)
    })
  })
}

function search(e) {
  Comics(e.value)
}

window.onload = function() {
  Comics();
}