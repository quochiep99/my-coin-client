import sha256 from "js-sha256";

const createBlock = (index, previousHash, data) => {
  let timestamp;
  let nonce;
  let hash;
  let newBlock;

  let previousTimestamp;
  while (true) {
    previousTimestamp = Math.floor(Date.now() / 1000);
    for (nonce = 0; nonce <= Number.MAX_SAFE_INTEGER; nonce++) {
      timestamp = Math.floor(Date.now() / 1000);

      // within 1 second
      if (timestamp - previousTimestamp < 1) {
        hash = sha256("" + index + previousHash + timestamp + data + nonce);
        // difficulty : 3
        if (hash.substr(0, 3) === "000") {
          newBlock = {
            index,
            previousHash,
            timestamp,
            data,
            nonce,
            hash,
          };
          return newBlock;
        }
      } else {
        // move onto new second, start nonce from 0 again
        break;
      }
    }
  }
};

export default createBlock;
