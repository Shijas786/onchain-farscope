// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title ProofOfFate
 * @dev Soulbound NFT for daily onchain horoscopes
 * Features:
 * - Non-transferable (soulbound)
 * - One mint per wallet per day
 * - Users mint directly (no owner control)
 */
contract ProofOfFate is ERC721URIStorage {
    uint256 public nextTokenId;
    mapping(address => uint256) public lastMintedDay;

    constructor() ERC721("Proof of Fate", "FATE") {}

    /**
     * @dev Mint a prophecy NFT (anyone can mint for themselves)
     * @param tokenURI IPFS URI or data URI for metadata
     */
    function mintProphecy(string memory tokenURI) external {
        uint256 today = block.timestamp / 1 days;
        require(lastMintedDay[msg.sender] < today, "Already minted today");

        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        lastMintedDay[msg.sender] = today;
    }

    /**
     * @dev Get all token IDs owned by an address
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        
        for (uint256 i = 0; i < nextTokenId && index < balance; i++) {
            try this.ownerOf(i) returns (address tokenOwner) {
                if (tokenOwner == owner) {
                    tokens[index] = i;
                    index++;
                }
            } catch {
                continue;
            }
        }
        
        return tokens;
    }

    /**
     * @dev Check if an address can mint today
     */
    function canMintToday(address user) external view returns (bool) {
        uint256 today = block.timestamp / 1 days;
        return lastMintedDay[user] < today;
    }

    /**
     * @dev Soulbound logic - disable transfers
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(
            from == address(0) || to == address(0),
            "Soulbound: non-transferable"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}

