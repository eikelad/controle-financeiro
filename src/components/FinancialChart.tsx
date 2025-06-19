
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Transaction } from '@/types/financial';
import { TrendingUp } from 'lucide-react';

interface FinancialChartProps {
  transactions: Transaction[];
}

const FinancialChart = ({ transactions }: FinancialChartProps) => {
  // Agrupar transações por mês
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    if (!acc[month]) {
      acc[month] = { month, receitas: 0, despesas: 0 };
    }
    
    if (transaction.type === 'receita') {
      acc[month].receitas += transaction.amount;
    } else {
      acc[month].despesas += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, { month: string; receitas: number; despesas: number; }>);

  const chartData = Object.values(monthlyData);

  // Dados para gráfico de pizza (categorias de despesas)
  const expensesByCategory = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Receitas vs Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `R$ ${value}`} />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: '#374151' }}
              />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {pieData.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Despesas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [formatCurrency(value), '']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialChart;
