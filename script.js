// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get reference to the connect wallet button
    const connectButton = document.getElementById('connect-wallet');
    const walletAddressElement = document.getElementById('wallet-address');
    const walletBalanceElement = document.getElementById('wallet-balance');

    // Function to format wallet address for display
    const formatAddress = (address) => {
        if (!address) return 'Not Connected';
        // Show first 8 and last 8 characters with ... in between
        return `${address.slice(0, 8)}...${address.slice(-8)}`;
    };

    // Function to format ADA balance
    const formatBalance = (lovelaceBalance) => {
        try {
            // Convert lovelace to ADA (1 ADA = 1,000,000 lovelace)
            const adaBalance = Number(lovelaceBalance) / 1_000_000;
            // Format with commas and 6 decimal places
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
            }).format(adaBalance);
        } catch (error) {
            console.error('Error formatting balance:', error);
            return '0.00';
        }
    };

    // Handle wallet connection
    connectButton.addEventListener('click', async () => {
        try {
            // Step 1: Check if Yoroi wallet is installed
            if (!window.cardano || !window.cardano.yoroi) {
                throw new Error("Please install the Yoroi wallet extension!");
            }

            // Update button state
            connectButton.disabled = true;
            connectButton.textContent = 'Connecting...';

            // Step 2: Request wallet connection
            console.log("Requesting Yoroi wallet connection...");
            const api = await window.cardano.yoroi.enable();
            console.log("Yoroi wallet connected successfully!");

            // Step 3: Get wallet address
            const addresses = await api.getUsedAddresses();
            if (!addresses || addresses.length === 0) {
                throw new Error("No used addresses found in the wallet");
            }
            const walletAddress = addresses[0];
            walletAddressElement.textContent = formatAddress(walletAddress);
            
            // Add full address as title for hover tooltip
            walletAddressElement.title = walletAddress;

            // Step 4: Get wallet balance
            const balance = await api.getBalance();
            walletBalanceElement.textContent = `${formatBalance(balance)} ADA`;

            // Update button to show connected state
            connectButton.textContent = 'Connected';
            connectButton.style.backgroundColor = '#4caf50';

        } catch (error) {
            console.error("Wallet connection error:", error);
            walletAddressElement.textContent = 'Connection Failed';
            walletBalanceElement.textContent = '0.00 ADA';
            
            // Show user-friendly error message
            alert(error.message || "Failed to connect to wallet. Please try again.");
            
            // Reset button state
            connectButton.disabled = false;
            connectButton.textContent = 'Connect Wallet';
        }
    });
});