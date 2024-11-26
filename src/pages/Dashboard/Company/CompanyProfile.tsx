import React, { useState } from 'react';
import { 
  AlertCircle, 
  MessageSquare, 
  Target, 
  Heart, 
  Building2, 
  Globe, 
  Linkedin,
  Wand2
} from 'lucide-react';

interface CompanyProfile {
  elevatorPitch: string;
  pitch: string;
  vision: string;
  mission: string;
  values: string[];
  website: string;
  linkedinUrl: string;
}

const CompanyProfile = () => {
  const [profile, setProfile] = useState<CompanyProfile>({
    elevatorPitch: '',
    pitch: '',
    vision: '',
    mission: '',
    values: [''],
    website: '',
    linkedinUrl: ''
  });

  const [isGenerating, setIsGenerating] = useState<keyof CompanyProfile | null>(null);

  const handleGenerateContent = async (field: keyof CompanyProfile) => {
    setIsGenerating(field);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGenerating(null);
  };

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...profile.values];
    newValues[index] = value;
    setProfile({ ...profile, values: newValues });
  };

  const addValue = () => {
    setProfile({ ...profile, values: [...profile.values, ''] });
  };

  const removeValue = (index: number) => {
    const newValues = profile.values.filter((_, i) => i !== index);
    setProfile({ ...profile, values: newValues });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Elevator Pitch */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Elevator Pitch</h3>
                <p className="text-sm text-gray-500">Notre pitch en 30 secondes</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateContent('elevatorPitch')}
              disabled={isGenerating === 'elevatorPitch'}
              className={`btn btn-secondary ${isGenerating === 'elevatorPitch' ? 'opacity-50' : ''}`}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating === 'elevatorPitch' ? 'Génération...' : 'Générer'}
            </button>
          </div>
          <textarea
            value={profile.elevatorPitch}
            onChange={(e) => setProfile({ ...profile, elevatorPitch: e.target.value })}
            rows={2}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Votre elevator pitch..."
          />
        </div>

        {/* Pitch */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Pitch</h3>
                <p className="text-sm text-gray-500">Notre proposition de valeur</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateContent('pitch')}
              disabled={isGenerating === 'pitch'}
              className={`btn btn-secondary ${isGenerating === 'pitch' ? 'opacity-50' : ''}`}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating === 'pitch' ? 'Génération...' : 'Générer'}
            </button>
          </div>
          <textarea
            value={profile.pitch}
            onChange={(e) => setProfile({ ...profile, pitch: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Votre pitch détaillé..."
          />
        </div>

        {/* Vision */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Vision</h3>
                <p className="text-sm text-gray-500">Notre vision à long terme</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateContent('vision')}
              disabled={isGenerating === 'vision'}
              className={`btn btn-secondary ${isGenerating === 'vision' ? 'opacity-50' : ''}`}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating === 'vision' ? 'Génération...' : 'Générer'}
            </button>
          </div>
          <textarea
            value={profile.vision}
            onChange={(e) => setProfile({ ...profile, vision: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Décrivez votre vision..."
          />
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Mission</h3>
                <p className="text-sm text-gray-500">Notre raison d'être</p>
              </div>
            </div>
            <button
              onClick={() => handleGenerateContent('mission')}
              disabled={isGenerating === 'mission'}
              className={`btn btn-secondary ${isGenerating === 'mission' ? 'opacity-50' : ''}`}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating === 'mission' ? 'Génération...' : 'Générer'}
            </button>
          </div>
          <textarea
            value={profile.mission}
            onChange={(e) => setProfile({ ...profile, mission: e.target.value })}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Décrivez votre mission..."
          />
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Valeurs</h3>
              <p className="text-sm text-gray-500">Nos valeurs fondamentales</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {profile.values.map((value, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => handleValueChange(index, e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Décrivez une valeur..."
              />
              <button
                onClick={() => removeValue(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <AlertCircle className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            onClick={addValue}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            + Ajouter une valeur
          </button>
        </div>
      </div>

      {/* Links section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Liens externes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Site web
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="https://linkedin.com/company/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;