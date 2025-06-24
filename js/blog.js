// js/blog.js
import { collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebase/9.24.1/firebase-firestore.js";
import DOMPurify from "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.1.0/purify.min.js";

// Fetch all posts
export async function getBlogPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch single post
export async function getBlogPost(slug) {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Save post
export async function saveBlogPost(post) {
  const slug = post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  await setDoc(doc(db, "posts", slug), {
    ...post,
    slug,
    date: new Date().toISOString().split("T")[0]
  });
  return slug;
}