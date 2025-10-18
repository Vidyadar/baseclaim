import Head from 'next/head'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Simple component to display found assets
function AssetCard({ asset, onClaim }: { asset: any; onClaim: () => void }) {
  return (
    <div className="p-4 border rounded-md flex items-center justify-between bg-white shadow-sm">
      <div>
        <p className="font-medium">{asset.name}</p>
        <p className="text-sm text-gray-500">{asset.amount} {asset.symbol}</p>
      </div>
      <button
        onClick={onClaim}
        className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Claim
      </button>
    </div>
  )
}

export default function Home() {
  const { address, isConnected } = useAccount()
  const [assets, setAssets] = useState<any[]>([])
  const [scanning, setScanning] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  // Simulated asset scan
  async function scanForAssets() {
    setScanning(true)
    setAssets([])
    await new Promise((res) => setTimeout(res, 1500))

    // Example mock results
    setAssets([
      { name: 'Ether', symbol: 'ETH', amount: '0.024' },
      { name: 'Base Token', symbol: 'BASE', amount: '125' },
    ])

    setScanning(false)
  }

  async function handleClaim(asset: any) {
    // Here you would integrate smart contract logic (ethers.js)
    console.log(`Claiming asset: ${asset.name}`)
    setTxHash('0xabc123fakehash789') // mock tx
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <Head>
        <title>UnclaimedBase — Starter</title>
      </Head>

      <main className="max-w-3xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">UnclaimedBase</h1>
          <ConnectButton />
        </header>

        <section className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-3">Scan for unclaimed assets</h2>
          <p className="text-sm text-slate-600 mb-4">
            This starter checks ETH balance and example tokens. Extend discovery logic to detect airdrops or unclaimed tokens.
          </p>

          <div className="flex gap-3">
            <button
              onClick={scanForAssets}
              disabled={scanning}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {scanning ? 'Scanning...' : 'Scan'}
            </button>
            <button
              onClick={() => setAssets([])}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Clear
            </button>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="text-md font-medium mb-3">Found assets</h3>
          {assets.length === 0 ? (
            <p className="text-sm text-slate-500">No assets found yet.</p>
          ) : (
            <div className="space-y-3">
              {assets.map((a, idx) => (
                <AssetCard key={idx} asset={a} onClaim={() => handleClaim(a)} />
              ))}
            </div>
          )}
        </section>

        {txHash && (
          <section className="mt-6 p-4 bg-green-50 rounded border border-green-200">
            <div>Transaction submitted: {txHash}</div>
            <a
              className="text-blue-600 underline"
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Basescan
            </a>
          </section>
        )}
      </main>
    </div>
  )
}
