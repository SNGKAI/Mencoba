const editor = document.getElementById("editor")
const preview = document.getElementById("preview")
const hint = document.getElementById("hint")
const missionText = document.getElementById("missionText")

const missions = [
{
text: "🎯 Level 1: Buat heading dengan tag &lt;h1&gt; berisi tulisan 'Halo Dunia'",
answer: "<h1>Halo Dunia</h1>"
},
{
text: "🎯 Level 2: Buat paragraf dengan tag &lt;p&gt; berisi 'Ini adalah paragrafku'",
answer: "<p>Ini adalah paragrafku</p>"
},
{
text: "🎯 Level 3: Buat heading &lt;h2&gt; dengan teks 'Selamat Belajar'",
answer: "<h2>Selamat Belajar</h2>"
},
{
text: "🎯 Level 4: Buat link dengan &lt;a&gt; tag menuju google.com dengan text 'Kunjungi Google'",
answer: "<a href='google.com'>Kunjungi Google</a>"
},
{
text: "🎯 Level 5: Buat list dengan &lt;ul&gt; dan dua item &lt;li&gt;",
answer: "<ul>\n<li></li>\n<li></li>\n</ul>"
},
{
text: "🎯 Level 6: Buat heading &lt;h1&gt; dan paragraf &lt;p&gt; bersama-sama",
answer: "<h1></h1>\n<p></p>"
},
{
text: "🎯 Level 7: Buat image dengan &lt;img&gt; tag (gunakan '/contoh.jpg' sebagai src)",
answer: "<img src='/contoh.jpg' alt=''"
},
{
text: "🎯 Level 8: Buat 3 item list berbeda dengan &lt;ul&gt; dan &lt;li&gt;",
answer: "<li></li>\n<li></li>\n<li></li>"
}
]

let level = 0

function updateMission() {
  if (level < missions.length) {
    missionText.innerHTML = missions[level].text + "<div class='level-info'>Progress: " + (level + 1) + "/" + missions.length + "</div>"
    editor.value = ""
    preview.srcdoc = ""
    hint.innerText = ""
  } else {
    missionText.innerHTML = "🏆 Selamat! Kamu sudah menyelesaikan semua misi!<div class='level-info'>Total Level: " + missions.length + "</div>"
    editor.value = ""
    preview.srcdoc = ""
    hint.innerText = ""
  }
}

updateMission()

// Custom Popup Function
function showPopup(icon, message, isSuccess = false) {
  const modal = document.getElementById("popupModal")
  const iconEl = document.getElementById("popupIcon")
  const msgEl = document.getElementById("popupMessage")
  const btn = document.getElementById("popupBtn")
  
  iconEl.innerText = icon
  msgEl.innerText = message
  modal.classList.add("show")
  
  btn.onclick = function() {
    modal.classList.remove("show")
    if (isSuccess) {
      level++
      updateMission()
    }
  }
}

// tombol run
document.getElementById("runBtn").onclick = function(){
  const code = editor.value
  preview.srcdoc = code

  if (level < missions.length && code.toLowerCase().includes(missions[level].answer.toLowerCase())) {
    showPopup("🎉", "Misi level " + (level + 1) + " selesai! ✨", true)
  } else if (level >= missions.length) {
    showPopup("✅", "Kamu sudah menyelesaikan semua misi!")
  } else {
    showPopup("❌", "Jawaban belum benar. Coba lagi!")
  }
}


// AUTOCOMPLETE TAG
editor.addEventListener("keydown", function(e){

if(e.key === "Tab"){

e.preventDefault()

const value = editor.value
const cursorPos = editor.selectionStart
const beforeCursor = value.substring(0, cursorPos)
const words = beforeCursor.split(/[\s<>]/)
const lastWord = words[words.length-1]

// Hanya tag HTML yang valid
const validTags = {
"h1":{"tag":"<h1></h1>", "cursorOffset":4},
"p":{"tag":"<p></p>", "cursorOffset":3},
"h2":{"tag":"<h2></h2>", "cursorOffset":4},
"h3":{"tag":"<h3></h3>", "cursorOffset":4},
"h4":{"tag":"<h4></h4>", "cursorOffset":4},
"h5":{"tag":"<h5></h5>", "cursorOffset":4},
"h6":{"tag":"<h6></h6>", "cursorOffset":4},
"img":{"tag":"<img src='' alt=''>", "cursorOffset":10},
"a":{"tag":"<a href=''></a>", "cursorOffset":9},
"ul":{"tag":"<ul></ul>", "cursorOffset":4},
"ol":{"tag":"<ol></ol>", "cursorOffset":4},
"li":{"tag":"<li></li>", "cursorOffset":4},
"div":{"tag":"<div></div>", "cursorOffset":5},
"span":{"tag":"<span></span>", "cursorOffset":6},
"section":{"tag":"<section></section>", "cursorOffset":8},
"article":{"tag":"<article></article>", "cursorOffset":8},
"nav":{"tag":"<nav></nav>", "cursorOffset":5},
"header":{"tag":"<header></header>", "cursorOffset":8},
"footer":{"tag":"<footer></footer>", "cursorOffset":8},
"main":{"tag":"<main></main>", "cursorOffset":6},
"form":{"tag":"<form></form>", "cursorOffset":6},
"input":{"tag":"<input type='' />", "cursorOffset":12},
"button":{"tag":"<button></button>", "cursorOffset":8},
"label":{"tag":"<label></label>", "cursorOffset":7},
"table":{"tag":"<table></table>", "cursorOffset":7},
"thead":{"tag":"<thead></thead>", "cursorOffset":7},
"tbody":{"tag":"<tbody></tbody>", "cursorOffset":7},
"tfoot":{"tag":"<tfoot></tfoot>", "cursorOffset":7},
"tr":{"tag":"<tr></tr>", "cursorOffset":4},
"td":{"tag":"<td></td>", "cursorOffset":4},
"th":{"tag":"<th></th>", "cursorOffset":4},
"br":{"tag":"<br>", "cursorOffset":4},
"hr":{"tag":"<hr>", "cursorOffset":4},
"strong":{"tag":"<strong></strong>", "cursorOffset":8},
"em":{"tag":"<em></em>", "cursorOffset":4},
"b":{"tag":"<b></b>", "cursorOffset":3},
"i":{"tag":"<i></i>", "cursorOffset":3},
"u":{"tag":"<u></u>", "cursorOffset":3},
"code":{"tag":"<code></code>", "cursorOffset":6},
"pre":{"tag":"<pre></pre>", "cursorOffset":5},
"blockquote":{"tag":"<blockquote></blockquote>", "cursorOffset":11}
}

if(validTags[lastWord]){
  const tagToInsert = validTags[lastWord].tag
  const cursorOffset = validTags[lastWord].cursorOffset
  const replaceValue = value.substring(0, cursorPos - lastWord.length) + tagToInsert + value.substring(cursorPos)
  editor.value = replaceValue

  const newCursorPos = cursorPos - lastWord.length + cursorOffset
  editor.selectionStart = newCursorPos
  editor.selectionEnd = newCursorPos
  editor.focus()
}

}

})


// HINT
editor.addEventListener("input", function(){

const value = editor.value
const cursorPos = editor.selectionStart
const beforeCursor = value.substring(0, cursorPos)
const words = beforeCursor.split(/[\s<>]/)
const lastWord = words[words.length-1]

const validHtmlTags = {
"h1":"Tekan TAB untuk membuat <h1></h1>",
"h2":"Tekan TAB untuk membuat <h2></h2>",
"h3":"Tekan TAB untuk membuat <h3></h3>",
"h4":"Tekan TAB untuk membuat <h4></h4>",
"h5":"Tekan TAB untuk membuat <h5></h5>",
"h6":"Tekan TAB untuk membuat <h6></h6>",
"p":"Tekan TAB untuk membuat <p></p>",
"div":"Tekan TAB untuk membuat <div></div>",
"span":"Tekan TAB untuk membuat <span></span>",
"section":"Tekan TAB untuk membuat <section></section>",
"article":"Tekan TAB untuk membuat <article></article>",
"nav":"Tekan TAB untuk membuat <nav></nav>",
"header":"Tekan TAB untuk membuat <header></header>",
"footer":"Tekan TAB untuk membuat <footer></footer>",
"main":"Tekan TAB untuk membuat <main></main>",
"img":"Tekan TAB untuk membuat <img>",
"a":"Tekan TAB untuk membuat <a></a>",
"ul":"Tekan TAB untuk membuat <ul><li></li></ul>",
"ol":"Tekan TAB untuk membuat <ol><li></li></ol>",
"li":"Tekan TAB untuk membuat <li></li>",
"form":"Tekan TAB untuk membuat <form></form>",
"input":"Tekan TAB untuk membuat <input>",
"button":"Tekan TAB untuk membuat <button></button>",
"label":"Tekan TAB untuk membuat <label></label>",
"table":"Tekan TAB untuk membuat <table></table>",
"tr":"Tekan TAB untuk membuat <tr></tr>",
"td":"Tekan TAB untuk membuat <td></td>",
"th":"Tekan TAB untuk membuat <th></th>"
}

if(validHtmlTags[lastWord]){
hint.innerText = validHtmlTags[lastWord]
} else {
hint.innerText = ""
}

})