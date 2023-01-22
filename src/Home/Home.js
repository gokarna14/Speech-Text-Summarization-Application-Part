import React from 'react'
import { useState } from 'react'
import Swal from 'sweetalert2'


const Home = ()=>{

    // const filter

    const size = {
        "S":0.1,
        "M":0.5,
        "L":0.8,
    }

    const [text, setText] = useState("")
    const [data, setData] = useState(null);
    const [textId, setTextId] = useState(0)
    const [selectedSize, setSelectedSize] = useState('S');

    const [summary, setSummary] = useState("")


    async function getData(url, setFunction, method = "GET", body = null) {
        if (method === "GET"){
            await fetch(url,
                {
                    method: method,
                    // headers:  method = "GET" ? "" : {
                    //     'Content-Type': 'application/json'
                    // },
                    // body: method = "GET" ? "" :  JSON.stringify(body)
                })
            .then(response => response.json())  
            .then(json => {
                // console.log(json);
                setFunction(json);
                // document.getElementById("demo").innerHTML = JSON.stringify(json)
            })
        }
        else{
            await fetch(url,
                {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
            .then(response => response.json())  
            .then(json => {
                // console.log(json);
                setFunction(json);
                // document.getElementById("demo").innerHTML = JSON.stringify(json)
            })
        }
    }


    const generateSummaryFromModel = (text)=>{
        return text;
    }

    async function generateSummary(){

        setText(toString(text)) 
        console.log(text);
        
        // post text
        await fetch(
            "http://127.0.0.1:5000/text",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "text": text
                })
            }
        )
        
        //Determining the latest text id
        let text_id = await fetch("http://127.0.0.1:5000/text")
        .then(response => response.json())  
        .then(json => {
            // setTextId(json["MAX(text_id)"]);
            // new Promise(()=>setTextId(json["MAX(text_id)"]))
            return json["MAX(text_id)"]
        })
        

        // console.log(text_id);

        let summary_ = await fetch(
            "http://127.0.0.1:5000/generate_summary",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "text": text,
                    "compression_ratio":  size[selectedSize]
                })
            }
        )
        .then(response => response.json())  
        .then(json => {
            // setTextId(json["MAX(text_id)"]);
            // new Promise(()=>setTextId(json["MAX(text_id)"]))
            return json["summary"]["summary"]
        })


        setSummary(summary_);

        // post summary
        await fetch(
            "http://127.0.0.1:5000/summary",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                        "summary" : summary_,
                        "compression_ratio" : size[selectedSize],
                        "text_id" : text_id
                })
            }
        )

        

    }
    
    const summarizationClicked = async ()=>{
        // console.log(text);

        if (text.length < 50){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The input text is too short to summarize!!! Try again with longer length (> 50 characters)',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        }
        else{
            Swal.fire({
                title: 'Do you want to generate the summary?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'YES',
                denyButtonText: `NO`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    generateSummary(text) 
                } else if (result.isDenied) {
                  Swal.fire('OKAY !!', 'No summary is generated please try again !', 'info')
                }
              })
        }

        // generateSummary(text) 


        // let body = {
        //     "summary" : "The Summary from ReactJS",
        //     "compression_ratio" : "0.5",
        //     "text_id" : 13
        
        // }


        // await getData("http://127.0.0.1:5000/summary", setData, "POST", body);
    }

    const handleChange = (event) => {
        setSelectedSize(event.target.value);
      }


    return (
        <>
            <hr />

            <div className="SizeDropdown">
                <label>
                    How long do you want your summarization to be ?
                    <br />
                    <select value={selectedSize} onChange={handleChange}>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Long</option>
                    </select>
                </label>
            </div>
            
            <hr />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Input Your Text Here</span> 
                </div>

            <hr />

            <div className='niceCenter'>
                <div className="input-group input-group-lg">
                    <br />
                    <textarea type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                        rows="10" 
                        cols="70"
                        // value={"Your text to summarize here ... "}

                    onChange={(e)=>{
                        setText(e.target.value)
                    }}

                    />
                </div>

                


                
            </div>
            
            <hr />
            <button
                onClick={summarizationClicked}
            >Summarize !</button>
            <hr />
            
            {
                (summary !== "") && <>
                    {summary}
                </>
            }

        </>
    )

}

export default Home;



