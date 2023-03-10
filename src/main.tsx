import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'
import { Coin98WalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { ReactNode, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import CreateProposal from './pages/CreateProposal'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import ProfileV2 from './pages/ProfileV2'
import Reward from './pages/Reward'

export const WalletConnectable = ({ children }: { children: ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // const network = 'https://solana-devnet.g.alchemy.com/v2/OEh2s7PqedaI668F-700S1YmTBhQWprZ'
  // const endpoint = useMemo(() => 'https://solana-devnet.g.alchemy.com/v2/OEh2s7PqedaI668F-700S1YmTBhQWprZ', [network])

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new Coin98WalletAdapter()], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/:username',
    element: <ProfileV2 />,
  },
  {
    path: '/create-proposal',
    element: <CreateProposal />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/reward',
    element: <Reward />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WalletConnectable>
    <RouterProvider router={router} />
  </WalletConnectable>,
)
