import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Graph from "../components/Graph";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import Host from "../utils/Host";

export default function Home() {
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
            url: Host() + 'estimate/sales',
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
            display: 'flex',
            justifyItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div style={{width: '50%', borderRadius: '8px', backgroundColor: '#f2f2f2', height: "fit-content", boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
                <Graph values={data}/>
            </div>
        </div>
    )
}
