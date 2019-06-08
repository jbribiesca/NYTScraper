$.getJSON("/articles", function(data) {

    if (data.length > 1) {
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append(
          "<div class='card'>"
            + "<a href='https://www.nytimes.com/" + data[i].link + "'>" + "<div class='card-header'>" + data[i].title + " " + "</a>"
            + "<button class='btn btn-primary' style='float: right' data-id='" + data[i]._id + "'>" + "Save Article" + "</button>"
            + "</div>"
            + "<div class='card-body'>" + data[i].text
            + "</div>"
          + "</div>"
        )
      }
    } else {
      $("#articles").append("<h1 style='text-align: center'>No Articles, you should hit the Scrape New button!</h1>")
    }
    // For each one
    
  });