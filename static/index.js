let currentSelected = -1; // current selected autocomplete element
let total = 0;
var typingTimer;
var doneTypingInterval = 200;

$(document).ready(function() {
    // Set width of autocomplete to same as search box


    $(".searchForm ul").css("width", $(".searchForm input").css("width"));

    // When item is mouse over, display blue
    $(".searchForm ul")
        .on("mouseover", "li", function() {
            $(this).css("background-color", "lightblue");
        })
        .on("mouseleave", "li", function() {
            $(this).css("background-color", "white");
        });

    $(".searchForm").on("keyup", function(e) {
        if (e.which != 40 && e.which != 38 && e.which != 13) {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
            if ($("searchForm input").val() == "") {
                $(".searchForm ul").css("display", "none");
            }
        }

    });
    
    // When there is text, open autocomplete
    // $(".searchForm input").on("input", function() {


    // });

    $(".searchForm ul").on("click", "li", function(e) {
        $(".searchForm input").val($(e.target).text());
        $(".searchForm ul").css("display", "none");
        total = 0;
    });

    // This code is used to be able to use the keyboard to select
    $(".searchForm").on("keydown", function(e) {
        if (total != 0) {
            if (e.which == 40) { // down key
                if (currentSelected != total - 1) {
                    let first = $(".searchForm ul li").first();
                    let prev;
                    for (let i = 0; i <= currentSelected; i++) {
                        prev = first;
                        first = first.next();
                    }
                    if (currentSelected >= 0 && currentSelected < total) {
                        prev.css("background-color", "white");
                        first.css("background-color", "lightblue");
                    }
                    else {
                        first.css("background-color", "lightblue");
                    }
                    if (currentSelected < total) {
                        currentSelected++;
                    }                    
                }

            } else if (e.which == 38) { // up key
                let first = $(".searchForm ul li").first();
                let prev;
                for (let i = 0; i < currentSelected - 1; i++) {
                    prev = first;
                    first = first.next();
                }

                if (currentSelected > 0) {
                    prev.css("background-color", "lightblue");
                    first.css("background-color", "white");
                } else {
                    first.css("background-color", "lightblue");
                }
                if (currentSelected > 0) {
                    currentSelected--;
                }
            } else if (e.which == 13) { // enter key
                let first = $(".searchForm ul li").first();
                for (let i = 0; i < total; i++) {
                    if (i == currentSelected) {
                        $(".searchForm input").val(first.text());
                        break;
                    }
                    first = first.next();
                }
                $(".searchForm ul").css("display", "none");
                total = 0;
            }
            else {
                clearTimeout(typingTimer);
            }

        } else if (e.which == 13) {
            submit();
        }

    });

    // Start of submit button code
    $(".searchForm button").click(submit);
});

function submit() {

    $.getJSON("/getImage", {
        title: $(".searchForm input").val(),
    }, function(data) {
        var url = data["url"];
        $(".listShows").append("<div class='show'><img src='" + url + "' alt='image'><h3>" + $(".searchForm input").val() + "</h3></div>");
    });
}

// For autocomplete
function doneTyping() {
    $searchFormUL = $(".searchForm ul");
    $searchFormUL.empty();
    total = 0;
    if ($(".searchForm input").val() !== "") {
        // Test Code for testing autocomplete
        
        // $(".searchForm ul").css("display", "block");
        // var matchItems = getAutoList($(".searchForm input").val());
        // for (var i = 0; i < matchItems.length; i++) {
        //     $(".searchForm ul").append("<li>" + matchItems[i] + "</li");
        // }
        // total = matchItems.length;
        $.getJSON("/getShowTitles", {
            search: $(".searchForm input").val(),
        }, function(data) {
            for (var i = 0; i < data["titles"].length; i++) {
                $(".searchForm ul").append("<li>" + data["titles"][i] + "</li>");
            }
            $(".searchForm ul").css("display", "block");
            total = data["titles"].length;
            currentSelected = 0;
            let first = $(".searchForm ul li").first();
            first.css("background-color", "lightblue");
        });

    } else {
        $(".searchForm ul").css("display", "none");
    }
}

// Test code for autocomplete
var autoItems = ["Arabic", "Beta", "Boogie", "C", "C#", "C++", "Dude", "Dudette", "Elephant", "Eagle", "Foo", "Fwaaaaa", "God", "Good", "Game of thrones is the best no doubt", "Hot", "Heat", "Imp", "Idiot", "Jeremy Clarkson", "John", "Kim", "Kim Jong Un", "Lot", "Loo", "Mom", "Mommy i want a juice box", "Nana", "nananananana", "opera", "poop", "query", "Robb Stark is dead SPOILERS!", "Stark", "Tyrion", "Usurper", "Vogue", "Webb", "Xylophone", "Yoyo", "Zeeeeeeeeeee"];

function getAutoList(text) {
    var returnArray = [];
    for (var i = 0; i < autoItems.length; i++) {
        if (autoItems[i].indexOf(text) != -1) {
            returnArray.push(autoItems[i]);
        }
    }
    return returnArray;
}
// End test code for autocomplete


// Required for function to detect whether the user has stopped typing or not
// Used to minimise API requests
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}