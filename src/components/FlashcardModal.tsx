
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, X } from 'lucide-react';

interface FlashcardModalProps {
  onClose: () => void;
}

const FlashcardModal = ({ onClose }: FlashcardModalProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const flashcards = [
    {
      materia: "Direito Constitucional",
      pergunta: "Qual é o princípio fundamental que garante que todos são iguais perante a lei?",
      resposta: "Princípio da Isonomia ou Igualdade, previsto no art. 5º, caput, da Constituição Federal."
    },
    {
      materia: "Português",
      pergunta: "O que é uma oração subordinada substantiva objetiva direta?",
      resposta: "É aquela que exerce a função de objeto direto do verbo da oração principal. Ex: 'Espero que você venha.'"
    },
    {
      materia: "Matemática",
      pergunta: "Como calcular a probabilidade de um evento?",
      resposta: "P(A) = Número de casos favoráveis / Número total de casos possíveis"
    },
    {
      materia: "Direito Administrativo",
      pergunta: "Quais são os princípios básicos da Administração Pública?",
      resposta: "LIMPE: Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência (art. 37, CF)."
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Flashcards</CardTitle>
            <p className="text-sm text-gray-600">
              Card {currentCard + 1} de {flashcards.length}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {flashcards[currentCard].materia}
            </Badge>
            
            <div className="min-h-[200px] flex items-center justify-center">
              <Card className="w-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <div className="text-center">
                  {!showAnswer ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Pergunta:</h3>
                      <p className="text-lg text-gray-700">
                        {flashcards[currentCard].pergunta}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-green-700 mb-4">Resposta:</h3>
                      <p className="text-lg text-gray-700">
                        {flashcards[currentCard].resposta}
                      </p>
                    </>
                  )}
                </div>
              </Card>
            </div>

            <Button 
              onClick={toggleAnswer} 
              className="mb-6"
              variant={showAnswer ? "secondary" : "default"}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {showAnswer ? 'Ver Pergunta' : 'Ver Resposta'}
            </Button>

            <div className="flex justify-between items-center">
              <Button onClick={prevCard} variant="outline" disabled={flashcards.length <= 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              <div className="flex gap-2">
                {flashcards.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentCard ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button onClick={nextCard} variant="outline" disabled={flashcards.length <= 1}>
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardModal;
