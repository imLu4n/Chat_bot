Parse.initialize("cyo5uTYlGI2NlY9srrRl7oFFkmMIrRfVLXEykPvD", "OGcWBtub4TtgTCeVMxkm38zr6flC2eKU55yUZaIS");
Parse.serverURL = "https://parseapi.back4app.com/";

// formulário cadastro
document.getElementById("btnCadastro").addEventListener("click", () => {
  document.getElementById("auth-forms").style.display = "block";
  document.getElementById("form-cadastro").style.display = "block";
  document.getElementById("form-login").style.display = "none";

  document.getElementById("auth-forms").scrollIntoView({ behavior: "smooth" });
});

// formulário login
document.getElementById("btnLogin").addEventListener("click", () => {
  document.getElementById("auth-forms").style.display = "block";
  document.getElementById("form-login").style.display = "block";
  document.getElementById("form-cadastro").style.display = "none";

  document.getElementById("auth-forms").scrollIntoView({ behavior: "smooth" });
});

//cadastro 
document.querySelector('#form-cadastro form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = e.target[0].value;
  const email = e.target[1].value;
  const senha = e.target[2].value;

  const user = new Parse.User();
  user.set("username", email);
  user.set("password", senha);
  user.set("email", email);
  user.set("nomeCompleto", nome);

  try {
    await user.signUp();
    alert("Cadastro realizado com sucesso!");
    e.target.reset();
    document.getElementById("auth-forms").style.display = "none";
  } catch (error) {
    console.error("Erro no cadastro:", error);
    alert("Erro no cadastro: " + error.message);
  }
});

//login
document.querySelector('#form-login form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const senha = e.target[1].value;

  try {
    await Parse.User.logIn(email, senha);
    window.location.href = "chat.html"; 
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
});
