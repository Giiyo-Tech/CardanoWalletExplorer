import config from './config.js';

// This function checks if the Yoroi wallet extension is installed
function checkYoroiInstalled() {
    return window.cardano && window.cardano.yoroi;
}

// Format ADA balance with proper decimal places
function formatBalance(lovelaceBalance) {
    if (!lovelaceBalance || isNaN(lovelaceBalance)) {
        return "0.000000";
    }
    const adaBalance = parseFloat(lovelaceBalance) / 1_000_000;
    return adaBalance.toFixed(6);
}

// Fetch wallet balance using Blockfrost API
async function checkWalletBalance(address) {
    try {
        const response = await fetch(`${config.BLOCKFROST_URL}/addresses/${address}`, {
            headers: {
                'project_id': config.BLOCKFROST_API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Invalid address or API error');
        }

        const data = await response.json();
        return data.amount[0].quantity;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}

// Update the UI with wallet information
function updateWalletInfo(address, balance) {
    // Format the address for display (show first and last few characters)
    const shortAddress = address.length > 20 
        ? `${address.slice(0, 8)}...${address.slice(-8)}`
        : address;

    // Update address card
    const addressCard = document.querySelector('#wallet-address .card-content');
    addressCard.textContent = shortAddress;
    
    // Update balance card
    const balanceCard = document.querySelector('#wallet-balance .card-content');
    balanceCard.textContent = `${formatBalance(balance)} ADA`;

    // Add tooltip for full address
    addressCard.title = address;
}

// Handle manual wallet address search
async function handleWalletSearch() {
    const searchInput = document.getElementById('wallet-search');
    const address = searchInput.value.trim();
    
    if (!address) {
        alert('Please enter a wallet address');
        return;
    }

    try {
        // Show loading state
        document.getElementById('search-button').innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i><span>Checking...</span>';
        
        const balance = await checkWalletBalance(address);
        updateWalletInfo(address, balance);
        
        // Clear input after successful search
        searchInput.value = '';
    } catch (error) {
        alert('Error: Invalid address or unable to fetch balance');
    } finally {
        // Restore button text
        document.getElementById('search-button').innerHTML = 
            '<i class="fas fa-search"></i><span>Check Balance</span>';
    }
}

// Connect to Yoroi wallet
async function connectWallet() {
    try {
        if (!checkYoroiInstalled()) {
            alert("Please install the Yoroi wallet extension!");
            return;
        }

        // Show loading state
        document.getElementById('connect-wallet').innerHTML = 
            '<i class="fas fa-spinner fa-spin"></i><span>Connecting...</span>';

        const api = await window.cardano.yoroi.enable();
        console.log("Wallet connected!");

        try {
            const addresses = await api.getUsedAddresses();
            if (addresses && addresses.length > 0) {
                const walletAddress = addresses[0];
                const balance = await api.getBalance();
                updateWalletInfo(walletAddress, balance);
            }
        } catch (error) {
            console.error("Error fetching wallet data:", error);
            alert("Error fetching wallet data. Please try again.");
        }
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Error connecting to wallet. Please make sure Yoroi is installed and try again.");
    } finally {
        // Restore button text
        document.getElementById('connect-wallet').innerHTML = 
            '<i class="fas fa-plug"></i><span>Connect Yoroi Wallet</span>';
    }
}

// Add event listeners
document.getElementById('connect-wallet').addEventListener('click', connectWallet);
document.getElementById('search-button').addEventListener('click', handleWalletSearch);
document.getElementById('wallet-search').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleWalletSearch();
    }
});