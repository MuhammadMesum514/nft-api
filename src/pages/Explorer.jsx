import React,{useState} from 'react'
import NFTCard from '../components/NFTCard';
import { fetchNFTs } from "../utils/fetchNFT";
const Explorer = () => {
      const [owner, setOwner] = useState("")
    const [contractAddress, setContractAddress] = useState("")
    const [NFTs, setNFTs] = useState("")
    if(NFTs){
        console.log(NFTs);
    }
  return (
      <div>
            <header className=' py-24  mb-12 w-full   alchemy'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                           Lets Explore NFTs with Mesum
                        </h1>
                        <p>An inspector to find NFTs by owner and contract address </p>
                    </div>
                    <div className='flex flex-col items-center justify-center mb-4 w-2/6 gap-y-2 '>
                        <input className="border rounded-sm focus:outline-none py-2 px-3 w-full" value={owner} onChange={(e) => setOwner(e.target.value)} placeholder='Insert your wallet address'></input>
                        <input className="focus:outline-none rounded-sm py-2 px-3 w-full" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} placeholder='Insert NFT Contract address (optional)'></input>
                    </div>
                    <div className='w-2/6 flex justify-center'>
                    <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2' onClick={() => {fetchNFTs(owner, contractAddress, setNFTs    )}}>Search</button>
                    </div>
                </div>
            </header>
            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {
                       
                        return (
                           <NFTCard imageUrl={NFT.imageUrl} id={NFT.id.tokenId } title={NFT.title} contractAddress={NFT.contractAddress} description={NFT.description} attributes={NFT.attributes} ></NFTCard>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
        </div>
  )
}

export default Explorer
