import React from 'react'
import classes from './TextDiv.module.scss'

const TextDiv = (props) => {
    return (
        <div style={{ 'backgroundColor': props.bgColor, 'color': props.color }} className={classes.main}>

            {props.title &&

                <h2>{props.title}</h2>
            }


            <div className={classes.textSplit}>

                {props.textOne &&



                    <div className={`${classes.split1} ${!props.textTwo && classes.single}`}>
                        <h3>{props.textOne.title}</h3>
                        <p>
                            {props.textOne.summary}
                        </p>

                    </div>
                }





                {props.textTwo &&



                    <div className={classes.split2}>
                        <h3>{props.textTwo.title}</h3>
                        <p>
                            {props.textTwo.summary}
                        </p>


                    </div>
                }


            </div>

        </div>
    )
}

export default TextDiv