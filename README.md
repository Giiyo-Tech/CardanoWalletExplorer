# Cardano Wallet Explorer

## Introduction
The Cardano Wallet Explorer is a web application designed to provide users with an easy and interactive way to explore their Cardano wallet balances. Built with modern web technologies, the application enables users to check their wallet balances using either a manual wallet address input or by connecting directly to their Yoroi Wallet. This project contributes to the Cardano ecosystem by promoting user engagement and understanding of blockchain wallet functionalities.
![image](https://github.com/user-attachments/assets/fc3a261e-8bb6-4c0c-90fe-96fa186f107c)


## Importance and Aim
The Cardano Wallet Explorer aims to:
1. Simplify the process of checking wallet balances for both new and experienced users.
2. Promote accessibility to the Cardano blockchain network.
3. Encourage user adoption of Yoroi Wallet and enhance awareness of Cardano's ecosystem.
4. Serve as an educational tool for users learning to interact with blockchain wallets and applications.

By making blockchain exploration straightforward, this project contributes to the broader goal of financial inclusion and the adoption of decentralized technologies.

## Problem Statement
The Cardano Wallet Explorer addresses the following challenges:
1. Lack of user-friendly tools to check wallet balances.
2. Inadequate accessibility for new users.
3. Limited adoption of Yoroi Wallet.
4. Lack of awareness of Cardano's ecosystem.

## Solution
The Cardano Wallet Explorer addresses these challenges by:
1. Providing a user-friendly interface for wallet balance checking.
2. Enabling users to connect directly to their Yoroi Wallet.
3. Promoting awareness of Cardano's ecosystem through user engagement.  

## Objectives
The primary objectives of the Cardano Wallet Explorer are:
1. Simplify the process of checking wallet balances for both new and experienced users.
2. Promote accessibility to the Cardano blockchain network.
3. Encourage user adoption of Yoroi Wallet and enhance awareness of Cardano's ecosystem.
4. Serve as an educational tool for users learning to interact with blockchain wallets and applications.


## Features

### 1. Wallet Balance Fetching
- Users can input a Cardano wallet address manually to retrieve and display the corresponding balance.

### 2. Yoroi Wallet Integration
- Users with Yoroi Wallet installed can connect their wallets directly and fetch wallet balances without the need for manual address entry.

### 3. User-Friendly Interface
- A clean and responsive design ensures ease of use on both desktop and mobile devices.

### 4. Real-Time Data
- Wallet balances are fetched in real-time using the Blockfrost API, ensuring accurate and up-to-date information.

## Technologies Used

### Frontend
- **HTML5 and CSS3:** For structure and styling.
- **JavaScript:** For dynamic interactions and API integration.
- **Font Awesome:** For modern and intuitive icons.
- **Google Fonts:** For enhanced typography.

### Backend/API
- **Blockfrost API:** Used to fetch wallet balances from the Cardano blockchain.
- **Yoroi Wallet Extension:** Enables direct wallet connection and balance retrieval.

## How It Works

### Wallet Address Input
1. The user enters their Cardano wallet address into the input field.
2. On submission, the application calls the Blockfrost API to retrieve the wallet balance.
3. The balance is displayed in ADA, formatted for readability.

### Yoroi Wallet Connection
1. The user clicks the "Connect Yoroi Wallet" button.
2. If the Yoroi Wallet browser extension is installed, the application fetches the wallet address and balance automatically.
3. The balance is displayed instantly without requiring manual input.

## Benefits to the Cardano Ecosystem
1. **User Engagement:** Encourages users to interact with the blockchain ecosystem.
2. **Education:** Serves as a practical tool for understanding how Cardano wallets and balances work.
3. **Accessibility:** Simplifies wallet exploration, lowering the barrier to entry for new users.
4. **Adoption:** Promotes Yoroi Wallet as a gateway to the Cardano ecosystem.
5. **Transparency:** Provides real-time, accurate data, helping users trust and verify their balances.

## Future Improvements
1. **Transaction History:** Add support for displaying transaction details.
2. **Staking Information:** Include staking rewards and delegated stake data.
3. **Localization:** Support multiple languages to cater to a global audience.
4. **Mobile App:** Extend the project into a mobile application for broader accessibility.
5. **Security Enhancements:** Secure API keys and implement server-side data fetching.

## Conclusion
The Cardano Wallet Explorer is a simple yet powerful tool that empowers users to explore their wallets and engage with the Cardano blockchain network. By providing a user-friendly platform, it not only enhances user experience but also supports the growth and adoption of Cardano’s ecosystem. This project demonstrates the potential of decentralized technologies to improve financial access and understanding for users worldwide.

# Cardano Wallet Explorer Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Security Guidelines](#security-guidelines)
3. [API Integration](#api-integration)
4. [Development Guide](#development-guide)
5. [Troubleshooting](#troubleshooting)

## Architecture Overview

### Frontend Components
- **HTML**: Single-page application structure
- **CSS**: Modern, responsive design with CSS variables
- **JavaScript**: Vanilla JS for wallet interactions and API calls

### Key Features
- Wallet address validation
- Balance checking through Blockfrost API
- Yoroi wallet integration
- Real-time balance updates
- Responsive design for all devices

## Security Guidelines

### API Key Management
❌ **Current Implementation (Unsafe)"
```javascript
const API_KEY = 'mainnet8npKlGfk52Wz0Q4tKYNQdi4z8JUchu06';
```

✅ **Recommended Implementation"
1. Create a backend service to handle API requests
2. Store API keys in environment variables
3. Use server-side proxy for Blockfrost API calls

### Security Best Practices
1. **API Key Protection"
   - Never expose API keys in frontend code
   - Use environment variables for sensitive data
   - Implement API key rotation

2. **Wallet Security"
   - Never store private keys
   - Use secure connection (HTTPS)
   - Implement rate limiting
   - Validate all user inputs

3. **Data Protection"
   - Implement CORS policies
   - Use Content Security Policy (CSP)
   - Regular security audits

## API Integration

### Blockfrost API
```javascript
// Example of secure API integration
async function getWalletBalance(address) {
    try {
        const response = await fetch('/api/wallet/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ address })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

### Yoroi Wallet Integration
```javascript
// Example of Yoroi wallet connection
async function connectYoroiWallet() {
    if (!window.cardano?.yoroi) {
        throw new Error('Yoroi wallet not installed');
    }
    try {
        const wallet = await window.cardano.yoroi.enable();
        return wallet;
    } catch (error) {
        console.error('Connection failed:', error);
        throw error;
    }
}
```

## Development Guide

### Setup Development Environment
1. Clone the repository
```bash
git clone https://github.com/Giiyo-Tech/CardanoWalletExplorer.git
cd CardanoWalletExplorer
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your API keys
```

### Project Structure
```
CardanoWalletExplorer/
├── index.html          # Main HTML file
├── style.css          # Styles and theming
├── script.js          # Core functionality
├── images/            # Project images
└── docs/             # Documentation
```

### Development Workflow
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit pull request
5. Code review
6. Merge to main

## Troubleshooting

### Common Issues

1. **Wallet Connection Failed"
   - Check if Yoroi extension is installed
   - Verify browser compatibility
   - Check console for specific errors

2. **API Errors"
   - Verify API key validity
   - Check network connection
   - Validate request format

3. **Balance Not Updating"
   - Verify wallet address format
   - Check Blockfrost API status
   - Review browser console logs

### Error Codes
- `ERR_WALLET_NOT_FOUND`: Invalid wallet address
- `ERR_API_KEY`: Invalid or expired API key
- `ERR_NETWORK`: Network connection issue
- `ERR_WALLET_CONNECTION`: Wallet connection failed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
   
## Support
For support, please:

- Create an issue in our [Issue Tracker](https://github.com/giiyuo/cardano-wallet-explorer/issues)
- Follow us on Twitter
- Add more functionalities


## Acknowledgments

- Giiyo Tech
- The Cardano Community
- All our contributors
- Yoroi

Last Updated: 2025-01-07

© 2025 Giiyo Tech. All Rights Reserved.

## Support

For support:
1. Check documentation
2. Create GitHub issue
3. Contact development team

Last Updated: 2025-01-07
 2025 Giiyuo Tech
