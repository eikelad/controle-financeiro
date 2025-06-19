
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, X } from 'lucide-react';

interface SimuladoModalProps {
  onClose: () => void;
}

const SimuladoModal = ({ onClose }: SimuladoModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const questions = [
    {
      materia: "Direito Constitucional",
      pergunta: "Segundo a Constituição Federal de 1988, é correto afirmar que:",
      alternativas: [
        "A dignidade da pessoa humana é princípio fundamental da República",
        "O Brasil é uma república federativa presidencialista",
        "Os direitos fundamentais são absolutos",
        "A soberania popular se manifesta apenas pelo voto",
        "A separação dos poderes é rígida e absoluta"
      ],
      correta: 0
    },
    {
      materia: "Português",
      pergunta: "Na frase 'Esperava-se que todos comparecessem à reunião', a oração subordinada é:",
      alternativas: [
        "Substantiva objetiva direta",
        "Substantiva subjetiva",
        "Adjetiva restritiva",
        "Adverbial temporal",
        "Substantiva predicativa"
      ],
      correta: 1
    },
    {
      materia: "Matemática",
      pergunta: "Em uma urna há 5 bolas vermelhas e 3 bolas azuis. A probabilidade de retirar uma bola vermelha é:",
      alternativas: [
        "3/8",
        "5/8",
        "3/5",
        "5/3",
        "1/2"
      ],
      correta: 1
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(newAnswers[currentQuestion + 1] || null);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correta) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-bold">Resultado do Simulado</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-600 mb-4">
                {percentage}%
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Você acertou {score} de {questions.length} questões
              </p>
              
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {answers[index] === question.correta ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{question.materia}</p>
                        <p className="text-sm text-gray-600">Questão {index + 1}</p>
                      </div>
                    </div>
                    <Badge variant={answers[index] === question.correta ? "default" : "destructive"}>
                      {answers[index] === question.correta ? "Correto" : "Incorreto"}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button onClick={onClose} className="w-full">
                  Continuar Estudando
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Simulado</CardTitle>
            <p className="text-sm text-gray-600">
              Questão {currentQuestion + 1} de {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
            
            <Badge variant="secondary" className="mb-4">
              {questions[currentQuestion].materia}
            </Badge>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].pergunta}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].alternativas.map((alternativa, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left border rounded-lg transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium text-gray-700 mr-3">
                    {String.fromCharCode(65 + index)})
                  </span>
                  {alternativa}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6">
              <Button 
                variant="outline" 
                disabled={currentQuestion === 0}
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1);
                  setSelectedAnswer(answers[currentQuestion - 1] || null);
                }}
              >
                Anterior
              </Button>
              
              <Button 
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
              >
                {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimuladoModal;
