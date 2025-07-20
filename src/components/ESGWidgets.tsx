import React, { useState } from 'react';
import { Calculator, Lightbulb, Building2, Zap, TreePine, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface ESGWidgetsProps {
  activeWidget: string | null;
  onAchievementUnlock: (achievement: string) => void;
}

const ESGWidgets: React.FC<ESGWidgetsProps> = ({ activeWidget, onAchievementUnlock }) => {
  const [carbonData, setCarbonData] = useState({
    electricity: 0,
    gas: 0,
    transportation: 0,
    waste: 0
  });
  
  const [companyData, setCompanyData] = useState({
    employees: 0,
    industry: '',
    renewableEnergy: 0,
    wasteReduction: 0
  });

  const [ledSteps, setLedSteps] = useState([
    { id: 1, title: "Calculate current energy usage", completed: false },
    { id: 2, title: "Research LED alternatives", completed: false },
    { id: 3, title: "Purchase quality LED bulbs", completed: false },
    { id: 4, title: "Install LED bulbs safely", completed: false },
    { id: 5, title: "Monitor energy savings", completed: false }
  ]);

  const calculateCarbonFootprint = () => {
    const total = (carbonData.electricity * 0.82) + (carbonData.gas * 2.3) + 
                  (carbonData.transportation * 0.21) + (carbonData.waste * 0.5);
    return Math.round(total * 100) / 100;
  };

  const calculateESGScore = () => {
    const baseScore = 50;
    const renewableBonus = (companyData.renewableEnergy / 100) * 30;
    const wasteBonus = (companyData.wasteReduction / 100) * 20;
    return Math.min(100, Math.round(baseScore + renewableBonus + wasteBonus));
  };

  const toggleLedStep = (stepId: number) => {
    setLedSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
    
    const completedSteps = ledSteps.filter(step => step.completed).length;
    if (completedSteps === 4) {
      onAchievementUnlock("LED Switching Champion");
    }
  };

  if (!activeWidget) return null;

  return (
    <div className="grid gap-6 animate-fade-in">
      {activeWidget === 'carbon-calculator' && (
        <Card className="widget-emerge glass border-0 shadow-immersive">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-primary" />
              Carbon Footprint Calculator
            </CardTitle>
            <CardDescription>
              Calculate your annual CO₂ emissions and discover reduction opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="electricity">Electricity (kWh/month)</Label>
                <Input
                  id="electricity"
                  type="number"
                  value={carbonData.electricity}
                  onChange={(e) => setCarbonData(prev => ({ ...prev, electricity: Number(e.target.value) }))}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gas">Gas (therms/month)</Label>
                <Input
                  id="gas"
                  type="number"
                  value={carbonData.gas}
                  onChange={(e) => setCarbonData(prev => ({ ...prev, gas: Number(e.target.value) }))}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportation">Transportation (miles/week)</Label>
                <Input
                  id="transportation"
                  type="number"
                  value={carbonData.transportation}
                  onChange={(e) => setCarbonData(prev => ({ ...prev, transportation: Number(e.target.value) }))}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waste">Waste (lbs/week)</Label>
                <Input
                  id="waste"
                  type="number"
                  value={carbonData.waste}
                  onChange={(e) => setCarbonData(prev => ({ ...prev, waste: Number(e.target.value) }))}
                  className="bg-background/50"
                />
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-earth rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">
                {calculateCarbonFootprint()} tons CO₂/year
              </div>
              <p className="text-sm text-muted-foreground">
                Average US household: 16 tons/year
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-accent/30 rounded-lg">
                <TreePine className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">{Math.round(calculateCarbonFootprint() * 2.5)} trees</div>
                <div className="text-xs text-muted-foreground">needed to offset</div>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">${Math.round(calculateCarbonFootprint() * 125)}</div>
                <div className="text-xs text-muted-foreground">annual cost</div>
              </div>
              <div className="p-4 bg-accent/30 rounded-lg">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">-{Math.round((16 - calculateCarbonFootprint()) / 16 * 100)}%</div>
                <div className="text-xs text-muted-foreground">vs average</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeWidget === 'led-guide' && (
        <Card className="widget-emerge glass border-0 shadow-immersive">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-primary" />
              LED Switching Guide
            </CardTitle>
            <CardDescription>
              Step-by-step guide to switch to energy-efficient LED lighting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ledSteps.map((step) => (
              <div 
                key={step.id} 
                className={`flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
                  step.completed ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30 hover:bg-muted/50'
                }`}
                onClick={() => toggleLedStep(step.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {step.completed ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${step.completed ? 'text-primary' : 'text-foreground'}`}>
                    {step.title}
                  </h4>
                </div>
                <Badge variant={step.completed ? "default" : "secondary"}>
                  {step.completed ? 'Complete' : 'Pending'}
                </Badge>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-forest text-primary-foreground rounded-lg">
              <h4 className="font-semibold mb-2">💡 LED Benefits</h4>
              <ul className="text-sm space-y-1">
                <li>• 75% less energy consumption</li>
                <li>• 25x longer lifespan</li>
                <li>• $75+ annual savings per household</li>
                <li>• Reduced heat generation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {activeWidget === 'company-profile' && (
        <Card className="widget-emerge glass border-0 shadow-immersive">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-primary" />
              Company ESG Profile
            </CardTitle>
            <CardDescription>
              Assess and track your organization's environmental, social, and governance performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={companyData.employees}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, employees: Number(e.target.value) }))}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, industry: e.target.value }))}
                  placeholder="e.g., Technology, Manufacturing"
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Renewable Energy Usage: {companyData.renewableEnergy}%</Label>
                <Slider
                  value={[companyData.renewableEnergy]}
                  onValueChange={(value) => setCompanyData(prev => ({ ...prev, renewableEnergy: value[0] }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Waste Reduction: {companyData.wasteReduction}%</Label>
                <Slider
                  value={[companyData.wasteReduction]}
                  onValueChange={(value) => setCompanyData(prev => ({ ...prev, wasteReduction: value[0] }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-sky rounded-xl">
              <div className="text-4xl font-bold text-primary mb-2">
                {calculateESGScore()}
              </div>
              <p className="text-lg font-medium text-foreground mb-1">ESG Score</p>
              <Progress value={calculateESGScore()} className="w-full h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                Industry Benchmark: 65
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">E</div>
                <div className="text-sm font-medium">Environmental</div>
                <div className="text-xs text-muted-foreground mt-1">Carbon, Energy, Waste</div>
              </div>
              <div className="text-center p-4 bg-accent/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">S</div>
                <div className="text-sm font-medium">Social</div>
                <div className="text-xs text-muted-foreground mt-1">Employees, Community</div>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">G</div>
                <div className="text-sm font-medium">Governance</div>
                <div className="text-xs text-muted-foreground mt-1">Ethics, Transparency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeWidget === 'energy-calculator' && (
        <Card className="widget-emerge glass border-0 shadow-immersive">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              Renewable Energy Calculator
            </CardTitle>
            <CardDescription>
              Discover the impact and savings potential of renewable energy solutions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8 bg-gradient-hero rounded-xl text-primary-foreground">
              <h3 className="text-2xl font-bold mb-4">Solar Power Potential</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">$1,200</div>
                  <div className="text-sm opacity-90">Annual Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">8.5</div>
                  <div className="text-sm opacity-90">Tons CO₂ Reduced</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">25</div>
                  <div className="text-sm opacity-90">Year ROI</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ESGWidgets;