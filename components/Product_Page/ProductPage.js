import React, { useState, useRef, useEffect } from 'react'
import classes from './ProductPage.module.scss'

import next from './icon-next.svg'
import previous from './icon-previous.svg'
import minus from './icon-minus.svg'
import plus from './icon-plus.svg'
import cart from './icon-cart.svg'


const ProductPage = (props) => {
    const images = [
        'https://images.unsplash.com/photo-1649516602438-7be2b1878dab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',

        'https://images.unsplash.com/photo-1649320101721-04853883d6f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649516970196-5f9cb176c14a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=858&q=80',

        'https://images.unsplash.com/photo-1649518897210-82409f5c678c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649528817667-b09da56af19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',

        'https://images.unsplash.com/photo-1615920353290-102c5e809d5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80',

        'https://images.unsplash.com/photo-1649452812982-183413e0a480?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649482410642-1e7ed5189748?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649450960338-10fda3757c74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649510227325-5e40e1d87caa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',

        'https://images.unsplash.com/photo-1649512848285-04210dc58d21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    ]
    useEffect(() => {

        console.log(window.innerWidth)
    })
    return (
        <div className={classes.content}>
            <ImageBox

                images={props.images ? props.images : images}

            ></ImageBox>


            <Product
                desc={props.desc ? props.desc : `These low-profile sneakers are your perfect casual wear companion.
                Featuring a durable rubber outer sole, they'll withstand everything
                the weather can offer.`}

                category={props.category ? props.category : 'sneaker company'}

                name={props.name ? props.name : 'Fall Limited Edition Sneakers'}

                originalPrice={props.originalPrice ? props.originalPrice : 250}

                discountPrice={props.discountPrice ? props.discountPrice : 125}

            ></Product>
        </div>
    )
}

const ImageBox = (props) => {
    const [imgIndex, setImgIndex] = useState(0)
    const [mainImg, setMainImg] = useState(props.images[imgIndex])
    const [sliceNum, setSliceNum] = useState({ 'num1': 0, 'num2': 4 })

    const ref = useRef()

    const changeActive = (newIndex) => {
        const index = newIndex % 4
        // console.log(index)
        const gallery = [...ref.current?.children]

        gallery.forEach(img => {
            img.classList.remove(classes.active);
        });
        //set active thumbnail
        gallery[index]?.classList.add(classes.active);
        // console.log(gallery)
    }

    const nextImg = () => {
        let newIndex = imgIndex + 1
        let CopySliceNum = sliceNum
        setImgIndex(newIndex)


        if (newIndex >= props.images.length) {
            newIndex = 0
            setImgIndex(0)
        }
        if (newIndex % 4 === 0) {
            CopySliceNum['num1'] = newIndex
            CopySliceNum['num2'] = CopySliceNum['num1'] + 4
        }

        if (CopySliceNum['num2'] >= props.images.length) {
            CopySliceNum['num2'] = props.images.length
        }
        if (CopySliceNum['num1'] >= props.images.length) {
            CopySliceNum['num1'] = props.images.length - 1
        }


        setSliceNum(CopySliceNum)
        // console.log(CopySliceNum)

        setMainImg(props.images[newIndex])

        changeActive(newIndex)

    }

    const prevImg = () => {
        let newIndex = imgIndex - 1
        let CopySliceNum = sliceNum
        setImgIndex(newIndex)

        // if hit prev from first index
        if (newIndex < 0) {
            newIndex = props.images.length - 1
            setImgIndex(newIndex)
            CopySliceNum['num1'] = newIndex - newIndex % 4
            CopySliceNum['num2'] = props.images.length
        }

        // if index % 4 === 3, it means it's the last showing index of the 4 thumbnail 
        else if (newIndex % 4 === 3) {

            // if num 2 is divisible by 4 (aka num2 % 4 === 0) then subtract 4 else, subtract remainder
            const num = CopySliceNum['num2'] % 4 === 0 ? 4 : CopySliceNum['num2'] % 4
            CopySliceNum['num1'] = newIndex - 3
            CopySliceNum['num2'] -= num
        }

        if (CopySliceNum['num1'] <= 0) {
            CopySliceNum['num1'] = 0
            CopySliceNum['num2'] = 4
        }

        setSliceNum(CopySliceNum)
        setMainImg(props.images[newIndex])
        // console.log(previous)

        changeActive(newIndex)
    }

    const thumbClick = (e) => {
        const gallery = [...ref.current?.children]

        gallery.forEach(img => {
            img.classList.remove(classes.active);
        });

        // console.log(Number(e.target.alt.split('-')[1]) - 1)
        e.target.parentElement.classList.add(classes.active);

        let newIndex = Number(e.target.alt.split('-')[1]) - 1

        setImgIndex(newIndex)
        setMainImg(props.images[newIndex])

    }

    const nextThumbImg = () => {
        const maxNum = props.images.length
        let CopySliceNum = sliceNum

        // if clicked next on last row
        if (CopySliceNum['num2'] >= maxNum) {
            CopySliceNum['num2'] = 4
            CopySliceNum['num1'] = 0
        }
        else {

            CopySliceNum['num2'] += 4
            CopySliceNum['num1'] += 4
        }

        // changes num2 to the lens of the array
        if (CopySliceNum['num2'] > maxNum) {
            CopySliceNum['num2'] = maxNum
        }

        setSliceNum(CopySliceNum)
        setImgIndex(CopySliceNum['num1'])
        setMainImg(props.images[CopySliceNum['num1']])
        changeActive(CopySliceNum['num1'])
        // console.log(sliceNum)
    }

    const prevThumbImg = () => {
        const minNum = 0
        let CopySliceNum = sliceNum

        // if clicked prev on first row
        if (CopySliceNum['num1'] <= minNum) {
            // const difference = CopySliceNum['num2'] - CopySliceNum['num1']
            const index = props.images.length - 1
            CopySliceNum['num1'] = index - index % 4
            CopySliceNum['num2'] = index
        }
        else {
            CopySliceNum['num2'] -= 4
            CopySliceNum['num1'] -= 4

        }


        if (CopySliceNum['num1'] <= minNum) {
            CopySliceNum['num1'] = minNum
            CopySliceNum['num2'] = 4
        }

        // If last row has less than 4 imgs
        else if (CopySliceNum['num2'] - CopySliceNum['num1'] != 4) {
            const difference = CopySliceNum['num2'] - CopySliceNum['num1']
            CopySliceNum['num2'] += 4 - difference
        }

        setSliceNum(CopySliceNum)
        setImgIndex(CopySliceNum['num1'])
        setMainImg(props.images[CopySliceNum['num1']])
        changeActive(CopySliceNum['num1'])
    }

    const imgClickModal = (e) => {
        console.log(e.target.parentNode.childNodes[1])
        const modalNode = e.target.parentNode.childNodes[1]
        modalNode.style.display = 'block'
    }

    const closeModal = (e) => {
        console.log(e.target.parentNode)
        const modalNode = e.target.parentNode
        modalNode.style.display = 'none'
    }

    // console.log(images.length)
    return (
        <section className={classes.imageBox}>
            <img onClick={(e) => { imgClickModal(e) }} className={classes.product_hero} src={mainImg} alt="image product" />

            <div id="myModal" className={classes.modal}>
                <span onClick={(e) => { closeModal(e) }} className={classes.close}>&times;</span>
                <img className={classes['modal-content']} src={mainImg} id="img01" />
                <div id="caption"></div>
            </div>

            <div onClick={prevImg} className={`${classes.previous} ${classes.arrow}`}>
                <img src={previous.src} alt="icon previous" />
            </div>

            <div onClick={() => { nextImg() }} className={`${classes.next} ${classes.arrow}`}>
                <img src={next.src} alt="icon next" />
            </div>

            <div ref={ref} className={classes.thumb_gallery}>

                {/* using slice to show a max of 4 items */}
                {props.images.slice(sliceNum['num1'], sliceNum['num2']).map((item, i) => {
                    let index = i + sliceNum['num1']

                    return (

                        <div key={i} className={`${classes.pic} ${i === 0 ? classes.active : ''}`}>

                            <img onClick={(e) => { thumbClick(e) }} src={item} alt={`thumb-${index + 1}`} />

                        </div>
                    )
                })}

                <div onClick={() => { prevThumbImg() }} className={`${classes.previous} ${classes.thumb_arrow}`}>
                    <img src={previous.src} alt="icon previous" />
                </div>

                <div onClick={() => { nextThumbImg() }} className={`${classes.next} ${classes.thumb_arrow}`}>
                    <img src={next.src} alt="icon next" />
                </div>
            </div>


        </section>
    )
}


const Product = (props) => {
    const [counter, setCounter] = useState(1)


    return (
        <section className={classes.product}>

            <div className={classes.company_name}>{props.category}</div>
            <div className={classes.title}>{props.name}</div>

            <div className={classes.description}>
                {props.desc}
            </div>

            <div className={classes.price_wrapper}>

                <div className={classes.group}>
                    <div className={classes.price}>${props.discountPrice}.00</div>
                    <div className={classes.discount}>50%</div>
                </div>

                <div className={classes.old_price}>${props.originalPrice}.00</div>
            </div>

            <div className={classes.count_btn_group}>

                {/* Quantity */}
                <div className={classes.counter_wrapper}>
                    <img onClick={() => { counter > 1 && setCounter(counter - 1) }} className={classes.btnMinus} src={minus.src} alt="icon minus" />

                    <div className={classes.counter}>{counter}</div>

                    <img className={classes.btnPlus} onClick={() => { setCounter(counter + 1) }} src={plus.src} alt="icon plus" />
                </div>

                {/* Add Cart */}
                <div className={classes.btn}>
                    <img src={cart.src} alt="icon cart" />
                    <p>Add to cart</p>
                </div>

            </div>

        </section>
    )
}

export default ProductPage