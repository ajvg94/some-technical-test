const loggedUserGgId = "32dfc42c7926408d82475e98081894db";//My personal torreGgId
$(document).ready(function () {
    $("#searchInput").keyup(function(e) {
        if (e.which == 13) {
            $("#searchButton").click();
        }
    });

    $('#searchButton').click(function () {
        let searchQueryData = {
            query: $('#searchInput').val(),
            torreGgId: loggedUserGgId,
            limit:10,
            identityType:"person",
            meta:false,
            excluding:[],
            excludedPeople:[],
            excludeContacts:true
        }
        fetch('http://localhost:3002/api/users/search/', {
            method: 'POST',
            body: JSON.stringify(searchQueryData),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => response.json()).then(function (responseJSON) {
            displayResults(responseJSON.data);
        });
    });

    $('.addToFavoritesBtn').click(function () {
        let favoriteData = {
            userTorreGgId: loggedUserGgId,
            favoriteUserTorreGgId: favoriteGgId
        }
        fetch('http://localhost:3002/api/users/search/', {
            method: 'POST',
            body: JSON.stringify(favoriteData),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => response.json()).then(function (responseJSON) {
            alert('Added to Favorites');
        });
    });

    function displayResults(data) {
        $('#results').empty();
        data.results.forEach(function (person) {
            const resultHtml = `
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="float-right">
                            <button class="btn btn-outline-warning btn-sm addToFavoritesBtn" data-toggle="tooltip" data-placement="top" title="Add to Favorites" id="${loggedUserGgId}-${person.ggId}">
                                Add to Favorites
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <img class="col-md-3" src="${person.imageUrl}" alt="${person.name}" width="100"  class="img-thumbnail">
                            <div class="col-md-9">
                                <div class="row">
                                    <h5 class="card-title">${person.name}</h5>
                                </div>
                                <div class="row">
                                    <p class="card-text">${person.professionalHeadline}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('#results').append(resultHtml);
        });
    }
});