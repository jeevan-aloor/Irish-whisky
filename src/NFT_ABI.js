export const NFT_ABI = [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "ApprovalForAll",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "string",
              "name": "indexedTokenIPFSPath",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "uint256",
              "name": "royalty",
              "type": "uint256"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "marketContract",
              "type": "address"
          }
      ],
      "name": "Minted",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "baseURI",
              "type": "string"
          }
      ],
      "name": "NFTMetadataUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "fromPaymentAddress",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "toPaymentAddress",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "TokenCreatorPaymentAddressSet",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "fromCreator",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "toCreator",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "TokenCreatorUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "string",
              "name": "indexedTokenIPFSPath",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          }
      ],
      "name": "TokenIPFSPathUpdated",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "string",
              "name": "indexedTokenIPFSPath",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          }
      ],
      "name": "Updated",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "baseURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getApproved",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "nftMarket",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getFeeBps",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
          }
      ],
      "name": "getFeeRecipients",
      "outputs": [
          {
              "internalType": "address payable[]",
              "name": "",
              "type": "address[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "nftMarket",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getFees",
      "outputs": [
          {
              "internalType": "address payable[2]",
              "name": "recipients",
              "type": "address[2]"
          },
          {
              "internalType": "uint256[2]",
              "name": "feesInBasisPoints",
              "type": "uint256[2]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          }
      ],
      "name": "getHasCreatorMintedIPFSHash",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getNextTokenId",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getTokenCreatorPaymentAddress",
      "outputs": [
          {
              "internalType": "address payable",
              "name": "tokenCreatorPaymentAddress",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getTokenIPFSPath",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getTokenRoyalty",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getWhiskyTreasury",
      "outputs": [
          {
              "internalType": "address payable",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address payable",
              "name": "treasury",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "symbol",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "baseURI",
              "type": "string"
          }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          }
      ],
      "name": "isApprovedForAll",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "royalty",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "marketContract",
              "type": "address"
          }
      ],
      "name": "mint",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "royalty",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "marketContract",
              "type": "address"
          }
      ],
      "name": "mintAndApproveMarket",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          },
          {
              "internalType": "address payable",
              "name": "tokenCreatorPaymentAddress",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "royalty",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "marketContract",
              "type": "address"
          }
      ],
      "name": "mintWithCreatorPaymentAddress",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          },
          {
              "internalType": "address payable",
              "name": "tokenCreatorPaymentAddress",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "royalty",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "marketContract",
              "type": "address"
          }
      ],
      "name": "mintWithCreatorPaymentAddressAndApproveMarket",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "ownerOf",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "registerInterfaces",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
          }
      ],
      "name": "supportsInterface",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
          }
      ],
      "name": "tokenByIndex",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenCreator",
      "outputs": [
          {
              "internalType": "address payable",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
          }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "tokenIPFSPath",
              "type": "string"
          }
      ],
      "name": "updateTokenURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  }
]

export const MARKET_ABI = [
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint8",
      "name": "version",
      "type": "uint8"
    }
  ],
  "name": "Initialized",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "primaryWhiskyFeeBasisPoints",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "secondaryWhiskyFeeBasisPoints",
      "type": "uint256"
    }
  ],
  "name": "MarketFeesUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "address",
      "name": "paymentMode",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "seller",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "buyer",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "creatorFee",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "ownerRev",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "deadline",
      "type": "uint256"
    }
  ],
  "name": "PrivateSaleFinalized",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "bidder",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "endTime",
      "type": "uint256"
    }
  ],
  "name": "ReserveAuctionBidPlaced",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "ReserveAuctionCanceled",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "string",
      "name": "reason",
      "type": "string"
    }
  ],
  "name": "ReserveAuctionCanceledByAdmin",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "minPercentIncrementInBasisPoints",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "maxBidIncrementRequirement",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "extensionDuration",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "goLiveDate",
      "type": "uint256"
    }
  ],
  "name": "ReserveAuctionConfigUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "seller",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "reservePrice",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "paymentMode",
      "type": "address"
    }
  ],
  "name": "ReserveAuctionCreated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "seller",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "bidder",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "f8nFee",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "creatorFee",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "ownerRev",
      "type": "uint256"
    }
  ],
  "name": "ReserveAuctionFinalized",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "originalSellerAddress",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "newSellerAddress",
      "type": "address"
    }
  ],
  "name": "ReserveAuctionSellerMigrated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "reservePrice",
      "type": "uint256"
    }
  ],
  "name": "ReserveAuctionUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "tokenAddress",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "bool",
      "name": "status",
      "type": "bool"
    }
  ],
  "name": "TokenUpdated",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "WithdrawPending",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "user",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "Withdrawal",
  "type": "event"
},
{
  "inputs": [
    {
      "internalType": "uint256[]",
      "name": "listedAuctionIds",
      "type": "uint256[]"
    },
    {
      "internalType": "address",
      "name": "originalAddress",
      "type": "address"
    },
    {
      "internalType": "address payable",
      "name": "newAddress",
      "type": "address"
    },
    {
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }
  ],
  "name": "adminAccountMigration",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "reason",
      "type": "string"
    }
  ],
  "name": "adminCancelReserveAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "minPercentIncrementInBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "primaryF8nFeeBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "secondaryF8nFeeBasisPoints",
      "type": "uint256"
    }
  ],
  "name": "adminUpdateConfig",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "tokenAddress",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "status",
      "type": "bool"
    }
  ],
  "name": "adminUpdateToken",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "contract IERC721Upgradeable",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "paymentMode",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "deadline",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }
  ],
  "name": "buyFromPrivateSale",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "cancelReserveAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "reservePrice",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "startDate",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "endDate",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "paymentMode",
      "type": "address"
    }
  ],
  "name": "createReserveAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "finalizeReserveAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "getFeeConfig",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "primaryWhiskyFeeBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "secondaryWhiskyFeeBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "secondaryCreatorFeeBasisPoints",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    }
  ],
  "name": "getFees",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "foundationFee",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "creatorSecondaryFee",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "ownerRev",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "getIsPrimary",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "getMinBidAmount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "user",
      "type": "address"
    }
  ],
  "name": "getPendingWithdrawal",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "getReserveAuction",
  "outputs": [
    {
      "components": [
        {
          "internalType": "address",
          "name": "nftContract",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "seller",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "startTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "endTime",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "bidder",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "paymentMode",
          "type": "address"
        }
      ],
      "internalType": "struct NFTMarketReserveAuction.ReserveAuction",
      "name": "",
      "type": "tuple"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getReserveAuctionConfig",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "minPercentIncrementInBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "duration",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }
  ],
  "name": "getReserveAuctionIdFor",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "userAddress",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    }
  ],
  "name": "getUserTokensOnSale",
  "outputs": [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getWhiskyFees",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "primaryWhiskyFeeBasisPoints",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "secondaryWhiskyFeeBasisPoints",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "getWhiskyTreasury",
  "outputs": [
    {
      "internalType": "address payable",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address payable",
      "name": "treasury",
      "type": "address"
    }
  ],
  "name": "initialize",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    }
  ],
  "name": "placeBid",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes32",
      "name": "hash",
      "type": "bytes32"
    },
    {
      "internalType": "bytes",
      "name": "signature",
      "type": "bytes"
    }
  ],
  "name": "recoverSigner",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "pure",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "tokens",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "auctionId",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "reservePrice",
      "type": "uint256"
    }
  ],
  "name": "updateReserveAuction",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "userTokensOnSale",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address payable",
      "name": "user",
      "type": "address"
    }
  ],
  "name": "withdrawFor",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}
]

export const COLLECTION_ABI = [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "string",
              "name": "colCode",
              "type": "string"
          },
          {
              "indexed": false,
              "internalType": "address",
              "name": "newCollection",
              "type": "address"
          }
      ],
      "name": "CollectionCreated",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "collections",
      "outputs": [
          {
              "internalType": "string",
              "name": "name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
          },
          {
              "internalType": "address",
              "name": "newCollection",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "_name",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "_ipfsHash",
              "type": "string"
          }
      ],
      "name": "createCollection",
      "outputs": [
          {
              "internalType": "address",
              "name": "collection",
              "type": "address"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "name": "getCollection",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address payable",
              "name": "treasury",
              "type": "address"
          }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "userCollection",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
          }
      ],
      "name": "userCollections",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "string",
                      "name": "name",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "ipfsHash",
                      "type": "string"
                  },
                  {
                      "internalType": "address",
                      "name": "newCollection",
                      "type": "address"
                  }
              ],
              "internalType": "struct Master.CollectionInfo[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "whiskyTreasury",
      "outputs": [
          {
              "internalType": "address payable",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]
