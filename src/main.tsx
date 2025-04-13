import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import AuthProvider from './components/AuthProvider.tsx'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <AuthProvider>
        <App />
        <Toaster position='top-center'/> 
      </AuthProvider>
    </Provider>
)
