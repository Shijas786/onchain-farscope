// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ProofOfFate
 * @dev Soulbound NFT for daily onchain horoscopes
 * Features:
 * - Non-transferable (soulbound)
 * - One mint per wallet per day
 * - Metadata stored on IPFS
 */
contract ProofOfFate is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => uint256) public lastMintedDay;
    
    event ProphecyMinted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 day,
        string tokenURI
    );

    constructor() ERC721("Proof of Fate", "FATE") Ownable(msg.sender) {}

    /**
     * @dev Mint a prophecy NFT (only owner can call)
     * @param to Address to mint to
     * @param tokenURI IPFS URI for metadata
     */
    function mintProphecy(address to, string memory tokenURI) external onlyOwner {
        uint256 today = block.timestamp / 1 days;
        require(lastMintedDay[to] < today, "Already minted today");

        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        lastMintedDay[to] = today;
        
        emit ProphecyMinted(to, tokenId, today, tokenURI);
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
     * @dev Soulbound logic - prevent transfers except minting and burning
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Allow minting (from == address(0)) and burning (to == address(0))
        require(
            from == address(0) || to == address(0),
            "Soulbound: non-transferable"
        );
        
        return super._update(to, tokenId, auth);
    }
}

