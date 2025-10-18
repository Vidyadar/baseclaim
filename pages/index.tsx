import Head from 'next/head'
}


setScanning(false)
}


async function handleClaim(asset: any) {
if (!walletClient) return
// This is a stub that demonstrates sending a minimal transaction from user's wallet.
// Replace with actual claim contract interaction.
try {
// For demonstration: send 0 ETH transaction (gas only) to self as a signed tx
const tx = await walletClient.sendTransaction({
to: address,
value: 0n,
})
setTxHash(tx.hash)
} catch (err) {
console.error(err)
alert('Transaction failed or rejected')
}
}


return (
<div className="min-h-screen bg-white">
<Head>
<title>UnclaimedBase — Starter</title>
</Head>


<main className="max-w-3xl mx-auto p-6">
<header className="flex items-center justify-between mb-8">
<h1 className="text-2xl font-semibold">UnclaimedBase</h1>
<div>
{isConnected ? (
<div className="text-sm">Connected: {address?.slice(0,6)}...{address?.slice(-4)}</div>
) : (
<div className="text-sm">Not connected</div>
)}
</div>
</header>


<section className="bg-slate-50 p-6 rounded-md shadow-sm">
<h2 className="text-lg font-medium mb-3">Scan for unclaimed assets</h2>
<p className="text-sm text-slate-600 mb-4">This starter checks ETH balance and example tokens. Extend discovery logic to detect airdrops/unclaimed tokens.</p>


<div className="flex gap-3">
<button onClick={scanForAssets} className="px-4 py-2 rounded bg-blue-600 text-white">{scanning ? 'Scanning...' : 'Scan'}</button>
<button onClick={() => setAssets([])} className="px-4 py-2 rounded border">Clear</button>
</div>
</section>


<section className="mt-6">
<h3 className="text-md font-medium mb-3">Found assets</h3>
{assets.length === 0 && <p className="text-sm text-slate-500">No assets found yet.</p>}


<div className="space-y-3">
{assets.map((a, idx) => (
<AssetCard key={idx} asset={a} onClaim={() => handleClaim(a)} />
))}
</div>
</section>


{txHash && (
<section className="mt-6 p-4 bg-green-50 rounded">
<div>Transaction submitted: {txHash}</div>
<a className="text-blue-600" href={`https://basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer">View on Basescan</a>
</section>
)}


</main>


</div>
)
}
