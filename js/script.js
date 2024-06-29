const saveFileBtn = document.querySelector(".save-file");
const dropdown = document.querySelector(".drop-down");
document.addEventListener("DOMContentLoaded", function () {
  content.focus();
});
saveFileBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdown.classList.toggle("show");
});
document.addEventListener("click", function () {
  dropdown.classList.remove("show");
});

const newFileBtn = dropdown.querySelector(".new-file");
const txtBtn = dropdown.querySelector(".txt-btn");
const pdfBtn = dropdown.querySelector(".pdf-btn");
const content = document.querySelector(".content");
const fileName = document.querySelector("#file-name");

content.addEventListener("paste", function (e) {
  e.preventDefault();
  const text = e.clipboardData.getData("text");
  document.execCommand("insertHTML", false, text);
});

newFileBtn.onclick = function () {
  content.innerHTML = "";
};

pdfBtn.onclick = function () {
  html2pdf().from(content).save(fileName.value);
};

txtBtn.addEventListener("click", function () {
  const blob = new Blob([content.innerText.trim()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName.value}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

const boldBtn = document.querySelector(".bold");
const underlineBtn = document.querySelector(".underline");
const italicBtn = document.querySelector(".italic");
const color = document.querySelector("#inp-color");

const handleBold = function () {
  document.execCommand("bold");
};
const handleUnderline = function () {
  document.execCommand("underline");
};
const handleItalic = function () {
  document.execCommand("italic");
};
const handleColor = function (e) {
  document.execCommand("foreColor", false, e.target.value);
};

boldBtn.onclick = handleBold;
underlineBtn.onclick = handleUnderline;
italicBtn.onclick = handleItalic;
color.oninput = handleColor;

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "b") {
    handleBold;
  } else if (e.ctrlKey && e.key === "u") {
    handleUnderline;
  } else if (e.ctrlKey && e.key === "i") {
    handleItalic;
  }
});
let charCount = 0;
let wordCount = 0;
const count = document.querySelector(".count");
count.children[0].append(charCount);
count.children[1].append(wordCount);
content.oninput = function () {
  const textContent = content.innerText;
  charCount = textContent.replace(/\s/g, "").length;
  count.children[0].childNodes[1].nodeValue = charCount;
  wordCount = textContent.trim().split(/\s+/);
  if (wordCount[0] === "") {
    wordCount = 0;
    count.children[1].childNodes[1].nodeValue = wordCount;
  } else {
    count.children[1].childNodes[1].nodeValue = wordCount.length;
  }
};
