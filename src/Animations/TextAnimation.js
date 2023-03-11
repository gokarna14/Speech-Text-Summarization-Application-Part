import React from "react";
import AnimatedText from 'react-animated-text-content';


const TextAnimation=(props)=>{
    return(
        <>
        <div className="text-center mx-5">
        {props.noHr == null ? <hr /> : ""}
          <div className={`font-monospace ${props.textTag != null ? props.textTag : 'h3'}`}>
            <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
              }}
              animationType="wave"
              interval={0.06}
              duration={1}
              tag="p"
              className="animated-paragraph"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              {props.text}
            </AnimatedText>
          </div>
          {props.noHr == null ? <hr /> : ""}
        </div>

        </>
    )
}

export default TextAnimation;