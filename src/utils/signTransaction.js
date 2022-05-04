import { ethers } from "ethers";

const signTransaction = (transactionData, privateKey) => {
  const digest = ethers.utils.id(JSON.stringify({ transactionData }));
  const signingKey = new ethers.utils.SigningKey(privateKey);
  const signature = signingKey.signDigest(digest);
  const joinedSignature = ethers.utils.joinSignature(signature);
  return joinedSignature;
  //   const recoveredAddress = ethers.utils.recoverAddress(digest, signature);
};

export default signTransaction;
