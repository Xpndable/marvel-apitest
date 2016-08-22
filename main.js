var mUri = "http://gateway.marvel.com:80/v1/public/"
var mKey = "?apikey=06c36cdc534980828c033b6660ad88a2"

function Series(searchVal) {
  var marvel = mUri + "series" + mKey
  if (searchVal) {
     marvel += "&titleStartsWith=" + searchVal
  }
  ReadData(marvel, function(series) {
    series = JSON.parse(series)
    ReadData("comics.html", function(res) {
      document.getElementById("shell").innerHTML = TemplateEngine(res, series.data)
      elements = document.getElementsByClassName("comic");
      for (element in elements) {
        var obj = new SeriesObj(elements[element], series.data.results[element]);
      }
    })
  })
}

function SeriesDetail(data) {
  ReadData("series-detail.html", function(res) {
    document.getElementById("shell").innerHTML = TemplateEngine(res, data)
  })
}

function search(e) {
  Series(e.value)
}

function SeriesObj(element, data) {
    this.data = data;
    this.element = element;
    if (element.addEventListener) {
    	element.addEventListener("click", this, false);
    }
}

SeriesObj.prototype.handleEvent = function (event) {
    switch (event.type) {
        case "click":
        		this.click(SeriesDetail(this.data));
            break;
    }
};

SeriesObj.prototype.click = function(value) {
  SeriesDetail(value)
}

window.onload = function() {
  Series();
}