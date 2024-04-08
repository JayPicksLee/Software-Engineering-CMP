const loginForm = document.getElementById('loginForm');

var accounts = 
[
    {
        username : "user1",
        password : "password",
        accountType : "user"
    },
    {
        username : "admin1",
        password : "password",
        accountType : "admin"
    }
]

loginForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    for (i = 0; i < accounts.length; i++)
    {
        if (username == accounts[i].username && password == accounts[i].password)
        {
            if(accounts[i].accountType == "user")
            {
                alert("Login succesful, this is a USER account");
                return
            }
            
            if (accounts[i].accountType == "admin")
            {
                alert("Login succesful, this is an ADMIN account");
                return
            }
        }
    }
    return alert("The account details do not match")
})

signUpForm.addEventListener('submit', (e) => 
{
    e.preventDefault();
    var regUsername = document.getElementById('newUsername').value;
    var regPassword = document.getElementById('newPassword').value;

    var newUser = {
        username: regUsername,
        password: regPassword,
        accountType: "user"
    }

    accounts.push(newUser);
    console.log(accounts);
})