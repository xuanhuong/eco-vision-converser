import React, { useState, useEffect } from 'react';
import { Award, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: Date;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onDismiss: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onDismiss 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for animation to complete
  };

  if (!achievement) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <Card className="w-80 glass border-0 shadow-immersive overflow-hidden">
        <div className="bg-gradient-hero p-1">
          <div className="bg-card rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse-glow">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Achievement Unlocked!</h3>
                  <p className="text-sm text-muted-foreground">
                    {achievement.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleDismiss}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-primary text-lg">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                +50 ESG Points
              </div>
              <div className="text-2xl">{achievement.icon}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AchievementNotification;