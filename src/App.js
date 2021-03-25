import React from 'react'
import Web3 from 'web3'
import './App.css';
import StatusNetwork from './abis/StatusNetwork.json'
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
  const [account, setAccount] = React.useState("")
  const [statusNetwork, setStatus] = React.useState(null)
  const [postCount, setPostCount] = React.useState(0)
  const [posts, setPosts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(async() => {
    await loadWeb3()
    await loadBlockChainData()
  },[])

  const loadWeb3 = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.wweb3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You shoule consider trying Metamask!')
    }
  }

  const loadBlockChainData = async () => {
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    setAccount(account[0])

    const networkId = await web3.eth.net.getId()
    const networkData = StatusNetwork.networks[networkId]
    if(networkData) {
      const statusNetwork = new web3.eth.Contract(StatusNetwork.abi, networkData.address)
      setStatus(statusNetwork)
      const postCount = await statusNetwork.methods.postCount().call()
      // setPostCount(postCountNew)

      for (let i = 0; i <= postCount; i++){
        const post = await statusNetwork.methods.posts(i).call()
        setPosts([...posts, post])
        console.log(posts, "mantap", postCount)
      }
      setLoading(false)
    } else {
      window.alert('Non-Ethereum browser detected. You shoule consider trying Metamask!')
    }
  }

  const createPost = (content) => {
    setLoading(true)
    statusNetwork.methods.createPost(content).send({from: account})
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }
  
  return (
    <div>
      <Navbar account={account} />
      {loading
        ? <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        : <Main
            posts={posts}
            createPost ={createPost}
          />
      }
    </div>
  );
}

export default App;
