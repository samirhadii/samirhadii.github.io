// Helper function to convert Markdown to HTML (basic)
function convertMarkdownToHTML(markdown) {
  return markdown
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^\* (.*?)$/gm, "<ul><li>$1</li></ul>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\s*\n/g, "</p><p>")
    .replace(/(?<!<\/p>)\n/g, "<br>")
    .replace(/^(?!<h|<ul|<p)(.+)$/gm, "<p>$1</p>");
}

function updateMetaTags(title, description) {
  // Update Open Graph tags
  const metaOgTitle = document.querySelector('meta[property="og:title"]');
  const metaOgDescription = document.querySelector('meta[property="og:description"]');
  const metaOgUrl = document.querySelector('meta[property="og:url"]');
  // Optionally update image if you have one, else keep it empty
  // const metaOgImage = document.querySelector('meta[property="og:image"]');

  if (metaOgTitle) metaOgTitle.setAttribute("content", title);
  if (metaOgDescription) metaOgDescription.setAttribute("content", description);
  if (metaOgUrl) metaOgUrl.setAttribute("content", window.location.href);
  // if (metaOgImage) metaOgImage.setAttribute("content", yourImageUrl);
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
        let htmlContent = convertMarkdownToHTML(markdown);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        // Extract the first <h1> as the title, if available
        const firstH1 = tempDiv.querySelector("h1");
        let postTitle, postDescription;
        if (firstH1) {
          postTitle = firstH1.textContent;
          firstH1.remove(); // Remove the title from the content
        } else {
          // Fallback to using the file name
          postTitle = postKey.replace(/_/g, " ");
        }
        
        // For a description, you might extract the first paragraph
        const firstParagraph = tempDiv.querySelector("p");
        postDescription = firstParagraph ? firstParagraph.textContent : "Read the latest s88s Blog post.";

        // Update meta tags with dynamic content
        updateMetaTags(postTitle, postDescription);

        // Set the title and post body content
        document.getElementById("post-title").innerText = postTitle;
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
