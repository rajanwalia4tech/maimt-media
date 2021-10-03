// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this)
        .siblings(".custom-file-label")
        .addClass("selected")
        .html(fileName);
});


function toggleLike(){
    var myPost = document.getElementsByClassName("myPost");
    for(var i=0;i<myPost.length;i++){
        myPost[i].addEventListener("click",function(e){
            e.preventDefault();
            let id = this.getAttribute("id")
            var self = this;
                $.post("/likes/like", {postId:id},
                function (data, textStatus, xhr) {
                    let likeCount = data.likeCount;
                    
                    self.querySelector("span").innerText = likeCount;
                    // if(xhr.status==201){
                    //     self.querySelector("i").classList.add("fas");
                    // }else{
                    //     self.querySelector("i").classList.add("far");
                    // }
                    //console.log(self.querySelector("i"))
                },
            );
            
        })
    }
}

function deletePost(){
    var myPost = document.getElementsByClassName("deletePost");
    for(var i=0;i<myPost.length;i++){
        myPost[i].addEventListener("click",function(e){
            e.preventDefault();
            let url = this.getAttribute("href")
            let id = this.getAttribute("id")
            var self = this;
                $.get(url,
                function (data, textStatus, xhr) {
                    console.log("post Deleted");
                    document.getElementById(`post-${id}`).outerHTML = ``;
                }
            );
            
        })
    }
}
