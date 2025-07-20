import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  triggerWidget?: string;
}

interface ConversationInterfaceProps {
  onWidgetTrigger: (widgetType: string, data?: any) => void;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({ onWidgetTrigger }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Mock AI responses with widget triggers
  const getAIResponse = (userMessage: string): { content: string; triggerWidget?: string } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint') || lowerMessage.includes('emissions')) {
      return {
        content: "I'd be happy to help you calculate your carbon footprint! Let me show you our interactive calculator where you can input your energy usage, transportation, and other factors.",
        triggerWidget: 'carbon-calculator'
      };
    }
    
    if (lowerMessage.includes('light bulb') || lowerMessage.includes('led') || lowerMessage.includes('switch')) {
      return {
        content: "Great question about switching to LED bulbs! This is one of the simplest ways to reduce energy consumption. Let me create a step-by-step guide for you.",
        triggerWidget: 'led-guide'
      };
    }
    
    if (lowerMessage.includes('company') || lowerMessage.includes('business') || lowerMessage.includes('profile')) {
      return {
        content: "I can help you create or analyze your company's ESG profile. Let me show you our comprehensive assessment tool.",
        triggerWidget: 'company-profile'
      };
    }
    
    if (lowerMessage.includes('energy') || lowerMessage.includes('renewable') || lowerMessage.includes('solar')) {
      return {
        content: "Renewable energy is a fantastic step toward sustainability! Let me show you the potential impact and savings you could achieve.",
        triggerWidget: 'energy-calculator'
      };
    }
    
    return {
      content: "That's a great question about sustainability! I can help you with ESG assessments, carbon footprint calculations, energy efficiency guides, and company sustainability profiles. What specific area would you like to explore?"
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        sender: 'ai',
        timestamp: new Date(),
        triggerWidget: aiResponse.triggerWidget
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Trigger widget if specified
      if (aiResponse.triggerWidget) {
        setTimeout(() => {
          onWidgetTrigger(aiResponse.triggerWidget!);
        }, 500);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Stopped listening" : "Started listening",
      description: isListening ? "Voice input disabled" : "Speak your question..."
    });
  };

  return (
    <Card className="h-full flex flex-col glass border-0 shadow-floating">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
          <h2 className="text-xl font-semibold text-foreground">ESG Assistant</h2>
          <Sparkles className="w-5 h-5 text-primary-glow" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Ask me about carbon footprints, energy efficiency, or company ESG profiles
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary-glow animate-pulse-glow" />
            <p className="text-lg font-medium mb-2">Welcome to your ESG journey!</p>
            <p>Ask me anything about sustainability, energy efficiency, or environmental impact.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={message.sender === 'user' ? 'message-user' : 'message-ai'}>
              <p className="leading-relaxed">{message.content}</p>
              <div className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="message-ai">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
                <span className="text-sm text-muted-foreground">Analyzing your question...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border/50">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={`${isListening ? 'bg-destructive text-destructive-foreground' : ''} transition-colors`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about carbon footprint, LED switching, company ESG profile..."
              className="pr-12 bg-background/50 border-border/50 focus:border-primary transition-colors"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConversationInterface;