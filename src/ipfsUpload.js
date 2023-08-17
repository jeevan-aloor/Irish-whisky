/**
 * 1. Create Project in https://app.infura.io/dashboard to get Project ID and Secret Key
 * 2. After login to above link, click "Create new API Key" and select Network as IPFS and choose a project name
 * 3. First Image has to be loaded to IPFS, which will return IPFS hash ("imageUpload" function)
 * 4. IPFS image hash has to be uploaded in content metadata.json file, and same file has to be uploaded to IPFS again ("metaDataUpload" function)
 * 5. Reference : https://docs.infura.io/infura/networks/ipfs/how-to/make-requests#ipfs-http-client
 */

const ipfsClient = require('ipfs-http-client');
const projectID = ""
const projectSecret = ""
const auth = 'Basic ' + Buffer.from(projectID + ':' + projectSecret).toString('base64');
const fs = require('fs');

const ipfs = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

async function imageUpload() {
  let imageMetadata = fs.readFileSync(`./bottle.jfif`);

  const imageBuffer_1 = Buffer.from(JSON.parse(JSON.stringify(imageMetadata)));

  const result = await ipfs.add(
    { path: '/nft.jpg', content: imageBuffer_1 },
    { wrapWithDirectory: true, pin: true }
  );

  console.log(result.cid.toString());
}

// Sample image URL : https://ipfs.io/ipfs/QmUKNbPoHie3h1AN6fVwnGAHWpotgRdcuorZRinnHW4zD8/nft.jpg

// imageUpload();

async function metaDataUpload() {
  let ipfsResponse = [];

  let metadata = fs.readFileSync(`./metadata.json`);

  const contentBuffer_1 = Buffer.from(JSON.parse(JSON.stringify(metadata)));

  const result = await ipfs.add(
    { path: '/metadata.json', content: contentBuffer_1 },
    { wrapWithDirectory: true, pin: true }
  );


  ipfsResponse.push(result);

  if (ipfsResponse) {
    console.log(ipfsResponse[0].cid.toString());
  }
}
metaDataUpload()

// Sample content metedata URL : https://ipfs.io/ipfs/QmcAECvYx9krfoL2CLos6zLiQjCw5Ajurxm4o1VAEhmrLJ
