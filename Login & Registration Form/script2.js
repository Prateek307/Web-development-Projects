
const userDetailsContainer = document.getElementById("userDetails");
const view = document.getElementById("view");
let registeredUsers = [];
let first = 0 , second = 0 ,third = 0 ,fourth = 0 , firstPassword="" , fifth = 0;
const final = document.getElementById("submit");

function validateusername()
{
    const username = document.getElementById("username");
    const error_in_username = document.getElementById("error_in_username");
    const name = username.value.trim();
    let text;
    if(name.length<=2)
    {
        username.classList.remove("valid");
        username.classList.add("invalid");
        text = "Username must have more than 2 characters";
        error_in_username.innerHTML=text;
        first = 0;
    }
    else
    {
        text  = "  ";
        error_in_username.innerHTML=text;
        username.classList.remove("invalid");
        username.classList.add("valid");
        first = 1;
         
    }
}

function validateEmail() {
    const emailInput = document.getElementById("email");
    const error_in_email = document.getElementById("error_in_email");
    const email = emailInput.value.trim();
    let text,flag = 0,at_index;

    for(let i = 0;i<email.length;i++)
    {
        if(email[i]=='@')
        {
            flag = 1;
            at_index = i;
            break;
        }
    }
    if (flag!=1)
    {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        text = "Invalid Email";
        error_in_email.innerHTML = text;  
    }
    else if(at_index<1)
    {
        emailInput.classList.remove("valid");
        emailInput.classList.add("invalid");
        text = "Invalid Email";
        error_in_email.innerHTML = text; 
        second = 0;
    }
    else 
    {
        let index = email.lastIndexOf(".");
        if((index+2)-at_index<=3)
        {
            emailInput.classList.remove("valid");
            emailInput.classList.add("invalid");
            text = "Invalid Email";
            error_in_email.innerHTML = text; 
            second = 0;
        }
        else
        {
            emailInput.classList.remove("invalid");
            emailInput.classList.add("valid");
            text = " ";
            error_in_email.innerHTML = text;
            second = 1;
        }
    }
}


function validatePhonenumber()
{
    const phone = document.getElementById("phone_number");
    const error_in_phone_number = document.getElementById("error_in_phone_number");
    const num = phone.value.trim();
    let text;
    if(num.length!=10)
    {
        phone.classList.remove("valid");
        phone.classList.add("invalid");
        text = "Phone number must have 10 digits";
        error_in_phone_number.innerHTML=text;
        third = 0;
    }
    else
    {
        text  = "  ";
        error_in_phone_number.innerHTML=text;
        phone.classList.remove("invalid");
        phone.classList.add("valid");
        third = 1;
         
    }
}

function validatePassword()
{
    const password = document.getElementById("password");
    const error_in_password = document.getElementById("error_in_password");
    const pass = password.value.trim();
    let text;
    if(pass.length<8)
    {
        // minimum length required is 8
        password.classList.remove("valid");
        password.classList.add("invalid");
        text =  "Minimum length of Password is 8";
        error_in_password.innerHTML=text;
        fourth = 0;
    }
    else
    {
        // pasword must have atleast 2 letters 
        let i,letterCnt = 0;
        for(i=0;i<pass.length;i++)
        {
            if((pass[i]>='a' && pass[i]<='z') || (pass[i]>='A' && pass[i]<='Z') )
            letterCnt++;
        }
        if(letterCnt<2)
        {
            password.classList.remove("valid");
            password.classList.add("invalid");
            text =  "Pasword must have atleast 2 letters";
            error_in_password.innerHTML=text;
            fourth = 0;
        }
        else
        {
             // pasword must have atleast 2 numbers 
            let i,numberCnt = 0;
            for(i=0;i<pass.length;i++)
            {
                if((pass[i]>='0' && pass[i]<='9'))
                numberCnt++;
            }
            if(numberCnt<2)
            {
                password.classList.remove("valid");
                password.classList.add("invalid");
                text =  "Pasword must have atleast 2 numbers";
                error_in_password.innerHTML=text;
                fourth = 0;
            }
            else
            {
                // password validated
                text  = "  ";
                error_in_password.innerHTML=text;
                password.classList.remove("invalid");
                password.classList.add("valid");
                firstPassword = pass;
                console.log(firstPassword);
                fourth = 1;
            }
            
        }
    }
}


function validateConfirmPassword()
{
    const ConfirmPassword = document.getElementById("confirm_password");
    const error_in_confirm_password = document.getElementById("error_in_confirm_password");
    const confirm = ConfirmPassword.value.trim();
    if(firstPassword==="")
    {
        ConfirmPassword.classList.remove("valid");
        ConfirmPassword.classList.add("invalid");
        text = "Enter password to confirm";
        error_in_confirm_password.innerHTML=text;
        fifth = 0;
    }
    else
    {
       
        if(confirm!==firstPassword)
        {   
            ConfirmPassword.classList.remove("valid");
            ConfirmPassword.classList.add("invalid");
            text = "Password did not match";
            error_in_confirm_password.innerHTML=text;
            fifth = 0;
        }
        else
        {
            text  = " ";
            error_in_confirm_password.innerHTML=text;
            ConfirmPassword.classList.remove("invalid");
            ConfirmPassword.classList.add("valid");
            fifth = 1;
        }
    }
  
}

const allDetailsVerified = (e) => {
    e.preventDefault();
    if (first == 1 && second == 1 && third == 1 && fourth == 1 && fifth == 1) {
        const user = {
            username: document.getElementById("username").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone_number: document.getElementById("phone_number").value.trim(),
        };
        registeredUsers.push(user);
        alert("User Registered Successfully");

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirm_password").value = "";
        document.getElementById("phone_number").value = "";
    } else {
        return false;
    }
}


const displayUsers = () => {
    userDetailsContainer.innerHTML = ""; // Clear existing content

    const container = document.getElementById("container");
    container.classList.add("hide");

    const view_users = document.getElementById("view-users");
    view_users.classList.add("hide");

    for (let i = 0; i < registeredUsers.length; i++) {
        const user = registeredUsers[i];
        const userDetails = document.createElement("div");
        userDetails.innerHTML = `
            <br>
            <br>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone Number:</strong> ${user.phone_number}</p>
            <br>
            <hr>
            <br>
        `;
        userDetailsContainer.appendChild(userDetails);
    }
}


final.addEventListener("click",allDetailsVerified);
view.addEventListener("click", function (e) {
    e.preventDefault();  // Prevent the default form submission behavior
    displayUsers();
});