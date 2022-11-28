// Go to www.alchemy.com and create an account to grab your own api key!
const apiKey = "Saxd9yD8UOKpzCtVcC65GIy27dJ1j6hP";
const endpoint = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
console.log(endpoint);

 const getAddressNFTs = async (
  owner,
  contractAddress,
  retryAttempt
) => {
  if (retryAttempt === 5) {
    return;
  }
  if (owner) {
    let data;
    try {
      if (contractAddress) {
        data = await fetch(
          `${endpoint}/getNFTs?owner=${owner}&contractAddresses%5B%5D=${contractAddress}`
        ).then((data) => data.json());
      } else {
        data = await fetch(`${endpoint}/getNFTs?owner=${owner}`).then((data) =>
          data.json()
        );
      }
    } catch (e) {
      getAddressNFTs(endpoint, owner, contractAddress, retryAttempt + 1);
    }

    // setNFTs(data.ownedNfts);
    return data;
  }
};

const getNFTsMetadata = async (nfts) => {
  const NFTsMetaData = await Promise.all(
    nfts.map(async (nft) => {
      const metaData = await fetch(
        `${endpoint}/getNFTMetadata?contractAddress=${nft.contract.address}&tokenId=${nft.id.tokenId}&refreshCache=false`
      ).then((data) => data.json());
      let imageUrl;
      if(metaData.media[0].gateway.length){
        imageUrl = metaData.media[0].gateway;
      }
      else{
        imageUrl='https"//via.placeholder.com/500';
      }
    //   console.log(metaData.description);
      return {
        id: nft.id.tokenId,
        contractAddress: nft.contract.address,
        imageUrl: imageUrl,
        title: metaData.title,
        description: metaData.description,
        attributes: metaData.metadata.attributes,
      };
    })
  );
  return NFTsMetaData;
};

const fetchNFTs = async (owner, contractAddress, setNFTs) => {
const data = await getAddressNFTs (owner, contractAddress)
// console.log(data);
if (data.ownedNfts.length) {
    const NFTs = await getNFTsMetadata (data.ownedNfts)
    console.log(NFTs);
// let fullfilledNFTs = NFTs.filter (NFT => NFT.status === "fulfilled")
setNFTs(NFTs);
} else {
setNFTs (null)
}
}

export {fetchNFTs};