        // Add the following code if you want the name of the file appear on select
        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this)
                .siblings(".custom-file-label")
                .addClass("selected")
                .html(fileName);
        });


function loadPosts() {
    $.get('/posts/all-posts', (posts) => {

        for (let p of posts) {
            let date = new Date(p.createdAt);
            let profileImageUrl = p.User.profileImageUrl;
            if(profileImageUrl==null) profileImageUrl = "/images/uploads/default.jpg";
            if(p.postImageUrl==null){
                $('#post-container').append(
                    $(`
                    <div class="col-md-6 mt-3 mb-2 mr-2 border">
                        <div class="row mt-2 border-bottom">
                            <div class="col-2"><img src="${profileImageUrl}" alt="John Doe" 
                                    style="width:80%;height: 80%; border-radius: 50%;"></div>
                            <div class="col-10">
                                <div class="row">
                                    <div class="col"><span>${p.User.firstName}</span></div>
                                </div>
                                <div class="row">
                                    <div class="col"><small><i>${date.toDateString()}</i></small></div>
                                </div>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <p>${p.body}</p>
                            </div>
                        </div>
                        <div class="row pt-2 border-top" style="text-align: center;">
                            <div class="col-6 border-right">
                                <form action="/likes/like" method="post">
                                    <input type="hidden" name="postId" value="${p.id}">
                                    <button type="submit">👍</button> <span class="likeCount"> ${p.likeCount}</span>
                                </form>
                            </div>
                            <div class="col-6">
                                <a href="#">💬</a> <span class="commentCount"> 23</span>
                            </div>
                        </div>
                    </div>
                </div>
                    `)
                )
            }else{
                $('#post-container').append(
                    $(`
                    <div class="col-md-6 mt-3 mb-2 mr-2 border">
                        <div class="row mt-2 border-bottom">
                            <div class="col-2"><img src="${profileImageUrl}" alt="John Doe" 
                                    style="width:80%;height: 80%; border-radius: 50%;"></div>
                            <div class="col-10">
                                <div class="row">
                                    <div class="col"><span>${p.User.firstName}</span></div>
                                </div>
                                <div class="row">
                                    <div class="col"><small><i>${date.toDateString()}</i></small></div>
                                </div>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <p>${p.body}</p>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <img src="${p.postImageUrl}" width="100%" alt="Post image">
                            </div>
                        </div>
                        <div class="row pt-2 border-top" style="text-align: center;">
                            <div class="col-6 border-right">
                                <form action="/likes/like" method="post">
                                    <input type="hidden" name="postId" value="${p.id}">
                                    <button type="submit">👍</button> <span class="likeCount"> ${p.likeCount}</span>
                                </form> 
                            </div>
                            <div class="col-6">
                                <a href="#">💬</a> <span class="commentCount"> 23</span>
                            </div>
                        </div>
                    </div>
                </div>
                    `)
                )
            }
        }
    })
}
         