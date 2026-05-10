import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import GoogleAuthButton from './GoogleAuthButton'

function App() {

  return (
    <GoogleOAuthProvider clientId=''>
      <GoogleAuthButton />
    </GoogleOAuthProvider>
  )
}

export default App
