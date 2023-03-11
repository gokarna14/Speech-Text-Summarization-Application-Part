import { ppGif, saGif, prabas, abhay, dipesh, kshitiz } from "../db/img";
// import Background from './../resources/img/bg.jpg'
import SideBySide from '../template/SideBySide';
import { Parallax } from "react-parallax";
import Separator from '../template/Separator';
import Parallel from "../Animations/Parallel";

import  '../css/AboutUs.css'


const pictures={
    '075BEI014': prabas,
    '075BEI015': kshitiz,
    '075BEI013': dipesh,
    '075BEI003': abhay,
}

const Home = ()=>{

    const spacing = [1, 2, 3, 4, 5, 6].map(
        (i)=>{
            return(
                <br />
            )
        }
    ) 



    const developers = {
    'Home': <div className='niceCenter  px-5'>
        <dir className='Home  px-5'>
            <h2>About Us</h2>
            <p>We are undergrad students, currently a year III student under the program BE in Electronics, Communication and Information at IOE, Pulchowk.</p>
        </dir>
        
    </div>,
    'devs': <div className='niceCenter px-5'>
         <table className='table' style={{
             color: 'white'
         }}>
                                <tbody>
                                    <tr>
                                        <th>
                                            {abhay} 
                                            <br />
                                            Abhay Nepal
                                            <br />
                                            075BEI003
                                        </th>
                                        <th>
                                            {dipesh} 
                                            <br />
                                            Dipesh Tripati
                                            <br />
                                            075BEI013
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            {prabas} 
                                            <br />
                                            Gokarna Adhikari
                                            <br />
                                            075BEI014
                                        </th>
                                        <th>
                                            {kshitiz} 
                                            <br />
                                            Kshitiz Dhakal
                                            <br />
                                            075BEI015
                                        </th>
                                    </tr>
                                </tbody>
        </table>
    </div>
    }

    const sa ={
        'left':<>
        <div className="px-5">
            {saGif}
        </div>
        </>,
        'right':<div className='px-5'>
        <dir style={{
            textAlign: 'right'
        }}>
            <h2>Summary Generation</h2>
            <p>We can generate the summary of an english text !</p>
        </dir>
        
    </div>
    }

    const pp ={
        'right':<>
            {ppGif}
        </>,
        'left':<div className=''>
        <dir style={{
            textAlign: 'left'
        }}>
            <h2>Keywords Detection</h2>
            <p>We can predict human personality that is true for Quarter of the world population based on more than 70 thousands data !</p>
        </dir>
        
    </div>
    }





    return <div>

            <Parallax
            blur={0} 
            bgImage={require("../resources/img/gif/threader.gif")} 
            bgImageAlt="the cat" 
            strength={200}

            
            >
                        {spacing}
                        {spacing}
                        <div className='niceCenter developers px-5' 
                        style={{
                            textAlign:'left'
                        }}
                        >
                                <h1>WELCOME</h1>
                                <h1>TO</h1>
                                <h1>AUTOMATIC TEXT <h1></h1> SUMMARIZATION!</h1>                        
                        </div>
                        {spacing}
                {spacing}
            </Parallax> 

            {Separator}

            <Parallax 
                blur={4} 
                bgImage={require("../resources/img/developers.jpg")} 
                bgImageAlt="the cat" 
                strength={200}>
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={developers.devs}
                        right={developers.Home}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>
                        
           <Parallel
                text={'The Project'}
                r= {210}
                g={43}
                b={43}
           >   
           </Parallel>
            
            <Parallax
            className='niceCenter'
                renderLayer={percentage => (
                    <div
                        style={{
                            position: 'absolute',
                            background: `rgba(0, 43, 43, ${percentage * 1000})`,
                            left: '0%',
                            top: '0%',
                            bottom: '0%',
                            width: percentage*window.scrollY*2,
                            height: percentage*1000,
                        }}
                    />
                )}
                >
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={sa.left}
                        right={sa.right}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>
            {Separator}


            <Parallax
            className=''
                renderLayer={percentage => (
                    <div
                        style={{
                            position: 'absolute',
                            background: `rgba(0, 43, 43, ${percentage * 1000})`,
                            left: '0%',
                            top: '0%',
                            bottom: '0%',
                            width: percentage*window.scrollY*2,
                            height: percentage*1000,
                        }}
                    />
                )}
                >
                {spacing}
                <div className='developers'>
                    <SideBySide
                        left={pp.left}
                        right={pp.right}
                    ></SideBySide>
                </div>
                {spacing}
            </Parallax>


            {/* {saGif}
            {prabas}
            {kshitiz}
            {abhay}
            {dipesh} */}
    </div> 


}

export default Home;





