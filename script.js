// Check if Yoroi is installed
function checkYoroiInstalled() {
    return window.cardano && window.cardano.yoroi;
}

// Connect to wallet and get data
async function connectWallet() {
    try {
        // Check if Yoroi is installed
        if (!checkYoroiInstalled()) {
            alert("Please install the Yoroi wallet extension!");
            return;
        }

        // Enable the wallet
        const api = await window.cardano.yoroi.enable();
        console.log("Wallet connected!");

        try {
            // Get wallet address
            const addresses = await api.getUsedAddresses();
            if (addresses && addresses.length > 0) {
                const walletAddress = addresses[0];
                document.getElementById('wallet-address').textContent = 
                    `Wallet Address: ${walletAddress}`;
            }

            // Get wallet balance
            const balance = await api.getBalance();
            const adaBalance = balance / 1_000_000; // Convert lovelace to ADA
            document.getElementById('wallet-balance').textContent = 
                `Balance: ${adaBalance.toFixed(6)} ADA`;
        } catch (error) {
            console.error("Error fetching wallet data:", error);
            alert("Error fetching wallet data. Please try again.");
        }
    } catch (error) {
        console.error("Error connecting to wallet:", error);
        alert("Error connecting to wallet. Please make sure Yoroi is installed and try again.");
    }
}

// Add click event listener to the connect button
document.getElementById('connect-wallet').addEventListener('click', connectWallet);