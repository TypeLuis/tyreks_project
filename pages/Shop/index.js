import React from 'react'
import Card from '../../components/Card'
import Images from '../../components/images'
import classes from '../../styles/Shop.module.scss'


const Shop = () => {
    const style = {
        // 'background-color': 'blue'
    }
    return (
        <div style={style}>
            <Card images={Images} name='Fleece' price={100} />
        </div>
    )
}

export default Shop