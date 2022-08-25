$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=50Zn43Nihx7AS2DcJa8jrs5PhGFfpH2g",
    async:true,
    dataType: "json",
    success: function(json) {
        console.log(json);
        // Parse the response.
        // Do other things.
    },
    error: function(xhr, status, err) {
        // This time, we do not end up here!
    }
});

function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) { // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=50Zn43Nihx7AS2DcJa8jrs5PhGFfpH2g", true);
    xmlhttp.send();
}

loadXMLDoc()