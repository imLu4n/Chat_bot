Parse.initialize(
    "zmhvsPHt48anIBjQ9K4a8FyfYPiI5W8z3WDrpjht",
    "xpzt82gB8lFr3WiY2hKwIMQUuJLzW3LVmPnbMsZk" 
  );
  Parse.serverURL = "https://parseapi.back4app.com/";

document.addEventListener("DOMContentLoaded", function () {
    const btnCadastro = document.getElementById("btnCadastro");
    const btnLogin = document.getElementById("btnLogin");
    const formCadastro = document.getElementById("form-cadastro");
    const formLogin = document.getElementById("form-login");
    const authForms = document.getElementById("auth-forms");
  
    btnCadastro.addEventListener("click", () => {
      authForms.style.display = "flex";
      formCadastro.style.display = "block";
      formLogin.style.display = "none";
      window.scrollTo({ top: authForms.offsetTop, behavior: "smooth" });
    });
  
    btnLogin.addEventListener("click", () => {
      authForms.style.display = "flex";
      formLogin.style.display = "block";
      formCadastro.style.display = "none";
      window.scrollTo({ top: authForms.offsetTop, behavior: "smooth" });
    });
  
    // CADASTRO
    formCadastro.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const nome = formCadastro.querySelector('input[placeholder="Nome completo"]').value;
      const email = formCadastro.querySelector('input[placeholder="Email"]').value;
      const senha = formCadastro.querySelector('input[placeholder="Senha"]').value;
  
      const user = new Parse.User();
      user.set("username", email);
      user.set("password", senha);
      user.set("email", email);
      user.set("nome", nome);
  
      try {
        await user.signUp();
        alert("✅ Cadastro realizado com sucesso!");
        formCadastro.querySelector("form").reset();
      } catch (error) {
        alert("Erro no cadastro: " + error.message);
      }
    });
  
    // LOGIN
    formLogin.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = formLogin.querySelector('input[placeholder="Email"]').value;
      const senha = formLogin.querySelector('input[placeholder="Senha"]').value;
  
      try {
        await Parse.User.logIn(email, senha);
        alert("✅ Login realizado com sucesso!");
    
        // Redireciona para a página do chat
        window.location.href = "/index.html"; 
      } catch (error) {
        alert("Erro no login: " + error.message);
      }
    });
  });
  