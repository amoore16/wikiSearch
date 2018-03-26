$(document).ready(function(){

    $("input[type='text']").keypress(function(event){
        if(event.which === 13){
            $searchText = $(this).val();
            $(this).val("");
            $("li").remove();
            searchWiki($searchText);
        }
    });
    function searchWiki(search){
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
            function(json){
                var query = json.query.pages;
                console.log(query);

                for(var i = 0; i < query.length; i++){
                    $("ul").append("<li>" + query[i].title + "</li>");
                }
            }
        );
    }
});