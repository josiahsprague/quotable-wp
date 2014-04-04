function getSelectedText() {
  if (window.getSelection) {
    var range = window.getSelection();
    return range.toString()
  }
  else {
    if (document.selection.createRange) {
      var range = document.selection.createRange();
      return range.text;
    }
  }
}

function showQuotableToolbar (text, e) {
  //update and position the toolbar before displaying it
  quotableToolbar.href = "http://twitter.com/intent/tweet";

  if (pagePermalink) {
    quotableToolbar.href = quotableToolbar.href + "?url=" + escape(pagePermalink);
  }
  if (text) {
    quotableToolbar.href = quotableToolbar.href + "&text=" + escape(text);
  }
  if (authorTwitter) {
    quotableToolbar.href = quotableToolbar.href + "&via=" + escape(authorTwitter);
  }
  if (relatedAccounts) {
    quotableToolbar.href = quotableToolbar.href + "&related=" + escape(relatedAccounts);
  }
  if (postHashtags) {
    quotableToolbar.href = quotableToolbar.href + "&hashtags=" + escape(postHashtags);
  }
  // This should be updated to get the position relative to the text selection
  // rather than mouse coordinates
  quotableToolbar.style.top = (e.pageY - 10) + "px";
  quotableToolbar.style.left = (e.pageX + 5) + "px";
  quotableToolbar.style.display = "block";
}

function hideQuotableToolbar() {
  quotableToolbar.style.display = "none";
  quotableToolbar.href = ""; //Clear the href to reset the toolbar
}

window.onload = function() {
  quotableToolbar = document.getElementById("quotable-toolbar");
  pagePermalink = quotableToolbar.getAttribute("data-permalink");
  if (!pagePermalink) {
    pagePermalink = document.URL;
  }
  authorTwitter = quotableToolbar.getAttribute("data-author");
  relatedAccounts = quotableToolbar.getAttribute("data-related");
  postHashtags = quotableToolbar.getAttribute("data-hashtags");

  // Only listen for text selection on content that is quotable to avoid toolbar
  // popping up for content people don't want to share
  var quotableContent = document.getElementById("quotablecontent");

  quotableContent.addEventListener("mouseup", function(e){
    selectedText = getSelectedText();
    //Only show the toolbar if there is actually text selected
    if (selectedText !== "") {
      showQuotableToolbar(getSelectedText(), e);
    }
  }, false);

  quotableContent.addEventListener("mousedown", function(e){
    //Only hide and clear the toolbar if it is displayed
    if (quotableToolbar.style.display === "block") {
      hideQuotableToolbar();
    }
  }, false);
}
