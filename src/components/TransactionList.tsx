
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Trash2, Search, Filter } from 'lucide-react';
import { Transaction } from '@/types/financial';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  formatCurrency: (value: number) => string;
}

const TransactionList = ({ transactions, onDelete, formatCurrency }: TransactionListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'receita' | 'despesa'>('all');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesCategory = !filterCategory || transaction.category === filterCategory;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = [...new Set(transactions.map(t => t.category))];

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-blue-600" />
          Transações
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'receita' | 'despesa')}
            >
              <option value="all">Todos os tipos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
            
            <select
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Todas categorias</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhuma transação encontrada
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Badge 
                        variant={transaction.type === 'receita' ? 'default' : 'destructive'}
                        className="flex items-center gap-1 w-fit"
                      >
                        {transaction.type === 'receita' ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{transaction.description}</TableCell>
                    <TableCell>{transaction.category}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className={`text-right font-bold ${transaction.type === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredTransactions.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Mostrando {filteredTransactions.length} de {transactions.length} transações
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
