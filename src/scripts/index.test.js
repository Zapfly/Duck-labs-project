// import './jquery-3.5.1'
import { cleanOutElement, appendHtml } from './index.js';
// const index = require('./index')

const object = {item1: 1, item2: 2, item3: 3}

test('testing tests', () => {
    expect(object.item1).toEqual(1)
    console.log(index)
})

// import appendHtml from './index'


test('Remembernig how to Mock', () => {
    document.body.id = "body"
    appendHtml(
        'body',
        `<div class="post-card card">
            <div id='postText0' class="post-text">Look at this picture! Don't I look amazing!</div>
            <div class="post-content"></div>
            <img src="" class="like-button" /> 
        </div>`
    )
    // document.body.append(
    //     `<div class="post-card card">` + 
    //         `<div id='postText0' class="post-text">Look at this picture! Don't I look amazing!</div>` +
    //         `<div class="post-content"></div>` +
    //         `<img src="" class="like-button" /> ` +
    //     `</div>`
    //     )
//     expect(document.getElementById('postText0')).toEqual('')
})