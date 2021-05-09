import {useRouter} from "next/router";
import styles from '../styles/Layout.module.css'
import Navigation from "./Navigation";

export default function Layout({children}) {
    const router = useRouter()

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto'}}>
                <div
                    style={{
                        height: '100vh',
                        width: '100vw',
                        transition: '250ms ease-in-out',
                        marginTop: 'auto'
                    }}>
                    {children}
                </div>
                <Navigation path={router.pathname}/>
            </div>
        )
    else
        return (
            <div style={{fontFamily: 'Roboto'}}>
                {children}
            </div>
        )
}