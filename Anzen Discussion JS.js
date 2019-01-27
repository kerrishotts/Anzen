//Javascript Discussion Code
class Comment {

    constructor(when, name, text){
        this.when=when;
        this.name=name;
        this.text=text;
    }
    pushToDatabase(){
        var data = JSON.stringify(this);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("POST", "https://discussions-a8ce.restdb.io/rest/comments");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "5c4ca3498932456b814556b3");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    }

    static getCommentsFromDatabase(cb) {
        //code from the database to extract the values//
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var comments = JSON.parse(this.responseText).map(function(databaseComment){
                return new Comment(
                    databaseComment.when,
                    databaseComment.name,
                    databaseComment.text
                );
            });
            cb(comments);
        }
        });
        xhr.open("GET", "https://discussions-a8ce.restdb.io/rest/comments");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("x-apikey", "5c4ca3498932456b814556b3");
        xhr.setRequestHeader("cache-control", "no-cache");

        xhr.send(data);
    }

}

function displayComments(){
    var commentListing = document.querySelector("#comments");
    commentListing.innerHTML = "";

    for(var i=0; i<comments.length; i++){
        let comment=comments[i];
        var p = document.createElement("p");
        
        p.textContent= comment.name +" - " + comment.text;
        p.className="comment";
        commentListing.appendChild(p);
    }
}

function addComment(){
    var userComment = new Comment(
        new Date(),
        document.querySelector("#name").value,
        document.querySelector("#comment").value,
     );
     comments.push(userComment);
     displayComments();
     userComment.pushToDatabase();
}
Comment.getCommentsFromDatabase(function (commentsFromDB){
    comments = commentsFromDB;
    displayComments();
})
document.querySelector("#post").addEventListener("click", addComment);