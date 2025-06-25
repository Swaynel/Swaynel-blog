// js/main.js
import { getBlogPosts, getBlogPost } from "./blog.js";
import { login, logout, onAuthChange } from "./auth.js";
import { initPostForm } from "./post-form.js";
import DOMPurify from "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.0/purify.min.js";

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Handle auth state
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  onAuthChange(user => {
    if (user) {
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      if (window.location.pathname === "/post.html" && !window.location.search) {
        document.getElementById("post-form").style.display = "block";
      }
    } else {
      loginBtn.style.display = "inline-block";
      logoutBtn.style.display = "none";
      if (window.location.pathname === "/post.html" && !window.location.search) {
        window.location.href = "/";
      }
    }
  });

  // Login/logout events
  loginBtn.addEventListener("click", login);
  logoutBtn.addEventListener("click", logout);

  // Load content based on page
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    loadBlogPosts();
  } else if (window.location.pathname === "/post.html") {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (slug) loadBlogPost(slug);
    else initPostForm();
  }
});

// Load all blog posts
async function loadBlogPosts() {
  const postsContainer = document.getElementById("blog-posts");
  try {
    const posts = await getBlogPosts();
    postsContainer.innerHTML = posts
      .map(
        post => `
          <a href="/post.html?slug=${post.slug}" class="blog-card">
            <h2>${post.title}</h2>
            <p>${post.excerpt}</p>
            <span>By ${post.author.displayName} on ${post.date}</span>
          </a>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.innerHTML = "<p>Error loading posts</p>";
  }
}

// Load single blog post
async function loadBlogPost(slug) {
  const postContainer = document.getElementById("post-content");
  try {
    const post = await getBlogPost(slug);
    if (post) {
      postContainer.innerHTML = `
        <h1>${post.title}</h1>
        <p>By ${post.author.displayName} on ${post.date}</p>
        <div>${DOMPurify.sanitize(post.content)}</div>
      `;
    } else {
      postContainer.innerHTML = "<p>Post not found</p>";
    }
  } catch (error) {
    console.error("Error loading post:", error);
    postContainer.innerHTML = "<p>Error loading post</p>";
  }
}