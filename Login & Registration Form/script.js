const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");

const checkUsernameAndPassword = () =>
{
    let name = username.value;
    let pass = password.value;
    if(name==="Prateek" && pass==="12345")
    {
        //  the below method can be used to open another page in the same tab
        // window.location.href = "register.html";

        // this below method is used to open the page in another tab
        window.open("register.html","_blank");
    }
    else
    {
        alert("Incorrect username or Password");
    }
}
login.addEventListener("click",checkUsernameAndPassword)