// js/post-form.js
import { auth } from "./firebase.js";
import { saveBlogPost } from "./blog.js";

export function initPostForm() {
  const form = document.getElementById("blog-post-form");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please log in to create a post");
      return;
    }
    const post = {
      title: document.getElementById("title").value,
      excerpt: document.getElementById("excerpt").value,
      content: document.getElementById("content").value
    };
    try {
      const slug = await saveBlogPost(post, auth.currentUser);
      window.location.href = `/post.html?slug=${slug}`;
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to save post");
    }
  });
}