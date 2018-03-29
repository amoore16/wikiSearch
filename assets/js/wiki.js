$(document).ready(function(){
    
    $("input[type='text']").keypress(function(event){
        $searchText = $(this).val();
        if($searchText.length > 0){
            searchWiki($searchText);
            $("li").remove();
            $("li ")   
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
                    $("#content > ul").append("<a href=https://en.wikipedia.org/wiki/"+ query[i].title.replace(/ /g, "_") +" target='_blank'><li><h4>" + query[i].title + "</h4><p>" + query[i].terms.description + "</p></li></a>");
                    
                }
            }
        );
    }
});