
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Trash2, Search } from 'lucide-react';
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
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white text-lg sm:text-xl">
          <Search className="h-5 w-5 text-blue-400" />
          Transações
        </CardTitle>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              className="flex h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'receita' | 'despesa')}
            >
              <option value="all">Todos os tipos</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
            
            <select
              className="flex h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none"
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
        <div className="rounded-md border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/30">
                  <TableHead className="text-slate-200">Tipo</TableHead>
                  <TableHead className="text-slate-200">Descrição</TableHead>
                  <TableHead className="text-slate-200 hidden sm:table-cell">Categoria</TableHead>
                  <TableHead className="text-slate-200 hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-right text-slate-200">Valor</TableHead>
                  <TableHead className="text-right text-slate-200">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                      Nenhuma transação encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-slate-700 hover:bg-slate-700/30">
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'receita' ? 'default' : 'destructive'}
                          className={`flex items-center gap-1 w-fit ${
                            transaction.type === 'receita' 
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                              : 'bg-red-600 hover:bg-red-700 text-white'
                          }`}
                        >
                          {transaction.type === 'receita' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="hidden sm:inline">
                            {transaction.type === 'receita' ? 'Receita' : 'Despesa'}
                          </span>
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        <div>
                          <div className="truncate max-w-32 sm:max-w-none">{transaction.description}</div>
                          <div className="text-xs text-slate-400 sm:hidden">{transaction.category}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300 hidden sm:table-cell">{transaction.category}</TableCell>
                      <TableCell className="text-slate-300 hidden md:table-cell">{new Date(transaction.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className={`text-right font-bold ${transaction.type === 'receita' ? 'text-emerald-400' : 'text-red-400'}`}>
                        <div>
                          {transaction.type === 'receita' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          <div className="text-xs text-slate-400 md:hidden">{new Date(transaction.date).toLocaleDateString('pt-BR')}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(transaction.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
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
        </div>
        
        {filteredTransactions.length > 0 && (
          <div className="mt-4 text-sm text-slate-400 text-center">
            Mostrando {filteredTransactions.length} de {transactions.length} transações
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
