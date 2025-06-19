
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '@/types/financial';

interface TransactionFormProps {
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm = ({ onClose, onAdd }: TransactionFormProps) => {
  const [type, setType] = useState<'receita' | 'despesa'>('receita');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categoriesReceita = [
    'Salário', 'Freelance', 'Investimentos', 'Vendas', 'Outros'
  ];

  const categoriesDespesa = [
    'Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 
    'Entretenimento', 'Roupas', 'Tecnologia', 'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !description || !category) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    onAdd({
      type,
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Nova Transação
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs value={type} onValueChange={(value) => setType(value as 'receita' | 'despesa')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="receita" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Receita
                </TabsTrigger>
                <TabsTrigger value="despesa" className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Despesa
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                placeholder="Ex: Salário, Aluguel, Supermercado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <select
                id="category"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Selecione uma categoria</option>
                {(type === 'receita' ? categoriesReceita : categoriesDespesa).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className={`flex-1 ${type === 'receita' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Adicionar {type === 'receita' ? 'Receita' : 'Despesa'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
