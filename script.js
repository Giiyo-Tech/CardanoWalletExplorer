// Check if Yoroi is installed
function checkYoroiInstalled() {
    return window.cardano && window.cardano.yoroi;
}

// Format ADA balance
function formatBalance(lovelaceBalance) {
    if (!lovelaceBalance || isNaN(lovelaceBalance)) {
        return "0.000000";
    }
    const adaBalance = parseFloat(lovelaceBalance) / 1_000_000;
    return adaBalance.toFixed(6);
}

// Check wallet balance using Blockfrost API
async function checkWalletBalance(address) {
    try {
        // You'll need to sign up for a free API key at https://blockfrost.io/
        const API_KEY = 'mainnet8npKlGfk52Wz0Q4tKYNQdi4z8JUchu06';
        const response = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`, {
            headers: {
                'project_id': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Invalid address or API error');
        }

        const data = await response.json();
        return data.amount[0].quantity; // Returns balance in lovelace
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}

// Update UI with wallet info
function updateWalletInfo(address, balance) {
    document.getElementById('wallet-address').innerHTML = 
        `<i class="fas fa-address-card"></i> Wallet Address: ${address}`;
    document.getElementById('wallet-balance').innerHTML = 
        `<i class="fas fa-coins"></i> Balance: ${formatBalance(balance)} ADA`;
}

// Handle wallet search
async function handleWalletSearch() {
    const address = document.getElementById('wallet-search').value.trim();
    if (!address) {
        alert('Please enter a wallet address');
        return;
    }

    try {
        const balance = await checkWalletBalance(address);
        updateWalletInfo(address, balance);
    } catch (error) {
        alert('Error: Invalid address or unable to fetch balance');
    }
}

// Connect to Yoroi wallet
async function connectWallet() {
    try {
        if (!checkYoroiInstalled()) {
            alert("Please install the Yoroi wallet extension!");
            return;
        }

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
    }
}

// Add event listeners
document.getElementById('connect-wallet').addEventListener('click', connectWallet);
document.getElementById('search-button').addEventListener('click', handleWalletSearch);

// Add enter key support for search
document.getElementById('wallet-search').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleWalletSearch();
    }
});