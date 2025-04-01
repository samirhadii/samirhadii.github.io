// Helper function to convert Markdown to HTML (basic)
function convertMarkdownToHTML(markdown) {
  return markdown
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^\* (.*?)$/gm, "<ul><li>$1</li></ul>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

// Function to load post content from Markdown file
function loadPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postKey = urlParams.get("post");

  if (postKey) {
    fetch(`posts/${postKey}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Markdown file not found");
        }
        return response.text();
      })
      .then((markdown) => {
        // Set the title and convert Markdown to HTML
        document.getElementById("post-title").innerText = postKey.replace(/_/g, " ");
        document.getElementById("post-body").innerHTML = convertMarkdownToHTML(markdown);

        // Toggle visibility
        document.getElementById("about").style.display = "none";
        document.getElementById("post-list").style.display = "none";
        document.getElementById("post-content").style.display = "block";
      })
      .catch((error) => {
        document.getElementById("post-body").innerHTML = `<p>Could not load the post. ${error.message}</p>`;
      });
  } else {
    document.getElementById("about").style.display = "block";
    document.getElementById("post-list").style.display = "block";
    document.getElementById("post-content").style.display = "none";
  }
}

// Load the correct content based on URL
window.onload = loadPost;