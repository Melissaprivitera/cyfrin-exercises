import { createWalletClient, custom } from 'https://esm.sh/viem';

const connectButton = document.getElementById('connectBtn');
const walletStatus = document.getElementById('walletStatus')
let walletClient;

connectButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {

        // Request account access if needed
       
        walletClient = createWalletClient({
            transport: custom (window.ethereum)
        });
        connectButton.textContent = 'Connecting...';
        await walletClient.requestAddresses()
            .then(accounts => {
                console.log('Connected account:', accounts[0]);
                connectButton.textContent = `Connected: ${accounts[0]}`;
                walletStatus.textContent = 'Wallet connected successfully!';
            })
            .catch(error => {
                console.error('Error connecting:', error);
                connectButton.textContent = 'Connect Wallet';
            });
    } else {
        console.error('MetaMask is not installed');
        connectButton.textContent = 'Install MetaMask';
    }
});
