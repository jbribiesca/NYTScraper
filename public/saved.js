$.getJSON("/articles/saved", function (data) {

    if (data.length > 1) {
      for (var i = 0; i < data.length; i++) {
        var buttonText;
        if (data[i].saved) {
          buttonText = "Saved"
        } else { buttonText = "Save Article" }
  
        // Display the apropos information on the page
        $("#articles").append(
          "<div class='card'>"
          + "<a href='https://www.nytimes.com/" + data[i].link + "'>" + "<div class='card-header'>" + data[i].title + " " + "</a>"
          + "<button class='btn btn-primary saveArticle' style='float: right' data-id='" + data[i]._id + "'>" + buttonText + "</button>"
          + "</div>"
          + "<div class='card-body'>" + data[i].text
          + "</div>"
          + "</div>"
        )
      }
    } else {
      $("#articles").append("<h1 style='text-align: center'>No Articles Saved! You should hit the Scrape New button and save some articles!!</h1>")
    }
    // For each one
  
  });
