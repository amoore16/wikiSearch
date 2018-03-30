$(document).ready(function(){
    
    $("#title").autocomplete({
        source: function(request, response) {
            var wikiAPI = "https://en.wikipedia.org/w/api.php";
            $.getJSON(wikiAPI, 
                {
                    "action": "query",
                    "format": "json",
                    "origin": "*",
                    "prop": "pageimages|pageterms",
                    "generator": "prefixsearch",
                    "redirects": 1,
                    "formatversion": "2",
                    "piprop": "thumbnail",
                    "pithumbsize": "50",
                    "pilimit": "10",
                    "wbptterms": "description",
                    "gpssearch": request.term,
                    "gpslimit": "10"
                },
                function(json){
                    var query = json.query.pages;
                    var srchArr = [];
                        for(var i = 0; i < query.length; i++){
                            srchArr.push(query[i].title);
                        }
                    response(srchArr);
                }
            )
        }
    });
    
    $("#title").keypress(function(event){
        if(event.which === 13){
            var $searchText = $(this).val();
            $(this).val("");
            $("#content > ul").empty();
            apiSearch($searchText);
        }
    });
    $("#searchBtn").on('click', function(){
        $searchText = $("#title").val();
        $("#title").val("");
        $("#content > ul").empty();
        apiSearch($searchText);
    });


    function apiSearch(search){
        var wikiAPI = "https://en.wikipedia.org/w/api.php";
        $.getJSON(wikiAPI,
            {
                "action": "query",
                "format": "json",
                "origin": "*",
                "prop": "pageimages|pageterms",
                "generator": "prefixsearch",
                "redirects": 1,
                "formatversion": "2",
                "piprop": "thumbnail",
                "pithumbsize": "50",
                "pilimit": "10",
                "wbptterms": "description",
                "gpssearch": search,
                "gpslimit": "10"  
            },
            function (json) {
                var query = json.query.pages;
                for (var i = 0; i < query.length; i++){
                    $("#content > ul").append("<a href='https://en.wikipedia.org/wiki/"+ query[i].title.replace(/ /g,'_') + "' target='_blank'><li><h2>" + query[i].title + "</h2><p>" + query[i].terms.description + "</p></li></a>");
                }
            }
        )
    }
});
