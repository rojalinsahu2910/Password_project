function getPasswords() {
  let data = localStorage.getItem("passwords");
  return data ? JSON.parse(data) : [];
}

function savePasswords(data) {
  localStorage.setItem("passwords", JSON.stringify(data));
}

function addPassword() {
  const site = document.getElementById("site").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!site || !username || !password) {
    alert("Please fill all fields");
    return;
  }

  const newEntry = { site, username, password };
  const passwords = getPasswords();
  passwords.push(newEntry);
  savePasswords(passwords);
  displayPasswords();
  clearForm();
}

function clearForm() {
  document.getElementById("site").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function deletePassword(index) {
  const passwords = getPasswords();
  passwords.splice(index, 1);
  savePasswords(passwords);
  displayPasswords();
}

function displayPasswords() {
  const passwordList = document.getElementById("passwordList");
  const passwords = getPasswords();

  passwordList.innerHTML = "";

  passwords.forEach((item, index) => {
    const entry = document.createElement("div");
    entry.className = "password-item";
    entry.innerHTML = `
      <span><strong>🌐 Site:</strong> ${item.site}</span>
      <span><strong>👤 Username:</strong> ${item.username}</span>
      <span><strong>🔑 Password:</strong> ${item.password}</span>
      <span class="delete-btn" onclick="deletePassword(${index})">🗑</span>
    `;
    passwordList.appendChild(entry);
  });
}

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const pwdInput = document.getElementById("password");
  const type = pwdInput.getAttribute("type") === "password" ? "text" : "password";
  pwdInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

// Initial load
displayPasswords();
