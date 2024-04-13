# Backend REST-API for Wallet Details with Alchemy API

This repository contains a backend REST-API designed to provide details about a particular wallet address using the Alchemy API. The application is multi-chain, supporting the following networks:

- Polygon Mumbai / Amoy
- Ethereum Sepolia
- Avalanche Fuji
- Arbitrum Sepolia

## Endpoints

### User Management

1. **Create User**
   - **Endpoint:** `POST /api/user/create-account`
   - **Description:** Creates a new user account with details such as username, email, password, and wallet address.
   - **Request Body:** 
     ```json
     {
       "username": "example_user",
       "email": "user@example.com",
       "password": "password123",
       "walletAddress": "0x123456789abcdef123456789abcdef123456789a"
     }
     ```
   - **Response:** Returns the created user object.

2. **Verify User Wallet With Only Address**
   - **Endpoint:** `POST /api/user/activate`
   - **Description:** Verifies the user's wallet through signature verification.
   - **Request Body:** 
     ```json
     {
       "walletAddress": "wallet_address"
     }
     ```
   - **Response:** Returns a success message upon successful verification.

3. **Verify User Wallet With Signature**
   - **Endpoint:** `POST /api/user/activate-signature`
   - **Description:** Verifies the user's wallet through signature verification.
   - **Request Body:** 
     ```json
     {
       "signature": "signature_value",
       "signMessage": "message_to_sign"
     }
     ```
   - **Response:** Returns a success message upon successful verification.   

3. **User Authentication**
   - **Endpoint:** `/api/auth`
   - **Description:** Supports email, MetaMask login, and Google OAuth login.

### Transactions

1. **Transfer Transactions**
   - **Endpoint:** `GET /api/transactions`
   - **Description:** Retrieves paginated transfer-based transactions to and from a particular address, ordered from most recent to older periods.
   - **Query Parameters:**
     - `address`: Wallet address
     - `page`: Page number (optional)
     - `limit`: Number of transactions per page (optional)
   - **Response:** Returns paginated transactions with timestamps included.

### Token Operations

1. **Token Balances**
   - **Endpoint:** `GET /api/tokens/balances`
   - **Description:** Retrieves a list of token balances for a particular wallet address.
   - **Query Parameters:**
     - `address`: Wallet address
   - **Response:** Returns a list of token balances.

2. **Token Metadata**
   - **Endpoint:** `GET /api/tokens/:tokenAddress/metadata`
   - **Description:** Retrieves metadata for a particular token.
   - **Path Parameter:**
     - `tokenAddress`: Address of the token
   - **Response:** Returns metadata for the token.

### NFT Operations

1. **List NFTs**
   - **Endpoint:** `GET /api/nfts`
   - **Description:** Retrieves a list of NFTs (both ERC721 and ERC1155) held by a particular address.
   - **Query Parameters:**
     - `address`: Wallet address
   - **Response:** Returns a list of NFTs with metadata and amounts.

### Security and Performance

1. **Authentication**
   - **Description:** Endpoints are secured with JWT authentication.

2. **Throttling and Rate Limiting**
   - **Description:** Endpoints are throttled and rate-limited to prevent DDoS attacks.

3. **Caching**
   - **Description:** Data is cached for users with a smart key-eviction policy to improve performance.

4. **Real-time Data Changes**
   - **Description:** Real-time change data for wallets for transactions

## Setup Instructions

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables such as API keys and database credentials.
4. Start the server using `npm start`.
5. Swagger URLs available at http://localhost:3000/api-docs/

## Contributors

- [Your Name](https://github.com/varghesesanya) - Description of contributions.
