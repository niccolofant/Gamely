// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract FeesStorage is Ownable {
    uint256 public balance = address(this).balance;

    /**
     * Fallback function
     */
    receive() external payable {}

    /**
     * @dev Allows the `owner` to withdraw the selected `_amount`
     * @param _recipient Address of the recipient
     * @param _amount Amount of ETHs being withdrawed
     */
    function withdraw(address payable _recipient, uint256 _amount)
        external
        payable
        onlyOwner
    {
        require(_amount <= balance, "Not enough ETHs in the storage");

        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    /**
     * @dev Retrieve the amount of ETHs
     * @return amount of ETHs stored in the contract
     */
    function getBalance() external view onlyOwner returns (uint256) {
        return balance;
    }
}
