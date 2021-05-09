import Cookies from 'universal-cookie/lib'
import styles from '../styles/Authenticate.module.css'
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import Host from "../utils/Host";
import axios from "axios";

const cookies = new Cookies()
export default function Authenticate() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        // if ((new Cookies()).get('jwt') !== undefined)
        //     submitSignOUT().then(() => {
        //         ClearStorage()
        //     })
    }, [])

    function handleChange(event) {
        if (event.target.name === 'email')
            setEmail(event.target.value)
        else
            setPassword(event.target.value)
    }

    async function authenticate() {
        await axios({
            method: 'post',
            url: Host() + 'authenticate',
            data: {
                email: email,
                password: password,
            }
        }).then(res => {
            cookies.set('jwt', res.data)
            router.push('/', '/')
        }).catch(error => {
            alert('error')
            console.log(error)
        })
    }

    return (
        <div className={styles.pageContainer}>
            <Head>
                <title>Entrar</title>
            </Head>

            <div className={styles.contentContainer}>
                <div style={{
                    display: 'grid',
                    justifyItems: 'center',
                    height: 'fit-content',
                    gap: '10px',
                }}>
                    <div style={{
                        display: 'grid',
                        justifyItems: 'center',
                        gap: '5px',

                    }}>
                        <span style={{fontSize: '1.5rem'}}>Entrar</span>
                        <h3>Bem Vindo</h3>
                    </div>
                </div>
                <TextField variant={"outlined"} label={'Email'}
                           onChange={handleChange} name={'email'}
                           value={email} style={{width: '100%'}}/>

                <FormControl variant="outlined" style={{width: '100%'}}>
                    <InputLabel htmlFor="password">Senha</InputLabel>
                    <OutlinedInput

                        id="password"
                        type={visible ? 'text' : 'password'}
                        value={password}
                        name={'password'}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setVisible(!visible)}

                                    edge="end"
                                >
                                    {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Button variant={'contained'} onClick={authenticate}
                        style={{
                            textTransform: 'none',
                            backgroundColor: email.length === 0 || password.length === 0 ? null : '#0095ff',
                            color: email.length === 0 || password.length === 0 ? null : 'white'
                        }}>Entrar</Button>
            </div>
        </div>
    )

}
