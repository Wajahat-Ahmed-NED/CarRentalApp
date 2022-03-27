var email = document.getElementById("email")
var password = document.getElementById("password")

function signIn() {
        console.log(email.value, password.value)

        var obj = {
                method: "POST",
                headers: { accept: 'application/json' },
                data: { email: email.value, password: password.value },
                url: 'http://localhost:5000/auth/signin'
        }

        axios(obj)
                .then((success) => {
                        console.log(success)
                }).catch((err) => {
                        console.log(err)
                })
}