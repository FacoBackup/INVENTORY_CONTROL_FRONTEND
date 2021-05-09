import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Graph from "../components/Graph";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import Host from "../utils/Host";

export default function list() {
    const router = useRouter()
    const [data, setData] = useState([])
    useEffect(() => {
        if (!(new Cookies()).get('jwt'))
            router.push('/authenticate', '/authenticate')
        fetch()
    }, [])

    async function fetch() {
        await axios({
            method: 'get',
            url: Host() + 'sales',
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
        }).then(res => {
            let sales = []
            sales.push({amount: res.data.first_day, label: 'Primeiro Dia'})
            sales.push({amount: res.data.second_day, label: 'Segundo Dia'})
            sales.push({amount: res.data.third_day, label: 'Terceiro Dia'})
            console.log(sales)
            setData(sales)

        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div style={{
            display: 'grid',
            justifyItems: 'center',
            gap: '16px',
            transform: 'translateY(60px)',
            height: 'calc(100vh - 60px)'
        }}>
            <Head>
                <title>Listar</title>
            </Head>
            <div style={{width: '50%',}}>
                {data.length > 0 ? data.map(sale => (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            backgroundColor: '#f2f2f2',
                            width: '100%',
                            minHeight: '55px',
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                        }}>
                            <p>
                                {sale.user}
                            </p>
                            <p>
                                {new Date(sale.time_of_creation).toDateString()}
                            </p>
                        </div>
                    )) :
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: '#f2f2f2',
                        width: '100%',
                        height: 'auto',
                        marginTop: '60px',
                        borderRadius: '8px',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                    }}>
                        <p>Nada encontrado</p>
                    </div>
                }
            </div>
        </div>
    )
}
