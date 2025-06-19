
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Target, TrendingUp, Calendar, Brain, Award, Play } from 'lucide-react';
import StudyTimer from '@/components/StudyTimer';
import FlashcardModal from '@/components/FlashcardModal';
import SimuladoModal from '@/components/SimuladoModal';

const Index = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showSimulado, setShowSimulado] = useState(false);

  const estudosRecentes = [
    { materia: "Direito Constitucional", tempo: "2h 30min", data: "Hoje" },
    { materia: "Português", tempo: "1h 45min", data: "Ontem" },
    { materia: "Matemática", tempo: "3h 15min", data: "2 dias atrás" },
  ];

  const metas = [
    { titulo: "Estudar 6h por dia", progresso: 75, atual: "4h 30min", meta: "6h" },
    { titulo: "Resolver 50 questões", progresso: 60, atual: "30", meta: "50" },
    { titulo: "Revisar 5 matérias", progresso: 80, atual: "4", meta: "5" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Concurso Power Up
          </h1>
          <p className="text-lg text-gray-600">
            Sua plataforma completa de estudos para concursos públicos
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">127h</h3>
              <p className="text-sm text-gray-600">Tempo total estudado</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">85%</h3>
              <p className="text-sm text-gray-600">Taxa de acertos</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">12</h3>
              <p className="text-sm text-gray-600">Matérias estudadas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-800">1.247</h3>
              <p className="text-sm text-gray-600">Questões resolvidas</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Tools */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Ferramentas de Estudo
                </CardTitle>
                <CardDescription>
                  Acesse suas principais ferramentas de estudo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 flex flex-col gap-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowTimer(true)}
                  >
                    <Clock className="h-6 w-6" />
                    <span>Timer Pomodoro</span>
                  </Button>
                  
                  <Button 
                    className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700"
                    onClick={() => setShowFlashcards(true)}
                  >
                    <BookOpen className="h-6 w-6" />
                    <span>Flashcards</span>
                  </Button>
                  
                  <Button 
                    className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700"
                    onClick={() => setShowSimulado(true)}
                  >
                    <Play className="h-6 w-6" />
                    <span>Simulado</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Studies */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Estudos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {estudosRecentes.map((estudo, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{estudo.materia}</h4>
                        <p className="text-sm text-gray-600">{estudo.data}</p>
                      </div>
                      <Badge variant="secondary">{estudo.tempo}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Goals */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Metas do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metas.map((meta, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{meta.titulo}</span>
                        <span className="text-gray-600">{meta.atual}/{meta.meta}</span>
                      </div>
                      <Progress value={meta.progresso} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Calendar */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Próximos Estudos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-800">Direito Administrativo</p>
                      <p className="text-sm text-gray-600">14:00 - 16:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-800">Matemática</p>
                      <p className="text-sm text-gray-600">16:30 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-800">Revisão Geral</p>
                      <p className="text-sm text-gray-600">19:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        {showTimer && <StudyTimer onClose={() => setShowTimer(false)} />}
        {showFlashcards && <FlashcardModal onClose={() => setShowFlashcards(false)} />}
        {showSimulado && <SimuladoModal onClose={() => setShowSimulado(false)} />}
      </div>
    </div>
  );
};

export default Index;
