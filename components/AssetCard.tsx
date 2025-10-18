import React from 'react'


export default function AssetCard({ asset, onClaim }: any) {
return (
<div className="p-4 border rounded flex items-center justify-between">
<div>
<div className="text-sm font-medium">{asset.symbol || asset.type}</div>
<div className="text-xs text-slate-500">{asset.amount} {asset.symbol ? asset.symbol : ''}</div>
</div>
<div>
<button onClick={onClaim} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Claim</button>
</div>
</div>
)
}
