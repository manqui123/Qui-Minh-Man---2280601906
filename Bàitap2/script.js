const POST_API = "http://localhost:3000/posts";
const COMMENT_API = "http://localhost:3000/comments";

/* ===== ID TỰ TĂNG (STRING) ===== */
function generateId(list) {
  if (list.length === 0) return "1";
  return String(Math.max(...list.map(i => Number(i.id))) + 1);
}

/* ================= POSTS ================= */

function loadPosts() {
  fetch(POST_API)
    .then(res => res.json())
    .then(posts => {
      const ul = document.getElementById("postList");
      ul.innerHTML = "";

      posts.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.title;

        if (p.isDeleted) li.classList.add("deleted");

        const btn = document.createElement("button");
        btn.textContent = "Xóa";
        btn.onclick = () => softDeletePost(p.id);

        li.appendChild(btn);
        ul.appendChild(li);
      });
    });
}

function addPost() {
  const title = document.getElementById("postTitle").value;
  if (!title) return alert("Nhập tiêu đề!");

  fetch(POST_API)
    .then(res => res.json())
    .then(posts => {
      fetch(POST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generateId(posts),
          title,
          views: 0,
          isDeleted: false
        })
      }).then(loadPosts);
    });
}

/* ===== XÓA MỀM ===== */
function softDeletePost(id) {
  fetch(`${POST_API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDeleted: true })
  }).then(loadPosts);
}

/* ================= COMMENTS (CRUD) ================= */

function loadComments() {
  fetch(COMMENT_API)
    .then(res => res.json())
    .then(comments => {
      const ul = document.getElementById("commentList");
      ul.innerHTML = "";

      comments.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.text} (Post ${c.postId})`;

        const del = document.createElement("button");
        del.textContent = "Xóa";
        del.onclick = () => deleteComment(c.id);

        li.appendChild(del);
        ul.appendChild(li);
      });
    });
}

function addComment() {
  const text = document.getElementById("commentText").value;
  const postId = document.getElementById("commentPostId").value;

  if (!text || !postId) return alert("Nhập đủ thông tin!");

  fetch(COMMENT_API)
    .then(res => res.json())
    .then(comments => {
      fetch(COMMENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generateId(comments),
          text,
          postId
        })
      }).then(loadComments);
    });
}

function deleteComment(id) {
  fetch(`${COMMENT_API}/${id}`, { method: "DELETE" })
    .then(loadComments);
}

/* ===== LOAD BAN ĐẦU ===== */
loadPosts();
loadComments();
