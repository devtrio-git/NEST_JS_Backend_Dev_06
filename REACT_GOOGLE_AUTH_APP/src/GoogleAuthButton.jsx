import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

export default function GoogleAuthButton() {

    async function onSuccess(response) {
        console.log({ response });

        fetch('http://localhost:8080/auth/google-authentication', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                token: response?.credential
            })
        })
            .then(res => console.log(res))
            .then(data => console.log(data))
            .catch(err => console.error(err))

    }

    return (<GoogleLogin onSuccess={onSuccess}></GoogleLogin>)
}
