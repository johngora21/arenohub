import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Operation } from '@/types';
import { Clock, User, Wrench, Fuel } from 'lucide-react';

interface OperationDetailsProps {
  operation: Operation;
  onClose: () => void;
}

const OperationDetails: React.FC<OperationDetailsProps> = ({ operation, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">Detalhes da Operação</CardTitle>
              <p className="text-sm text-muted-foreground">ID: {operation.id}</p>
            </div>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge 
              variant={operation.status === 'active' ? 'default' : 'default'}
              className={getStatusColor(operation.status)}
            >
              {operation.status === 'active' ? 'Ativa' : 'Concluída'}
            </Badge>
          </div>

          {/* Operator Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Operador</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">{operation.operatorName}</p>
                <p className="text-sm text-muted-foreground">ID: {operation.operatorId}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-600" />
                <span className="font-medium">Empilhadeira</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">{operation.forkliftModel}</p>
                <p className="text-sm text-muted-foreground">ID: {operation.forkliftId}</p>
              </div>
            </div>
          </div>

          {/* Time Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Início</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">{new Date(operation.startTime).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">{new Date(operation.startTime).toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Duração</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">{formatDuration(operation.startTime, operation.endTime)}</p>
                {operation.endTime && (
                  <p className="text-sm text-muted-foreground">
                    Finalizado em: {new Date(operation.endTime).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-red-600" />
                <span className="font-medium">Consumo de Gás</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">{operation.gasConsumption || 'N/A'} Litros</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Horímetro</span>
              </div>
              <div className="pl-6">
                <p className="font-medium">
                  Inicial: {operation.initialHourMeter}
                </p>
                <p className="font-medium">
                  Atual: {operation.currentHourMeter || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationDetails;
