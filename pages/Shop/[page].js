import React, { useEffect, useState } from 'react'
// import useR from 'next/router'
import { useRouter } from 'next/router'
import ProductPage from '../../components/Product_Page/ProductPage'

const Page = () => {
    const router = useRouter()
    const query = router.query.page
    console.log(router.query.page)

    return (
        <div>
            {/* <h1>{query}</h1> */}
            <ProductPage />

        </div>
    )
}

export default Page