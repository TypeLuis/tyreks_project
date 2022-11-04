import classes from '../styles/Card.module.scss'
import { useEffect, useState, useRef } from 'react'
import ReactStars from "react-rating-stars-component";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Images from './images';

const Card = (props) => {

    const [imageNum, setImageNum] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    const [deviceType, setDeviceType] = useState()
    const [count, setCount] = useState(0)
    const cardRef = useRef(null)


    const router = useRouter()

    const handleClick = () => {
        router.push(`/Shop/${props.category ? props.category : 'console'}/${props.name ? props.name : 'PS5'}`)
    }




    const thirdExample = {
        size: 30,
        count: 5,
        isHalf: true,
        edit: false,
        value: props.rating ? props.rating : 3.7,
        activeColor: "yellow",
    };

    const images = props.images ? props.images : [
        'https://images.unsplash.com/photo-1653744018861-72293010037b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1438&q=80',

        'https://images.unsplash.com/photo-1653677204619-241774d281ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1653671637237-befb4bcfe142?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80',

        'https://images.unsplash.com/photo-1644772457564-968f55e3fdc3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80',

        'https://images.unsplash.com/photo-1653690832636-f02f9490935d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    ]


    useEffect(() => {

        // FUNCTION that checks what device type the user is using
        const deviceTypeFunc = () => {
            const ua = navigator.userAgent;
            if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                // setDeviceType('tablet')
                return "tablet";
            }
            else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                // setDeviceType('mobile')
                return "mobile";
            }
            // setDeviceType('desktop')
            return "desktop";
        };

        setDeviceType(deviceTypeFunc())


        const card = cardRef.current


        const appearOptions = {
            threshold: 0,
            rootMargin: "-5% 0px"
        }



        const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {


            entries.forEach((entry, index) => {
                const slider = entry.target.parentNode?.classList.contains('slider')

                if (!entry.isIntersecting) {
                    if (slider) return

                    switch (deviceTypeFunc()) {

                        case 'tablet':
                        case 'mobile':

                            // console.log('bye', intervalId)
                            setImageNum(imageNum = 0)
                            clearInterval(intervalId)

                            break
                    }

                    entry.target.classList.remove(classes[deviceTypeFunc()])

                    // Element is above the viewport
                    if (entry.boundingClientRect.top > 0) {
                        if (count < 5) {
                            // console.log(count)
                            entry.target.classList.remove(classes.appear)
                            setCount(count++)
                        }
                    }

                    // Element is below viewport
                    else return

                }
                else {

                    if (slider) return

                    // if the deviceType is mobile or tablet
                    switch (deviceTypeFunc()) {

                        case 'tablet':
                        case 'mobile':

                            const newInterval = setInterval(() => {
                                const newNum = imageNum + 1

                                setImageNum(newNum > images.length ? imageNum = 0 : imageNum++)

                            }, 2000);

                            setIntervalId(intervalId = newInterval)

                            break
                    }
                    entry.target.classList.add(classes[deviceTypeFunc()])
                    entry.target.classList.add(classes.appear)
                }
            })
        }, appearOptions)

        appearOnScroll.observe(card)
        if (card.parentNode.classList.contains('slider')) {
            card.classList.add(classes.slider_event)
        }

    }, [])


    const hoverFunction = (e) => {

        if (props.slider) return

        switch (deviceType) {
            case 'desktop':

                const newInterval = setInterval(() => {
                    const newNum = imageNum + 1
                    console.log(imageNum, newNum)

                    setImageNum(newNum > images.length ? imageNum = 0 : imageNum++)

                }, 2000);

                setIntervalId(intervalId = newInterval)
                break

        }
    }


    const hoverOut = (e) => {

        if (props.slider) return

        switch (deviceType) {

            case 'tablet':
            case 'mobile':
                break

            case 'desktop':

                setImageNum(0)
                clearInterval(intervalId)
                break

        }
    }

    return (
        <div ref={cardRef} onClick={() => { handleClick() }} onMouseOver={hoverFunction} onMouseOut={hoverOut} className={`${classes.card} ${!props.slider ? classes.single : classes.slider}`}>

            <div className={classes.product__image}>
                {/* <img src='https://images.unsplash.com/photo-1648326311535-21895c185fbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' /> */}

                {props.slider ?

                    // React.js
                    // <img src={images[0]}></img>

                    // Next.js
                    <Image layout='fill' src={images[0]} />

                    :

                    <div style={{ '--num': images.length + 1 }} className={`${classes.images}`}>
                        {images.map((item, i) => {
                            return (

                                // utilize in React.js
                                // <img className={i === imageNum && classes.newImage} src={item} />

                                // Utilize in Next.js
                                <div className={`${classes.imageDiv} ${i === imageNum && classes.newImage}`}>
                                    <Image layout='fill' src={item} />
                                </div>
                            )
                        })}
                    </div>

                }
            </div>

            {/* <div className={classes.product__wave}>

            </div> */}

            <div className={classes.product__info}>

                <div className={classes.info__flex}>

                    <div className={classes.product__title}>
                        {props.name ? props.name : 'Product title display'}
                    </div>
                    <div className={classes.product_rating}>
                        <ReactStars {...thirdExample} />
                    </div>
                </div>
                <div className={classes.info__flex2}>

                    <div className={classes.product__price}>
                        ${props.price ? props.price : 74}
                    </div>
                    <div className={classes.product__review}>
                        Based on <span>{props.reviewCount ? props.reviewCount : 10}</span> reviews.
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card