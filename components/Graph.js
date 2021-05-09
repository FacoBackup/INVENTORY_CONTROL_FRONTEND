import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import styles from '../styles/Home.module.css'
import {Divider} from "@material-ui/core";
export default function Graph(props) {
    const [maxValue, setMaxValue] = useState(1)
    const [hoveredElement, setHoveredElement] = useState(undefined)
    useEffect(() => {
        let i = 0
        let maxValue = 0
        for (i = 0; i < props.values.length; i++) {
            if (props.values[i].amount > maxValue)
                maxValue = props.values[i].amount
        }

        setMaxValue(maxValue)
    }, [])
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            height: '100%',
            width: '100%',
            padding: '16px 16px 0 16px',

        }}>
            {props.values.map((column, index) => (
                <div

                    style={{
                        width: '50px',
                        height: 'auto',
                        display: 'grid', alignItems: 'flex-end',
                        gridTemplateRows: '92% 8%',
                    }}>
                    <div
                        onMouseLeave={() => setHoveredElement(undefined)}
                        onMouseEnter={() => setHoveredElement(index)}
                        style={{
                            backgroundColor: !column.color ? '#0095ff' : column.color,
                            width: '50px',
                            maxHeight: '100%',
                            height: maxValue > 0 && column.amount > 0 ? (column.amount / maxValue) * 100 + '%' : '50px',
                            borderRadius: '8px',
                            position: 'relative',
                            marginBottom: '50px'
                        }}>
                        <div className={styles.GraphInfo} style={{
                            opacity: hoveredElement === index ? '1' : '0',
                        }}>
                            <p>{column.amount}</p>
                            <Divider orientation={"horizontal"}/>
                            <p style={{color: '#262626', fontSize: '.9rem'}}>{(column.amount/ maxValue) * 100}%</p>
                        </div>

                    </div>
                    <p style={{textAlign: 'center', height: 'fit-content'}}>
                        {column.label}
                    </p>
                </div>
            ))}
        </div>
    )
}

Graph.propTypes = {
    values: PropTypes.array
}