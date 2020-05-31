// const seedMessage = {
//   postText: 'Your very first message',
//   image: "",
//   author: 'Anonymous',
//   postDate: new Date().toISOString().substring(0, 10),
// }

let content = []

// Post functions

function addPost(newContent) {
  content.push(newContent)
}

function updatePost(newContent) {
  const messageToUpdate = content.find((c) => c.uid == newContent.uid)
  if (messageToUpdate) {
    messageToUpdate.postText = newContent.postText
  }
}

function findAllPosts() {
  return content.slice()
}

function clearAllPosts() {
  console.log('clearAllPosts from Database')
  return content = []
}

function deletePost(uid) {
  const filteredArr = content.filter((c) => c.uid !== uid)
  return content = filteredArr
}

// Log in functions

// const seedIdentity ={
//   username: "Luke",
//   password: "password"
// }

// let identity = {}

// let validLogIns = [
//   seedIdentity
// ]



module.exports = {
  addPost,
  findAllPosts,
  updatePost,
  clearAllPosts,
  deletePost
}
