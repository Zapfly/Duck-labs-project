// require("./jquery")

function add(a, b) {
  return a + b;
}

function subtract(a,b){
  return a-b
}

module.exports = {
  add: add,
  subtract: subtract
}

function cleanOutElement(id) {
<<<<<<< HEAD
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
	console.log("from addPostToPage");
	console.log(post);
	let postHtml = `
=======
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

// // getting and setting posts on the page
// examplePost = {
//   postText: "Hi, this is a test post 0",
//   image: "",
//   author: "Tony Enerson",
//   postDate: "2020-05-19",
// };

function addPostToPage(post) {
  console.log("from addPostToPage");
  console.log(post);
  let postHtml = `
>>>>>>> 8f0ca8ee494b66139263c63b555a61dedc77aaaf
      <div class="post-card card" id="${post.uid}">
        ${post.postText}
        <button onclick="deleteButtonPressed(${post.uid})">&#10005;</button>
        <div class="post-footer">
<<<<<<< HEAD
          <img src="images/like-icon.png" onClick="likeButtonPressed()" />
=======
          <img src="/images/pub-domain-like.svg" onClick="likeButtonPressed()" />
>>>>>>> 8f0ca8ee494b66139263c63b555a61dedc77aaaf
          ${post.author}: ${post.postDate}
        </div>
      </div>
    `;
<<<<<<< HEAD
	appendHtml("newsFeed", postHtml);
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
	}
}

function summonEntryFormButtonPressed() {
	show("postEntryArea");
	hide("summonEntryFormButton");
}

function clearNewsFeedButtonPressed() {
	clearPostsFromServer();
}

function deleteButtonPressed(body) {
	console.log("deleteButtonPressed");
	let data = { uid: String(body) };

	deleteFromServer(data);
=======
  appendHtml("newsFeed", postHtml);
}

function updatePagePosts(posts) {
  cleanOutElement("newsFeed");
  posts.forEach(function (post) {
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
    uid: String(new Date().getTime()),
  };
}

function postButtonPressed() {
  let postToAdd = getPostFromForm();
  if (inputHasSomeText("statusInputField")) {
    postPostsToServerAndUpdatePage(postToAdd);
  }
}

function summonEntryFormButtonPressed() {
  show("postEntryArea");
  hide("summonEntryFormButton");
}

function clearNewsFeedButtonPressed() {
  clearPostsFromServer();
}

function deleteButtonPressed(body) {
  console.log("deleteButtonPressed");
  let data = { uid: String(body) };

  deleteFromServer(data);
>>>>>>> 8f0ca8ee494b66139263c63b555a61dedc77aaaf
}

//---- server interaction
function postPostsToServerAndUpdatePage(post) {
<<<<<<< HEAD
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
	console.log("from deleteFromServer");
	console.log(post);
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
	// hide("postEntryArea");
=======
  $.ajax({
    url: "/api/v1/addPost",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function () {
      console.log("In post callback");
      updatePostsFromServer();
    },
    fail: function (error) {
      // what do we do here?
    },
  });
}

function updatePostsFromServer() {
  console.log("from updatePostsFromServer");
  $.getJSON("/api/v1/posts")
    .done(function (posts) {
      updatePagePosts(posts);
    })
    .fail(function (error) {
      // what do we do here????
    });
}

function clearPostsFromServer() {
  $.ajax({
    url: "/api/v1/clear",
    type: "POST",
    success: function () {
      console.log("server has been cleared");
      updatePostsFromServer();
    },
    fail: function (error) {
      // what do we do here?
    },
  });
}

function deleteFromServer(post) {
  console.log("from deleteFromServer");
  console.log(post);
  $.ajax({
    url: "/api/v1/delete",
    type: "POST",
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function () {
      console.log("message has been deleted");

      updatePostsFromServer();
    },
    fail: function (error) {
      // what do we do here?
    },
  });
}

$(document).ready(function () {
  console.log("calling from loading function");
  updatePostsFromServer();
  //hide("postEntryArea");
>>>>>>> 8f0ca8ee494b66139263c63b555a61dedc77aaaf
});

// some test data lying around
testPosts = [
<<<<<<< HEAD
	{ postText: "Hi, face", author: "Lucas", postDate: "2020-05-19" },
	{
		postText: "Hi, this is a test post 0",
		author: "Tony Enerson",
		postDate: "2020-05-19"
	},
	{
		postText: "Hi, this is a test post 1",
		author: "Chris Desmarais",
		postDate: "2020-05-20"
	},
	{
		postText: "Hi, this is a test post 2",
		author: "Sheldon Manabat",
		postDate: "2020-05-20"
	},
	{
		postText: "Hi, this is a test post 3",
		author: "Tony Enerson",
		postDate: "2020-05-21"
	},
	{
		postText: "Hi, this is a test post 4",
		author: "Tony Enerson",
		postDate: "2020-05-22"
	}
=======
  { postText: "Hi, face", author: "Lucas", postDate: "2020-05-19" },
  {
    postText: "Hi, this is a test post 0",
    author: "Tony Enerson",
    postDate: "2020-05-19",
  },
  {
    postText: "Hi, this is a test post 1",
    author: "Chris Desmarais",
    postDate: "2020-05-20",
  },
  {
    postText: "Hi, this is a test post 2",
    author: "Sheldon Manabat",
    postDate: "2020-05-20",
  },
  {
    postText: "Hi, this is a test post 3",
    author: "Tony Enerson",
    postDate: "2020-05-21",
  },
  {
    postText: "Hi, this is a test post 4",
    author: "Tony Enerson",
    postDate: "2020-05-22",
  },
>>>>>>> 8f0ca8ee494b66139263c63b555a61dedc77aaaf
];
