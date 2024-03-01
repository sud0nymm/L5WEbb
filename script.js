//client side
const serverUrl = "http://127.0.0.1:3000";

/// start function ///
document.addEventListener("DOMContentLoaded", function() {
    console.log("HTML DOM tree loaded, and ready for manipulation");
    //fetchData()
    const htmlBody = document.body;
    //insertPage();

    insertPage();
})

/// functions for getting information from server ///
async function fetchArtist(artistID){  
    
    const response = await fetch(serverUrl + "/artist/" + artistID, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: null
    });

    if(response.ok){
        response.json().then((jsonBody) => {
            var singleArtistData = jsonBody;
            // send in data as parameter
            singleArtistPage(singleArtistData);
        })
    }
    else {
        console.log("error");
    }
}

async function getAllArtists(){
    const response = await fetch(serverUrl + "/artists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: null
    });

    if(response.ok){
        response.json().then((jsonBody) => {
            var allArtistData = jsonBody;
            // send in data as parameter
            listAllPage(allArtistData);

        })
    }
    else {
        console.log("error");
    }
}

async function fetchSearchData(userSearch){

    const response = await fetch(serverUrl + "/search/" + userSearch, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if(response.ok){
        response.json().then((jsonBody) => {
            var thingye = jsonBody;
            console.log(thingye)
            searchPage(thingye);

        })
    }
    else {
        console.log("error");
    }
}

async function fetchImage(artistID, theDiv){
    
    try{
        const response = await fetch(serverUrl + "/image/" + artistID, {
            method: "GET",
            headers: {
                "Content-Type": "image/png",
            },
            
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            response.blob().then((blobBody) => {
                var daImage = blobBody;
                //CHANGE DIV WITH INFOOO
                const filePath = URL.createObjectURL(blobBody);
                //console.log(filePath)
    
                const img = document.createElement("img");
    
                img.width = 600;
                img.alt = artistID;
                img.src = filePath; 
    
                theDiv.appendChild(img);
            })
        }
    } catch {
        console.error('Error fetching data from server:', error);
    }
}

async function createArtistDb(JSONObject){
    // send thingy to servah
}

/// functions for HTML dom tree manipulation

function insertPage(){
    
    clearBody();
    const insertPage = document.createElement("div");
    insertPage.style.marginLeft = "10%";
    insertPage.style.marginRight = "10%";

    const Title = document.createElement("h1");
    Title.innerText = "Input artist into database: ";
    insertPage.appendChild(Title);

    const aName = document.createElement("input")
    aName.placeholder = "input artist name"
    aName.style.display = "flex";
    aName.style.minWidth = "90%"

    const a_id = document.createElement("input")
    a_id.placeholder = "input artist id"
    a_id.style.display = "flex";
    a_id.style.minWidth = "90%"

    const aDesc = document.createElement("input")
    aDesc.placeholder = "input artist description"
    aDesc.style.display = "flex";
    aDesc.style.minWidth = "90%"
    aDesc.style.minHeight = "150px"

    const aRefURLs = document.createElement("input")
    aRefURLs.placeholder = "input artist Reference URLs"
    aRefURLs.style.display = "flex";
    aRefURLs.style.minWidth = "90%"

    const aDiscURLs = document.createElement("input")
    aDiscURLs.placeholder = "input artist discography URLs"
    aDiscURLs.style.display = "flex";
    aDiscURLs.style.minWidth = "90%"

    const subBtn = document.createElement("button");
    subBtn.innerText = "Submit artist";
    subBtn.style.fontSize = "22px" 
    subBtn.style.marginTop = "20px"

    
    // HIGLY UNFUINISHED SAJSJDKASDKASDj
    /*

    subBtn.addEventListener("click", function() {
        
        var name = ${searchResult}.val();
        var description = $('#lastName').val();
        var referenceUrls = $('#phoneNumber').val();
        var _id = $('#address').val();
        var discogsUrl = ${searchResult}.val();

        
        // Create a JSOn Object with the thingyes
        
        createArtistDb();
    }); */

    insertPage.appendChild(aName);
    insertPage.appendChild(a_id);
    insertPage.appendChild(aDesc);
    insertPage.appendChild(aRefURLs);
    insertPage.appendChild(aDiscURLs);
    insertPage.appendChild(subBtn);

    document.body.appendChild(insertPage);

}

function searchPage(searchResults){

    clearBody();
    const artistResults = document.createElement("div");
    artistResults.style.marginLeft = "10%";
    artistResults.style.marginRight = "10%";
    
    let results = searchResults.susDocuments;

    const theArtists = document.createElement("div");
    for (let i = 0; i < results.length; i++){
        
        let anArtist = document.createElement("div"); 
        artistBox(anArtist, results[i]);

        anArtist.style.fontSize = "35px"
        anArtist.innerText = results[i].name;

        anArtist.addEventListener("click", function() {
            fetchArtist(results[i]._id);
        });

        theArtists.appendChild(anArtist);
    }
    
    movieResultWrap(theArtists);
    artistResults.appendChild(theArtists);

    document.body.appendChild(menu("Artist Database"));
    document.body.appendChild(artistResults);
}

function singleArtistPage(singleArtistData){
    clearBody();

    const HTMLBod = document.body;
    const article = document.createElement("article");

    const artistTitle = document.createElement("h1");
    artistTitle.style.fontSize = "35px"
    artistTitle.innerText = singleArtistData.name;

    article.style.marginLeft = "20%";
    article.style.marginRight = "20%";
    
    const desc = document.createElement("p");
    desc.innerText = singleArtistData.description;

    const member = document.createElement("p");
    if (singleArtistData.realname != null){
        member.innerText = "Member(s): " + singleArtistData.realname;
    }
    member.style.fontSize = "large";
    member.style.fontWeight = "bold";
    member.style.fontStyle = "italic";

    const references = document.createElement("article");
    
    const refs = document.createElement("h1");
    refs.innerText = "References: ";
    references.appendChild(refs);
    

    const URL = document.createElement("p");

    for (let i = 0; i < singleArtistData.referenceUrls.length; i++){
        let daThing = document.createElement("p");
        daThing.innerHTML = "<a href =" + singleArtistData.referenceUrls[i] + ">" + singleArtistData.referenceUrls[i];
        URL.appendChild(daThing);
    }

    references.appendChild(URL);

    // NEW STUFF
    const imgDiv = document.createElement("div");
    // console.log(singleArtistData._id)
    fetchImage(singleArtistData._id, imgDiv)


    //end of new stuff

    article.appendChild(artistTitle);
    article.appendChild(member);
    article.appendChild(imgDiv); // also new
    article.appendChild(desc);
    article.appendChild(references);

    HTMLBod.appendChild(menu("Back to Main Menu"));
    HTMLBod.appendChild(article);

}

function listAllPage(allArtistData){
    clearBody();
    const HTMLBod = document.body;

    const Title = document.createElement("h2");
    const allArtistBoxes = document.createElement("div");

    for (let i = 0; i < allArtistData.length; i++){
        const anArtist = document.createElement("div");
        anArtist.innerText = allArtistData[i].name;
        artistBox(anArtist);
        allArtistBoxes.appendChild(anArtist);
        
        // click to get to thingy
        anArtist.addEventListener("click", function() {
            fetchArtist(allArtistData[i]._id);
        });
        // make a reference to the artist page ???
    }

    allArtistBoxes.style.display = "flex";
    allArtistBoxes.style.flexWrap = "wrap";
    allArtistBoxes.style.justifyContent= "center";

    
    HTMLBod.appendChild(menu("Artist DataBase"));
    HTMLBod.appendChild(allArtistBoxes);
    
}

/// smaller functions ///

function searchBar(){
    const searchBar = document.createElement("input")
    searchBar.placeholder = "Search artist..."
    
    searchBar.addEventListener("keypress", function(e){
        if(e.key === "Enter"){
            //console.log(searchBar.value);
            fetchSearchData(searchBar.value)
        }
    });

    return searchBar;
}

// borrowed function lol
function movieResultWrap(theMovies){

    theMovies.style.display = "flex";
    theMovies.style.justifyContent = "left";

    theMovies.style.flexWrap = "wrap";
    theMovies.style.minWidth = "782px"; //change if 123
    theMovies.style.maxWidth = "782px";
}


function artistBox(theDiv){
    theDiv.style.margin="10px";
    theDiv.style.marginLeft="1%";
    theDiv.style.marginRight="1%"; 
    
    theDiv.style.cursor = "pointer";

    theDiv.style.padding="5px"
    theDiv.style.paddingTop="2%"
    
    theDiv.style.border = "5px solid #8c70cf"
    theDiv.style.borderRadius = "25px"

    theDiv.style.fontFamily = "sans-serif";
    theDiv.style.fontSize = "25px";
    theDiv.style.textAlign = "center";

    // Fix later???
    // theDiv.style.display = "inlineBlock"

    // text fonts n shit

    theDiv.style.minHeight = "180px";
    theDiv.style.maxHeight = "180px";
    theDiv.style.minWidth = "250px";
    theDiv.style.maxWidth = "250px";

}

function clearBody(){
    document.body.innerHTML = "";
}

function menu(textin){
    const Menu = document.createElement("article");
    const daDiv = document.createElement("h2");
    
    daDiv.innerText = textin
    daDiv.style.cursor = "pointer";

    title(daDiv);

    daDiv.addEventListener("click", function() {
        getAllArtists()
    });
    Menu.appendChild(daDiv);
    Menu.appendChild(searchBar())

    Menu.style.display = "flex";
    Menu.style.flexWrap = "wrap";
    Menu.style.justifyContent= "center";
    Menu.style.marginLeft = "12%"
    Menu.style.marginRight = "12%"
    
    return Menu;
}

function title(Title){

    Title.style.border = "5px solid";
    Title.style.fontFamily = "sans-serif";
    Title.style.fontVariant = "small-caps";
    Title.style.borderColor = "#8c70cf"; // change l8r
    Title.style.margin = "auto";
    Title.style.width = "50%";
    Title.style.padding = "10px";
}