// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

/**
 * @title OnchainHoroscope
 * @dev NFT contract for minting onchain horoscopes with on-chain metadata
 */
contract OnchainHoroscope is ERC721, ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _tokenIdCounter;
    uint256 public mintPrice = 0 ether; // FREE MINT!
    
    struct Horoscope {
        string zodiacSign;
        string horoscopeText;
        uint256 degenScore;
        uint256 lifetimeTxCount;
        string mostActiveChain;
        uint256 timestamp;
        address walletAddress;
    }
    
    mapping(uint256 => Horoscope) public horoscopes;
    mapping(address => uint256[]) public walletToTokenIds;
    
    event HoroscopeMinted(
        uint256 indexed tokenId,
        address indexed minter,
        string zodiacSign,
        uint256 degenScore
    );

    constructor() ERC721("Onchain Horoscope", "SCOPE") Ownable(msg.sender) {}

    /**
     * @dev Mint a new horoscope NFT with on-chain metadata
     */
    function mintHoroscope(
        string memory zodiacSign,
        string memory horoscopeText,
        uint256 degenScore,
        uint256 lifetimeTxCount,
        string memory mostActiveChain
    ) public payable returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient payment");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Store horoscope data
        horoscopes[tokenId] = Horoscope({
            zodiacSign: zodiacSign,
            horoscopeText: horoscopeText,
            degenScore: degenScore,
            lifetimeTxCount: lifetimeTxCount,
            mostActiveChain: mostActiveChain,
            timestamp: block.timestamp,
            walletAddress: msg.sender
        });
        
        // Mint NFT
        _safeMint(msg.sender, tokenId);
        
        // Track user's NFTs
        walletToTokenIds[msg.sender].push(tokenId);
        
        emit HoroscopeMinted(tokenId, msg.sender, zodiacSign, degenScore);
        
        return tokenId;
    }

    /**
     * @dev Generate on-chain SVG image for the horoscope
     */
    function generateSVG(uint256 tokenId) internal view returns (string memory) {
        Horoscope memory h = horoscopes[tokenId];
        
        // Create SVG with cosmic theme
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" style="background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)">',
            '<defs>',
            '<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">',
            '<stop offset="0%" style="stop-color:#667eea;stop-opacity:1"/>',
            '<stop offset="50%" style="stop-color:#764ba2;stop-opacity:1"/>',
            '<stop offset="100%" style="stop-color:#f093fb;stop-opacity:1"/>',
            '</linearGradient>',
            '</defs>',
            '<rect width="500" height="700" fill="url(#grad)" opacity="0.1"/>',
            '<text x="250" y="80" font-size="48" fill="url(#grad)" text-anchor="middle" font-family="Arial">&#10024;</text>',
            '<text x="250" y="130" font-size="24" fill="#fff" text-anchor="middle" font-family="Arial" font-weight="bold">Onchain Horoscope</text>',
            '<text x="250" y="170" font-size="20" fill="#a78bfa" text-anchor="middle" font-family="Arial">', h.zodiacSign, '</text>',
            '<text x="250" y="200" font-size="16" fill="#c084fc" text-anchor="middle" font-family="Arial">Score: ', h.degenScore.toString(), '/100</text>',
            '<foreignObject x="30" y="230" width="440" height="350">',
            '<div xmlns="http://www.w3.org/1999/xhtml" style="color:#e0e7ff;font-family:Arial;font-size:14px;padding:20px;background:rgba(0,0,0,0.3);border-radius:10px;line-height:1.6">',
            truncateText(h.horoscopeText, 280),
            '</div>',
            '</foreignObject>',
            '<text x="250" y="630" font-size="14" fill="#9ca3af" text-anchor="middle" font-family="Arial">Lifetime Txs: ', h.lifetimeTxCount.toString(), '</text>',
            '<text x="250" y="655" font-size="14" fill="#9ca3af" text-anchor="middle" font-family="Arial">Most Active: ', h.mostActiveChain, '</text>',
            '<text x="250" y="680" font-size="12" fill="#6b7280" text-anchor="middle" font-family="Arial">', addressToString(h.walletAddress), '</text>',
            '</svg>'
        ));
    }

    /**
     * @dev Generate on-chain metadata JSON
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        
        Horoscope memory h = horoscopes[tokenId];
        string memory svg = generateSVG(tokenId);
        string memory svgBase64 = Base64.encode(bytes(svg));
        
        string memory json = string(abi.encodePacked(
            '{',
            '"name": "Onchain Horoscope #', tokenId.toString(), '",',
            '"description": "A personalized onchain horoscope NFT based on wallet activity across Ethereum and Base. ', h.zodiacSign, ' with ', h.degenScore.toString(), '/100 degen score.",',
            '"image": "data:image/svg+xml;base64,', svgBase64, '",',
            '"attributes": [',
            '{"trait_type": "Zodiac Sign", "value": "', h.zodiacSign, '"},',
            '{"trait_type": "Degen Score", "value": ', h.degenScore.toString(), '},',
            '{"trait_type": "Lifetime Transactions", "value": ', h.lifetimeTxCount.toString(), '},',
            '{"trait_type": "Most Active Chain", "value": "', h.mostActiveChain, '"},',
            '{"trait_type": "Minted On", "value": ', h.timestamp.toString(), '}',
            ']',
            '}'
        ));
        
        return string(abi.encodePacked(
            'data:application/json;base64,',
            Base64.encode(bytes(json))
        ));
    }

    /**
     * @dev Get all token IDs owned by a wallet
     */
    function getWalletNFTs(address wallet) public view returns (uint256[] memory) {
        return walletToTokenIds[wallet];
    }

    /**
     * @dev Get horoscope data for a token
     */
    function getHoroscope(uint256 tokenId) public view returns (Horoscope memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");
        return horoscopes[tokenId];
    }

    /**
     * @dev Update mint price (owner only)
     */
    function setMintPrice(uint256 newPrice) public onlyOwner {
        mintPrice = newPrice;
    }

    /**
     * @dev Withdraw collected fees (owner only)
     */
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Helper to truncate long text
     */
    function truncateText(string memory text, uint256 maxLength) internal pure returns (string memory) {
        bytes memory textBytes = bytes(text);
        if (textBytes.length <= maxLength) {
            return text;
        }
        
        bytes memory truncated = new bytes(maxLength);
        for (uint256 i = 0; i < maxLength - 3; i++) {
            truncated[i] = textBytes[i];
        }
        return string(abi.encodePacked(truncated, "..."));
    }

    /**
     * @dev Helper to convert address to string
     */
    function addressToString(address addr) internal pure returns (string memory) {
        bytes memory data = abi.encodePacked(addr);
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(10);
        
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < 4; i++) {
            str[2+i] = alphabet[uint8(data[i] >> 4)];
        }
        str[6] = ".";
        str[7] = ".";
        str[8] = ".";
        str[9] = alphabet[uint8(data[19] & 0x0f)];
        
        return string(str);
    }

    // Required overrides
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

