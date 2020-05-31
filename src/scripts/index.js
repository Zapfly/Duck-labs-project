// const jquery = require("./jquery")

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

// module.exports = {
// 	add: add,
// 	subtract: subtract
// };

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
	postDate: "2020-05-19"
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
					${post.postDate}
				</div>
			</div>
			<button class="ellipsis-button" onclick="ellipsisButtonPressed(${post.uid})">&#8285;</button>
			<div class="post-card-text">${post.postText}</div>
			
			<div class="post-footer">
				<button class='button-with-image under-construction' id='likeButton' onClick="likeButtonPressed()"> &#128077;
					Like
				</button>
				<button class='button-with-image under-construction' id='commentButton${post.uid}' onClick="commentButtonPressed(${post.uid})">
					&#128172; Comment
				</button>
			</div>
			
			<div class='comment-area'>
				<input class="comment-input" id='commentInput${post.uid}' placeholder="Write your comment..."/>
			</div>
		</div>
		`;
		appendHtml("newsFeed", postHtml);
	}
}

function updatePagePosts(posts) {
	cleanOutElement("newsFeed");
	posts.forEach(function(post) {
		addPostToPage(post);
	});
}

function getPostFromForm() {
	let authorName;
	if (inputHasSomeText("statusInputField")) {
		authorName = "Anonymous";
	} else {
		authorName = getInputValue("authorText");
	}
	return {
		postText: getInputValue("statusInputField"),
		author: authorName,
		postDate: todaysDateString(),
		uid: String(new Date().getTime())
	};
}

function postButtonPressed() {
	let postToAdd = getPostFromForm();
	if (inputHasSomeText("statusInputField")) {
		postPostsToServerAndUpdatePage(postToAdd);
		clearInputField("statusInputField");
	}
}

function clearInputField(id) {
	$("#" + id).val("");
}

function pressEnterKey(id, actionFunction) {
	$("#" + id).keyup(function(e) {
		let code = e.which;
		if (code == 13) {
			e.preventDefault();
			actionFunction();
		}
	});
}

function commentButtonPressed(cardId) {
	let id = String(cardId);
	$("#commentButton" + id).click(function(e) {
		$("#commentInput" + id).focus();
	});
}

function clearNewsFeedButtonPressed() {
	clearPostsFromServer();
}

function deleteButtonPressed(body) {
	let data = { uid: String(body) };

	deleteFromServer(data);
}

//---- server interaction
function postPostsToServerAndUpdatePage(post) {
	$.ajax({
		url: "/api/v1/addPost",
		type: "POST",
		data: JSON.stringify(post),
		contentType: "application/json; charset=utf-8",
		success: function() {
			console.log("In post callback");
			updatePostsFromServer();
		},
		fail: function(error) {
			// what do we do here?
		}
	});
}

function updatePostsFromServer() {
	console.log("posts updated");
	$.getJSON("/api/v1/posts")
		.done(function(posts) {
			updatePagePosts(posts);
		})
		.fail(function(error) {
			// what do we do here????
		});
}

function clearPostsFromServer() {
	$.ajax({
		url: "/api/v1/clear",
		type: "POST",
		success: function() {
			console.log("server has been cleared");
			updatePostsFromServer();
		},
		fail: function(error) {
			// what do we do here?
		}
	});
}

function deleteFromServer(post) {
	$.ajax({
		url: "/api/v1/delete",
		type: "POST",
		data: JSON.stringify(post),
		contentType: "application/json; charset=utf-8",
		success: function() {
			console.log("message has been deleted");

			updatePostsFromServer();
		},
		fail: function(error) {
			// what do we do here?
		}
	});
}

$(document).ready(function() {
	updatePostsFromServer();
});
