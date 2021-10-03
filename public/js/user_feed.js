        // Add the following code if you want the name of the file appear on select
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this)
                .siblings(".custom-file-label")
                .addClass("selected")
                .html(fileName);
        });

async function  loadPosts() {
    await $.get('/posts/all-posts', (posts) => {

        for (let p of posts) {
            let date = new Date(p.createdAt);
            let profileImageUrl = p.User.profileImageUrl;
            if(profileImageUrl==null) profileImageUrl = "/images/uploads/default.jpg";
            let userId = document.getElementById("userId").value;
            var deleteIcon = ``
            if(p.UserId==userId)
                deleteIcon = `<a href="/posts/${p.id}/delete" class="deletePost" style="text-decoration:none;" id="${p.id}">
                <i class="far fa-trash-alt  fa-lg"></i>
                </a>`;

            var p1 = `<div class="col-md-6 mt-3 mb-2 mr-2 border" id="post-${p.id}">
            <div class="row mt-2 border-bottom">
                <div class="col-2"><img src="${profileImageUrl}" alt="John Doe" 
                        style="width:70%; border-radius: 50%;"></div>
                <div class="col-8">
                    <div class="row">
                        <div class="col"><span>${p.User.firstName}</span></div>
                    </div>
                    <div class="row">
                        <div class="col"><small><i>${date.toDateString()}</i></small></div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col  pt-3">${deleteIcon}</div>
                    </div>
                </div>
            </div>
            <div class="row p-1">
                <div class="col">
                    <p>${p.body}</p>
                </div>
            </div>`

            var p2 = ` <div class="row p-1">
                            <div class="col">
                                <img src="${p.postImageUrl}" width="100%" alt="Post Image not found">
                            </div>
                        </div>`


            var p3 = `<div class="row pt-2 border-top" style="text-align: center;">
                                <div class="col-6 border-right">
                                <a href="/likes/like" class="myPost" style="text-decoration:none;" id="${p.id}"><i class="far fa-thumbs-up fa-lg"></i><span class="likeCount"> ${p.likeCount}</span></a>
                                    
                                </div>
                                <div class="col-6">
                                    <a href="#">💬</a> <span class="commentCount"> 23</span>
                                </div>
                            </div>
                        </div>
                    </div>`            
            if(p.postImageUrl==null){
                $('#post-container').append(
                    $(`${p1}
                        ${p3}
                    `)
                )
            }else{
                $('#post-container').append(
                    $(`${p1}
                       ${p2}
                       ${p3}
                    `)
                )
            }
        }
    })
   toggleLike();
   deletePost();
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
                    console.log(self.querySelector("i"))
                },
            );
            
        })
    }
}
