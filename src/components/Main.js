import React from 'react'
import IdentIcon from 'identicon.js'

function Main(props) {
    const [input, setInput] = React.useState("")
    const ref = React.useRef()
    
    return (
        <div className="container-fluid mt-5">
            <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth:'500px'}}>
                <div className="content mr-auto ml-auto">
                    <p>&nbsp;</p>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        
                        props.createPost(input)
                    }} >
                        <div className="form-group mr-sm-2">
                            <input
                                id="postContent"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="What's on your mind?"
                                required
                            />
                            <button type="submit" className="btn btn-primary btn-block">Post</button>
                        </div>
                    </form>
                    <p>&nbsp;</p>

                {props.posts.map((post, key)=> {
                    return (
                    <div class="card mb-4" key={key}>
                        <div className="card-header">
                        <img className="ml-2" width='30' height='30' src={`data:image/png;base64,${new IdentIcon(post.author, 30).toString()}`}/>

                        <small className="text-muted"> {post.author}</small>
                        </div>
                        <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                            <p>{post.content}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">
                            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(),'Ether')} ETH
                            </small>
                            <button className="btn btn-link btn-sm float-right pt-0">
                            <span>
                                TIP 0.1 ETH
                            </span>
                            </button>
                        </li>
                        </ul>
                    </div>  
                    )
                })}
                </div>
            </main>
            </div>
        </div>
    )
}

export default Main
