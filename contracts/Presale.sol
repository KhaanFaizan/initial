// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is ReentrancyGuard, Ownable {
    IERC20 public token;
    uint256 public priceWeiPerToken; // price in wei per token (1e18 means price 1 ETH per token)
    bool public open;

    event Bought(address indexed buyer, uint256 amountTokens, uint256 valueWei);

    constructor(IERC20 _token, uint256 _priceWeiPerToken) {
        token = _token;
        priceWeiPerToken = _priceWeiPerToken;
        open = true;
    }

    function buy() external payable nonReentrant {
        require(open, "Presale closed");
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 tokensToSend = (msg.value * (10 ** 18)) / priceWeiPerToken;
        require(token.balanceOf(address(this)) >= tokensToSend, "Not enough tokens in presale contract");

        token.transfer(msg.sender, tokensToSend);
        emit Bought(msg.sender, tokensToSend, msg.value);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function setOpen(bool _open) external onlyOwner {
        open = _open;
    }

    function setPrice(uint256 _priceWeiPerToken) external onlyOwner {
        priceWeiPerToken = _priceWeiPerToken;
    }

    function depositTokens(uint256 amount) external onlyOwner {
        require(token.transferFrom(msg.sender, address(this), amount), "transfer failed");
    }
}
