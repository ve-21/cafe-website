export default function DashboardOverview() {
    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-serif mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Today's Revenue", val: "$1,240.50", change: "+12%" },
                    { label: "Active Orders", val: "8", change: "Live" },
                    { label: "Table Reservations", val: "14", change: "Next 3 hrs" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                        <div className="flex justify-between items-end">
                            <h3 className="text-3xl font-serif">{stat.val}</h3>
                            <span className="text-copper text-xs font-bold bg-copper/10 px-2 py-1 rounded">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
