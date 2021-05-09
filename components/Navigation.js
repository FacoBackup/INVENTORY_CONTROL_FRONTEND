import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {AddRounded, ExitToApp, HomeRounded, ListRounded} from "@material-ui/icons";
import Link from 'next/link'


export default function Navigation(props) {
    return (
        <div style={{
            width: '100%',
            height: '60px',
            position: 'fixed',
            top: 0,
            backgroundColor: '#e2e2e2',
            zIndex: 5,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <Link href={{pathname: '/'}}>
                <Button color={props.path === '/' ? 'primary' : 'default'} variant={'contained'}
                        style={{height: "fit-content"}} disableElevation={props.path !== '/'}>
                    <HomeRounded style={{marginRight: '10px'}}/>
                    Dashboard
                </Button>
            </Link>
            <Link href={{pathname: '/register'}}>
                <Button color={props.path === '/register' ? 'primary' : 'default'} variant={'contained'}
                        style={{height: "fit-content"}} disableElevation={props.path !== '/register'}>
                    <AddRounded style={{marginRight: '10px'}}/>
                    Criar
                </Button>
            </Link>

            <Link href={{pathname: '/list'}}>
                <Button color={props.path === '/list' ? 'primary' : 'default'} variant={'contained'}
                        style={{height: "fit-content"}} disableElevation={props.path !== '/list'}>
                    <ListRounded style={{marginRight: '10px'}}/>
                    Listar
                </Button>
            </Link>
            <Link href={{pathname: '/authenticate'}}>
            <Button color={'default'} variant={'contained'} style={{height: "fit-content"}} disableElevation={true}>
                <ExitToApp style={{marginRight: '10px'}}/>
                Sair
            </Button>
            </Link>
        </div>
    )
}
Navigation.propTypes = {
    path: PropTypes.string
}