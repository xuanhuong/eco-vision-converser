import React from 'react';
import { Calculator, Lightbulb, Building2, TrendingUp, Leaf, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ConversationPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const ConversationPrompts: React.FC<ConversationPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: Calculator,
      title: "Calculate Carbon Footprint",
      description: "How much CO₂ does my business produce?",
      prompt: "Help me calculate my company's carbon footprint",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Lightbulb,
      title: "Switch to LED Lighting",
      description: "Guide me through energy-efficient lighting",
      prompt: "How do I switch my office to LED light bulbs?",
      color: "text-accent-foreground",
      bg: "bg-accent/20"
    },
    {
      icon: Building2,
      title: "Company ESG Profile",
      description: "Assess our sustainability performance",
      prompt: "Create an ESG profile for my company",
      color: "text-primary-glow",
      bg: "bg-primary-glow/10"
    },
    {
      icon: Zap,
      title: "Renewable Energy Options",
      description: "Explore solar and wind solutions",
      prompt: "What renewable energy options are available for my business?",
      color: "text-destructive",
      bg: "bg-destructive/10"
    },
    {
      icon: TrendingUp,
      title: "Sustainability ROI",
      description: "Calculate return on green investments",
      prompt: "Show me the ROI of sustainability initiatives",
      color: "text-secondary-foreground",
      bg: "bg-secondary/30"
    },
    {
      icon: Leaf,
      title: "Waste Reduction Plan",
      description: "Minimize environmental impact",
      prompt: "Help me create a waste reduction plan for my office",
      color: "text-primary",
      bg: "bg-primary/10"
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Your Sustainability Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a topic below or ask me anything about ESG, energy efficiency, 
            or environmental impact. I'm here to guide you every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <Card 
              key={index}
              className="cursor-pointer glass border-0 shadow-floating hover:shadow-immersive transition-all duration-300 hover:scale-105 group"
              onClick={() => onPromptClick(prompt.prompt)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${prompt.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <prompt.icon className={`w-6 h-6 ${prompt.color}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {prompt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prompt.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground italic">
                    "{prompt.prompt}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPrompts;