import { CheckCircle2 } from 'lucide-react';

const TransactionsList = () => {
  const transactions = [
    { id: 1, name: 'Public Transport', date: '22 September 2020', amount: '-$15.50', type: 'expense', icon: 'bg-red-50 text-red-500' },
    { id: 2, name: 'Grocery Store', date: '18 September 2020', amount: '-$42.80', type: 'expense', icon: 'bg-orange-50 text-orange-500' },
    { id: 3, name: 'Salary Deposit', date: '15 September 2020', amount: '+$3,400.00', type: 'income', icon: 'bg-emerald-50 text-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-extrabold text-slate-900">Your transactions</h3>
        <button className="text-indigo-600 text-sm font-bold hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors">
          View all
        </button>
      </div>
      
      <div className="space-y-2 flex-1">
        {transactions.map(tx => (
          <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${tx.icon}`}>
                <CheckCircle2 size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{tx.name}</h4>
                <p className="text-xs text-slate-500 font-medium mt-1">{tx.date}</p>
              </div>
            </div>
            <span className={`font-extrabold text-lg ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900'}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;