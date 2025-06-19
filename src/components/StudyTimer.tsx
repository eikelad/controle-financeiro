
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, X } from 'lucide-react';

interface StudyTimerProps {
  onClose: () => void;
}

const StudyTimer = ({ onClose }: StudyTimerProps) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0 && isRunning) {
      // Timer finished
      setIsRunning(false);
      if (!isBreak) {
        setSessions(sessions + 1);
        setIsBreak(true);
        setMinutes(5); // 5 minute break
        setSeconds(0);
      } else {
        setIsBreak(false);
        setMinutes(25); // Back to 25 minute study session
        setSeconds(0);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak, sessions]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">
            {isBreak ? 'Intervalo' : 'Foco'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(minutes, seconds)}
            </div>
            <div className="text-lg text-gray-600 mb-6">
              {isBreak ? 'Hora do descanso!' : 'Mantenha o foco nos estudos'}
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              <Button onClick={toggleTimer} size="lg" className="flex items-center gap-2">
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? 'Pausar' : 'Iniciar'}
              </Button>
              <Button onClick={resetTimer} variant="outline" size="lg">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Sessões completadas: <span className="font-bold">{sessions}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setMinutes(25);
                setSeconds(0);
                setIsBreak(false);
                setIsRunning(false);
              }}
              className={!isBreak ? 'bg-blue-50 border-blue-300' : ''}
            >
              Foco (25min)
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setMinutes(5);
                setSeconds(0);
                setIsBreak(true);
                setIsRunning(false);
              }}
              className={isBreak ? 'bg-green-50 border-green-300' : ''}
            >
              Pausa (5min)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimer;
