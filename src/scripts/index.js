
function cleanOutElement(id) {
  $('#'+id).html('')
}

function appendHtml(id, htmlToAdd) {
  $('#'+id).append(htmlToAdd)
}

function setInputValue(id, newValue) {
    return $('#'+id).val(newValue)
}

function getInputValue(id) {
  return $('#'+id).val()
}

function hide(id) {
  $('#'+id).hide()
}

function show(id) {
  $('#'+id).show()
}

function disable(id) {
  $('#'+id).prop("disabled", true)
}

function enable(id) {
  $('#'+id).prop("disabled", false)
}

function inputHasSomeText(id) {
  return getInputValue(id) !== ''
}

function todaysDateString() {
  return new Date().toISOString().substring(0,10)
}

// getting and setting posts on the page
examplePost = { postText: "Hi, this is a test post 0", image:"", author: "Tony Enerson", postDate: "2020-05-19"}

function addPostToPage(post) {
    let postHtml = `<div class="post-card card">${post.postText}<div class="post-footer">${post.author}: ${post.postDate}</div></div>`
    appendHtml('newsFeed', postHtml)
}

function updatePagePosts(posts) {
  cleanOutElement('postsArea')
  posts.forEach(function(post) {
    addPostToPage(post)
  })
}
  
function getPostFromForm() {
  let authorName 
  if (getInputValue('statusInputField') === "") {
    authorName = 'Anonymous'
  } else {
    authorName = getInputValue('authorText')
  }
  return {
    postText: getInputValue('statusInputField'),
    author: authorName,
    postDate: todaysDateString()
  }
}

function postButtonPressed() {
  let postToAdd = getPostFromForm()
  if (inputHasSomeText("statusInputField")) {
    postPostToServerAndUpdatePage(postToAdd)
  }
}

function summonEntryFormButtonPressed() {
  show('postEntryArea')
  hide('summonEntryFormButton')
}

function clearNewsFeedButtonPressed() {
  cleanOutElement('newsFeed')
}

//---- server interaction
function postPostToServerAndUpdatePage(post) {
    $.ajax({
        url:'/api/v1/addPost',
        type:"POST",
        data:JSON.stringify(post),
        contentType:"application/json; charset=utf-8",
        success: function() {
            console.log('In post callback')
            updatePostsFromServer()
        },
        fail: function(error) {
            // what do we do here?
        }
    })
}

function updatePostsFromServer() {
    $.getJSON('/api/v1/posts')
     .done(function(posts) {
         updatePagePosts(posts)
     })
     .fail(function(error) {
        // what do we do here????
     })
}

$(document).ready(function() {
  updatePostsFromServer()
  hide('postEntryArea')
})

// some test data lying around
testPosts = [
    { postText: "Hi, this is a test post 0", author: "Tony Enerson", postDate: "2020-05-19"},
    { postText: "Hi, this is a test post 1", author: "Chris Desmarais", postDate: "2020-05-20"},
    { postText: "Hi, this is a test post 2", author: "Sheldon Manabat", postDate: "2020-05-20"},
    { postText: "Hi, this is a test post 3", author: "Tony Enerson", postDate: "2020-05-21"},
    { postText: "Hi, this is a test post 4", author: "Tony Enerson", postDate: "2020-05-22"}
]