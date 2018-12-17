let currentSelected = 0; // current selected autocomplete element
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
    });

    // This code is used to be able to use the keyboard to select
    $(".searchForm").on("keydown", function(e) {
        console.log("keydown before!");
        if (total != 0) {
            console.log("keydown!");
            if (e.which == 40) { // down key
                let first = $(".searchForm ul li").first();
                let prev;
                for (let i = 0; i < currentSelected; i++) {
                    prev = first;
                    first = first.next();
                }
                if (currentSelected > 0 && currentSelected <= total) {
                    prev.css("background-color", "white");
                    first.css("background-color", "lightblue");
                }
                else {
                    first.css("background-color", "lightblue");
                }
                if (currentSelected < total) {
                    currentSelected++;
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
                    if (first.css("background-color") == "lightblue") {
                        $(".searchForm input").val()
                    }
                }
                $(".searchForm input").val($(e.target).text());
                $(".searchForm ul").css("display", "none");
            }
            else {
                clearTimeout(typingTimer);
            }

        }

    });
});

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
        $(".searchForm ul").css("display", "block");
        console.log("running json");
        $.getJSON("/getShowTitles", {
            search: $(".searchForm input").val(),
        }, function(data) {
            console.log("ARE YOU EVEN RUNNING");
            console.log(String(data["titles"][0]));
            for (var i = 0; i < data["titles"].length; i++) {

                $(".searchForm ul").append("<li>" + data["titles"][i] + "</li>");
            }
            total = data["titles"].length;
            console.log(data);
        });

    } else {
        $(".searchForm ul").css("display", "none");
    }
}

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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}