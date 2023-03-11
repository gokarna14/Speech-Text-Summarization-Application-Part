import React from "react";
import { useState } from 'react'
import Swal from 'sweetalert2'
import { settings } from "../icons"

const Index =()=>{

    const sizes = ["Small", "Medium", "Large"];
    
    const sizesToSendToApi = [0.1, 0.5, 0.8]
    

    const [text, setText] = useState('')
    const [data, setData] = useState(null);
    const [textId, setTextId] = useState(0)
    const [selectedSize, setSelectedSize] = useState('M');
    const [showSettings, setShowSettings] = useState(false);
    const [rangeValue, setRangeValue] = useState(2)

    const [significantWords, setSignificantWords] = useState([])

    const [summary, setSummary] = useState("")


    async function getData(url, setFunction, method = "GET", body = null) {
        if (method === "GET") {
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
        else {
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


    const generateSummaryFromModel = (text) => {
        return text;
    }

    async function generateSummary() {

        setText(text)
        // console.log(text);

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
                    "compression_ratio": sizesToSendToApi[rangeValue]
                })
            }
        )
            .then(response => response.json())
            .then(json => {
                // setTextId(json["MAX(text_id)"]);
                // new Promise(()=>setTextId(json["MAX(text_id)"]))
                return json["summary"]
            })
        
        console.log(summary_);

        setSummary(summary_);
        setSignificantWords(summary_["significant_words"]);

        // post summary
        await fetch(
            "http://127.0.0.1:5000/summary",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    "summary": summary_,
                    "compression_ratio": sizesToSendToApi[rangeValue],
                    "text_id": text_id
                })
            }
        )



    }

    const summarizationClicked = async () => {
        // console.log(text);

        if (text.split(" ").length < 50) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The input text is too short to summarize!!! Try again with longer length (> 50 words)',
                // footer: '<a href="">Why do I have this issue?</a>'
            })
        }
        else {
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
        if (event.target.value !== "") {
            setSelectedSize(event.target.value);
        }
    }

    return(
        <div>
        <div class="p-3 mb-2">
            <div className="container">
                <div className="row">
                    <div className="col-6 my-2 p-2">
                        <div className="input-group input-group-lg">
                            <textarea type="text" className="form-control border rounded border-primary" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                placeholder='Type your text here ...'
                                rows="15"
                                cols="50"
                                value={text}

                                onChange={(e) => {
                                    setText(e.target.value);
                                    console.log("Changed");
                                    setSummary("");
                                }}
                            />
                        </div>
                        <div className="row mx-auto pt-4">
                            <div className="col btn btn-warning"
                                onClick={() => {summarizationClicked()}}
                            >
                                {settings} Summarize {settings}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 my-2 p-2">
                        <div>
                            <div className="container" style={{ fontSize: '20px' }}>
                                <div className="row">
                                    <div className="float-start col">
                                        <span className='float-start'>Small</span>
                                    </div>
                                    <div className="col center text-center">
                                        <span>Medium</span>
                                    </div>
                                    <div className="col">
                                        <span className='float-end'>Large</span>
                                    </div>
                                </div>
                                <div className="row p-1">
                                    <input type="range" class="form-range" id="customRange1" min={0} max={2} step={1} onChange={(e) => { 
                                        setRangeValue(parseInt(e.target.value));
                                     }} />
                                     {/* {rangeValue} */}
                                </div>
                            </div>
                        </div>

                        <div className="input-group input-group-lg">
                            <textarea type="text" className="bg-light form-control border rounded border-success text-black" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                placeholder='Your summary will appear here ...'
                                value={summary["summary"] === "" || text == "" ? "" : summary["summary"]}
                                disabled
                                rows="12"
                                cols="50"
                                // value={"Your text to summarize here ... "}

                                onChange={(e) => {
                                    // TODO
                                }}
                            />
                        </div>
                        <div>
                            <b>Significant words</b>
                        </div>
                        <div className='pt-2'>
                                <textarea type="text" className="form-control border rounded border-success font-monospace text-primary" aria-label="Large" aria-describedby="inputGroup-sizing-sm"
                                    placeholder='Significant words will appear here ...'
                                    value={summary === "" || text == "" ? "" : `${summary["significant_words"].join(", ")}`}
                                    disabled
                                    rows="2"
                                    cols="50"
                                    // value={"Your text to summarize here ... "}

                                    onChange={(e) => {
                                        // TODO
                                    }}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Index;