import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, TreePine, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroNature from '@/assets/hero-nature.jpg';

interface ImmersiveHeroProps {
  onExploreClick: () => void;
}

const ImmersiveHero: React.FC<ImmersiveHeroProps> = ({ onExploreClick }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${heroNature})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background/80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center glass">
          <TreePine className="w-8 h-8 text-primary" />
        </div>
      </div>
      
      <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center glass">
          <Globe className="w-6 h-6 text-primary" />
        </div>
      </div>
      
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-20 h-20 bg-primary-glow/20 rounded-full flex items-center justify-center glass">
          <Sparkles className="w-10 h-10 text-primary-glow animate-pulse-glow" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Sustainable </span>
              Future Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the future of ESG guidance through natural conversation. 
              Let AI help you build a more sustainable tomorrow, one decision at a time.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Button 
              onClick={onExploreClick}
              size="lg" 
              className="px-8 py-6 text-lg font-medium bg-gradient-hero hover:shadow-immersive transition-all duration-300 hover:scale-105"
            >
              Start Your ESG Journey
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-medium glass hover:glass-dark transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
          
          <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>AI-Powered Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Real-time ESG Metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
              <span>Personalized Action Plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
        <ArrowDown className="w-4 h-4 text-primary mx-auto mt-2" />
      </div>
    </div>
  );
};

export default ImmersiveHero;