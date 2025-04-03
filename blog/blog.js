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
        // Convert Markdown to HTML
        let htmlContent = convertMarkdownToHTML(markdown);
        // Create a temporary container to manipulate the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        // Find the first h1 and use it as the title if it exists
        const firstH1 = tempDiv.querySelector("h1");
        if (firstH1) {
          document.getElementById("post-title").innerText = firstH1.textContent;
          firstH1.remove(); // remove the h1 from the content
        } else {
          // Fallback: use the filename (with underscores replaced by spaces)
          document.getElementById("post-title").innerText = postKey.replace(/_/g, " ");
        }

        // Set the remaining HTML as the post body
        document.getElementById("post-body").innerHTML = tempDiv.innerHTML;

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
