import React from 'react'

const NFTCard = ({ imageUrl, id, title, contractAddress, description, attributes }) => {
    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <img className='w-full h-60 rounded-t-md' key={id} src={imageUrl} alt={title}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                        {/* <p>{`${id.slice(0, 4)}...${id.slice(id.length - 4)}`}</p> */}
                        <p>{id}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" className="text-blue-700" href={`https://etherscan.io/token/${contractAddress}`} rel="noreferrer">{contractAddress ? `${contractAddress.slice(0, 4)}...${contractAddress.slice(contractAddress.length - 4)}` : 'no address found'}</a>
                    </div>
                </div>
                <p>{description ? description.slice(0, 50) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">
                {attributes?.length > 0 && attributes.slice(0,4).map(attribute => {
                    return (
                        <div className="w-1/2 mb-2 flex justify-start flex-col">
                            {/* <span class="inline-flex bg-indigo-600 text-white rounded-full h-6 px-3 justify-center items-center">
                                {attribute.trait_type}: {attribute.value}
                            </span>
                            <span class="inline-flex px-2 text-indigo-600">
                            </span> */}
                            <p className="mr-2 text-blue-600 md:text-green-600 font-bold">{attribute.trait_type}: </p>
                            <span className="py-1 mx-2 text-center w-30 text-sm rounded-full text-white  bg-indigo-500 hover:bg-slate-700"> {attribute.value}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NFTCard
