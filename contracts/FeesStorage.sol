// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract FeesStorage is Ownable {
    /**
     * @dev Fallback function
     */
    receive() external payable {}

    /**
     * @dev Allows the `owner` to withdraw the selected `_amount`
     * @param _recipient Address of the recipient
     * @param _amount Amount of ETHs being withdrawed
     */
    function withdrawMoney(address payable _recipient, uint256 _amount)
        external
        payable
        onlyOwner
    {
        require(
            _amount <= address(this).balance,
            "Not enough ETHs in the storage"
        );

        (bool success, ) = payable(_recipient).call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    /**
     * @dev Retrieve the balance of the contract
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
