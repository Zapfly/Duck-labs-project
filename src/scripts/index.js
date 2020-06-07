var TOKEN_NAME = "token";
let token = "";
$(document).ready(function () {
  if (hasToken()) {
    loadUserMedia("user-area", "status-input");
    updatePostsFromServer();
  }
});

function cleanOutElement(id) {
  $("#" + id).html("");
}

function appendHtml(id, htmlToAdd) {
  $("#" + id).append(htmlToAdd);
}

function setInputValue(id, newValue) {
  return $("#" + id).val(newValue);
}

function getInputValue(id) {
  return $("#" + id).val();
}

function hide(id) {
  $("#" + id).hide();
}

function show(id) {
  $("#" + id).show();
}

function disable(id) {
  $("#" + id).prop("disabled", true);
}

function enable(id) {
  $("#" + id).prop("disabled", false);
}

function pressedLogOut() {
  $.removeCookie(TOKEN_NAME);
  window.location.href = "index.html";
}

function setToken(_token) {
  $.cookie(TOKEN_NAME, _token);
  token = _token;
}

function getToken() {
  $.cookie(TOKEN_NAME);
}

function hasToken() {
  if ($.cookie(TOKEN_NAME)) {
    token = $.cookie(TOKEN_NAME);
    return true;
  }
  return false;
}

function inputHasSomeText(id) {
  return getInputValue(id) !== "";
}

function todaysDateString() {
  return new Date().toISOString().substring(0, 10);
}

// getting and setting posts on the page
examplePost = {
  postText: "Hi, this is a test post 0",
  image: "",
  author: "Tony Enerson",
  postDate: "2020-05-19",
};

function addPostToPage(post) {
  if (post.postText !== undefined) {
    let postHtml = `
			<div class="post-card card" id="${post.uid}">
				<div class='post-card-header'>
					<img class="profile-thumbnail" src='https://robohash.org/${post.uid}?set=set2&size=180x180'/>
					<div> 
						${post.author}
						</br>
						<div id='date${post.uid}'>${post.postDate}</div>
					</div>
				</div>
				<div  class="dropdown-container">
					<button class="ellipsis-button" onclick="ellipsisButtonPressed('list${post.uid}')">&#8285;</button>
					<div id="list${post.uid}" class="dropdown-content"> 
						<div class="drop-down-item" onclick="editButtonPressed('${post.uid}')"> Edit </div>
							<div class="drop-down-item" onclick="deleteButtonPressed(${post.uid})"> Delete </div>
						</div>
					</div>
				<div id="textArea${post.uid}" class="post-card-text">${post.postText}</div>
				
				<div id="${post.uid}container" class="post-card-text">
	 				<textarea type='text' id="editArea${post.uid}">${post.postText} </textarea>
	 				<button id="saveChangesButton${post.uid}" onclick="saveChangesButtonPressed('${post.uid}')">Save</button>
	 			</div>
		
				<div class="post-footer">			
					<button class='button-with-image comment-button' id='commentButton${post.uid}' onClick="commentButtonPressed(${post.uid})">
						&#128172; Comments
					</button>
				</div>
				
				<div class='comment-area'>
					<div class="comment-card-container" id='commentFeed${post.uid}'> 
					</div>
				</div>
					<input class="comment-input" id='commentInput${post.uid}' placeholder="Write your comment..." onChange="commentKeystroke('${post.uid}')"/>
			</div>
		`;

    appendHtml("newsFeed", postHtml);
    hide(`list${post.uid}`);
    hide(`editArea${post.uid}`);
    hide(`saveChangesButton${post.uid}`);
  }
}

function ellipsisButtonPressed(id) {
  $("#" + id).toggle();
}

function editButtonPressed(id) {
  let date = getInputValue(`date${id}`);
  $("#" + `textArea${id}`).toggle();
  $("#" + `editArea${id}`).toggle();
  $("#" + `saveChangesButton${id}`).toggle();
  hide(`list${id}`);
}

function switchVisibleElements(idToHide, idToShow) {
  $(`#${idToHide}`).toggle();
  $(`#${idToShow}`).toggle();
}

function getPostFromForm(
  inputTextId,
  inputDate = String(todaysDateString()),
  id = String(new Date().getTime()),
  commentsArray = []
) {
  let authorName = "Anonymous";
  let inputText;
  if (inputHasSomeText(inputTextId)) {
    authorName = "Anonymous";
    inputText = getInputValue(inputTextId);
  } else if (
    $(`#${inputTextId}`).text() != "" &&
    $(`#${inputTextId}`).text() != null
  ) {
    inputText = $(`#${inputTextId}`).text();
  } else {
    console.log("post does not have text");
  }
  return {
    postText: inputText,
    author: authorName,
    postDate: inputDate,
    uid: id,
    comments: commentsArray,
  };
}

function createCommentFromForm(
  postId,
  authorName = "Anonymous",
  inputDate = todaysDateString(),
  id = String(new Date().getTime())
) {
  if (inputHasSomeText(`commentInput${postId}`)) {
    return {
      commentId: `${id}`,
      avatar: `https://robohash.org/${id}?set=set2&size=180x180`,
      date: inputDate,
      author: authorName,
      text: getInputValue(`commentInput${postId}`),
      parentId: `${postId}`,
    };
  } else {
    console.log("post does not have text");
  }
}
let testComment = {
  commentId: `12345`,
  avatar: `https://robohash.org/12345?set=set2&size=180x180`,
  date: "1991",
  author: "Anonymouse",
  text: "This is a test Comment",
  parentId: `commentFeed12345`,
};

function createCommentCard(newComment) {
  let commentCard = `
  <div id='${newComment.commentId}' class='comment-card card'>
      <img id='img${newComment.commentId}' src='${newComment.avatar}' class='profile-thumbnail'/>
      <div id='author${newComment.commentId}' class='comment-author'> ${newComment.author}</div>
      </br>
      <div id='date${newComment.commentId}' class='comment-date'> ${newComment.date} </div>
    <div id='text${newComment.commentId}' class='comment-text'> ${newComment.text}</div>
  </div>
  `;
  appendHtml(`commentFeed${newComment.parentId}`, commentCard);
}

function createCommentArray(id) {
  let commentArray = [];
  $(`#commentFeed${id}`)
    .children()
    .each(function (i) {
      let collectedId = String($(this).attr("id"));
      let arrayObj = {
        commentId: `${collectedId}`,
        avatar: `https://robohash.org/${collectedId}?set=set2&size=180x180`,
        date: $("#" + `date${collectedId}`).text(),
        author: $("#" + `author${collectedId}`).text(),
        text: $("#" + `text${collectedId}`).text(),
        parentId: `${id}`,
      };
      commentArray.push(arrayObj);
    });
  return commentArray;
}

function commentKeystroke(postUID) {
  let newText = $(`#textArea${postUID}`).text();
  let date = $("#" + `date${postUID}`).text();

  let commentToAdd = createCommentFromForm(postUID);
  createCommentCard(commentToAdd);
  let commentsArray = createCommentArray(`${postUID}`);

  let newPost = getPostFromForm(newText, date, postUID, commentsArray);
  updateOnePost(newPost);
}

function postButtonPressed(id) {
  if (inputHasSomeText(id)) {
    let postToAdd = getPostFromForm(id);
    postPostsToServerAndUpdatePage(postToAdd);
    setInputValue(id, "");
  } else {
    return "Please Add a Message";
  }
}

function commentButtonPressed(cardId) {
  let id = String(cardId);
  $("#commentInput" + id).focus();
}

function clearNewsFeedButtonPressed() {
  clearPostsFromServer();
}

function deleteButtonPressed(id) {
  let data = { uid: String(id) };

  deleteFromServer(data);
}

function createUserButtonPressed() {
  let uname = getInputValue(`createUserInput`);
  let pword = getInputValue(`createPassInput`);
  let email = getInputValue(`createEmailInput`);
  createUser(
    { username: uname, password: pword, email: email },
    "user-area",
    "status-input"
  );
}

function saveChangesButtonPressed(id) {
  let date = $("#" + `date${id}`).text();
  let commentsArray = createCommentArray(`${id}`);
  let newPost = getPostFromForm(`editArea${id}`, date, `${id}`, commentsArray);
  updateOnePost(newPost);
}

function loginButtonPressed() {
  let pword = getInputValue(`loginPassInput`);
  let email = getInputValue(`loginEmailInput`);
  userLogin({ password: pword, email: email }, "user-area", "status-input");
}

function updatePagePosts(posts) {
  cleanOutElement("newsFeed");
  posts.forEach(function (post) {
    addPostToPage(post);
    post.comments.forEach(function (comment) {
      createCommentCard(comment);
    });
  });
}

function loadUserMedia(idToHide, idToShow) {
  switchVisibleElements(idToHide, idToShow);
}

//---- server interaction

function createUser(userObject, idToHide, idToShow) {
  $.ajax({
    url: "/users",
    type: "POST",
    data: JSON.stringify(userObject),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      setToken(data.token);
      window.location.href = "index.html";
    },
    fail: function (data) {
      console.log(data.errors);
    },
  });
}

function userLogin(userLoginObject, idToHide, idToShow) {
  $.ajax({
    url: "/api/v1/login",
    type: "POST",
    data: JSON.stringify(userLoginObject),
    contentType: "application/json; charset=utf-8",
    success: function (data) {
      setToken(data.token);
      loadUserMedia(idToHide, idToShow);
      updatePostsFromServer();
    },
    fail: function (err) {
      console.log(err);
    },
  });
}

function postPostsToServerAndUpdatePage(post) {
  console.log(token);
  $.ajax({
    url: "/api/v1/addPost",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function () {
      updatePostsFromServer();
    },
    fail: function (error) {
      console.log(error.message);
    },
  });
}

function updatePostsFromServer() {
  $.getJSON("/api/v1/posts")
    .done(function (posts) {
      updatePagePosts(posts);
    })
    .fail(function (error) {
      console.log(error.message);
    });
}

function clearPostsFromServer() {
  $.ajax({
    url: "/api/v1/clear",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function () {
      updatePostsFromServer();
    },
    fail: function (error) {
      console.log(error.message);
    },
  });
}

function deleteFromServer(post) {
  $.ajax({
    url: "/api/v1/delete",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function () {
      updatePostsFromServer();
    },
    fail: function (error) {
      console.log(error);
    },
  });
}

function updateOnePost(post) {
  $.ajax({
    url: "/api/v1/updatePost",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function () {
      updatePostsFromServer();
    },
    fail: function (error) {
      console.log(error);
    },
  });
}
