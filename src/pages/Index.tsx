import React, { useState, useRef } from 'react';
import ImmersiveHero from '@/components/ImmersiveHero';
import ConversationInterface from '@/components/ConversationInterface';
import ConversationPrompts from '@/components/ConversationPrompts';
import ESGWidgets from '@/components/ESGWidgets';
import AchievementNotification from '@/components/AchievementNotification';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  timestamp: Date;
}

const Index = () => {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [showConversation, setShowConversation] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  const handleExploreClick = () => {
    setShowConversation(true);
    setTimeout(() => {
      conversationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePromptClick = (prompt: string) => {
    setShowConversation(true);
    setTimeout(() => {
      conversationRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Here you would trigger the conversation with the prompt
      // For now, we'll just show the conversation interface
    }, 100);
  };

  const handleWidgetTrigger = (widgetType: string, data?: any) => {
    setActiveWidget(widgetType);
  };

  const handleAchievementUnlock = (title: string) => {
    const achievement: Achievement = {
      id: Date.now().toString(),
      title,
      description: getAchievementDescription(title),
      icon: getAchievementIcon(title),
      timestamp: new Date()
    };
    setCurrentAchievement(achievement);
  };

  const getAchievementDescription = (title: string): string => {
    const descriptions: Record<string, string> = {
      "LED Switching Champion": "You've mastered the art of energy-efficient lighting! Your commitment to LED technology is reducing energy consumption and carbon emissions.",
      "Carbon Calculator Expert": "You've successfully calculated your carbon footprint and taken the first step toward a more sustainable future.",
      "ESG Pioneer": "Your dedication to environmental, social, and governance principles is making a real difference in the world."
    };
    return descriptions[title] || "Congratulations on your sustainability achievement!";
  };

  const getAchievementIcon = (title: string): string => {
    const icons: Record<string, string> = {
      "LED Switching Champion": "💡",
      "Carbon Calculator Expert": "🌱",
      "ESG Pioneer": "🏆"
    };
    return icons[title] || "🌟";
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Immersive Hero Section */}
      <ImmersiveHero onExploreClick={handleExploreClick} />
      
      {/* Conversation Prompts */}
      <ConversationPrompts onPromptClick={handlePromptClick} />
      
      {/* Conversation Interface */}
      {showConversation && (
        <div ref={conversationRef} className="py-16 px-4 bg-gradient-earth">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Let's Talk Sustainability
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your AI ESG assistant is ready to help. Ask questions, get guidance, 
                and unlock interactive tools as our conversation progresses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-[600px]">
                <ConversationInterface onWidgetTrigger={handleWidgetTrigger} />
              </div>
              
              <div className="space-y-6">
                <ESGWidgets 
                  activeWidget={activeWidget} 
                  onAchievementUnlock={handleAchievementUnlock}
                />
                
                {!activeWidget && (
                  <div className="h-[600px] flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                          <div className="w-6 h-6 rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Widgets Will Appear Here</h3>
                      <p className="text-sm">
                        As you chat with the AI, relevant calculators and tools will emerge 
                        to enhance your sustainability journey.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Achievement Notifications */}
      <AchievementNotification 
        achievement={currentAchievement}
        onDismiss={() => setCurrentAchievement(null)}
      />
    </div>
  );
};

export default Index;
