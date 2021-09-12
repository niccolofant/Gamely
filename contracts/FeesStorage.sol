// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract FeesStorage is Ownable {
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
        require(
            _amount <= address(this).balance,
            "Not enough ETHs in the storage"
        );

        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "Transfer failed.");
    }
}
