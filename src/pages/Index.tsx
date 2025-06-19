
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, PlusCircle, Receipt, Target, Wallet, CreditCard } from 'lucide-react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import FinancialChart from '@/components/FinancialChart';
import { Transaction } from '@/types/financial';

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'receita',
      amount: 3500,
      description: 'Salário',
      category: 'Trabalho',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: '2',
      type: 'despesa',
      amount: 800,
      description: 'Aluguel',
      category: 'Moradia',
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: '3',
      type: 'despesa',
      amount: 250,
      description: 'Supermercado',
      category: 'Alimentação',
      date: new Date().toISOString().split('T')[0],
    },
  ]);

  const [showTransactionForm, setShowTransactionForm] = useState(false);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalReceitas = transactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDespesas = transactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  const saldo = totalReceitas - totalDespesas;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
            Controle Financeiro
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 sm:p-6 text-center">
              <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-lg sm:text-2xl font-bold text-white">{formatCurrency(saldo)}</h3>
              <p className="text-xs sm:text-sm text-slate-400">Saldo Atual</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 sm:p-6 text-center">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-lg sm:text-2xl font-bold text-white">{formatCurrency(totalReceitas)}</h3>
              <p className="text-xs sm:text-sm text-slate-400">Receitas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 sm:p-6 text-center">
              <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-red-400 mx-auto mb-2" />
              <h3 className="text-lg sm:text-2xl font-bold text-white">{formatCurrency(totalDespesas)}</h3>
              <p className="text-xs sm:text-sm text-slate-400">Despesas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
            <CardContent className="p-4 sm:p-6 text-center">
              <Receipt className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-lg sm:text-2xl font-bold text-white">{transactions.length}</h3>
              <p className="text-xs sm:text-sm text-slate-400">Transações</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 border-0 text-white shadow-lg"
                onClick={() => setShowTransactionForm(true)}
              >
                <PlusCircle className="h-4 w-4" />
                Nova Transação
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Transações</TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-300">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <FinancialChart transactions={transactions} />
              
              <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg sm:text-xl">Últimas Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(-5).reverse().map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/30">
                        <div className="flex items-center gap-3">
                          {transaction.type === 'receita' ? (
                            <TrendingUp className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white text-sm sm:text-base truncate">{transaction.description}</p>
                            <p className="text-xs sm:text-sm text-slate-400">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-sm sm:text-base ${transaction.type === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-xs text-slate-400">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList 
              transactions={transactions} 
              onDelete={deleteTransaction}
              formatCurrency={formatCurrency}
            />
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <FinancialChart transactions={transactions} />
              
              <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg sm:text-xl">Gastos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(
                      transactions
                        .filter(t => t.type === 'despesa')
                        .reduce((acc, t) => {
                          acc[t.category] = (acc[t.category] || 0) + t.amount;
                          return acc;
                        }, {} as Record<string, number>)
                    ).map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="font-medium text-white">{category}</span>
                        <Badge variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600">{formatCurrency(amount)}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Transaction Form Modal */}
        {showTransactionForm && (
          <TransactionForm 
            onClose={() => setShowTransactionForm(false)}
            onAdd={addTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
