
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Controle Financeiro
          </h1>
          <p className="text-lg text-gray-600">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Wallet className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(saldo)}</h3>
              <p className="text-sm text-gray-600">Saldo Atual</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalReceitas)}</h3>
              <p className="text-sm text-gray-600">Total Receitas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalDespesas)}</h3>
              <p className="text-sm text-gray-600">Total Despesas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Receipt className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">{transactions.length}</h3>
              <p className="text-sm text-gray-600">Transações</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button 
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => setShowTransactionForm(true)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Nova Transação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialChart transactions={transactions} />
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Últimas Transações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(-5).reverse().map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {transaction.type === 'receita' ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600">{transaction.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FinancialChart transactions={transactions} />
              
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Gastos por Categoria</CardTitle>
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
                        <span className="font-medium">{category}</span>
                        <Badge variant="secondary">{formatCurrency(amount)}</Badge>
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
