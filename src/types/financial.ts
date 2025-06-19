
export interface Transaction {
  id: string;
  type: 'receita' | 'despesa';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'receita' | 'despesa';
  color: string;
}
