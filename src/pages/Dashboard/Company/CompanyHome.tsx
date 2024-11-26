import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/Tabs';
import CompanyProfile from './CompanyProfile';
import CompanyPersonas from './CompanyPersonas';
import CompanyClients from './CompanyClients';
import KeyBenefits from './KeyBenefits';
import WritingStyles from './WritingStyles';
import { Building2, Users, Star, PenTool, Briefcase } from 'lucide-react';

const CompanyHome = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Entreprise</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 gap-4 bg-transparent p-0">
          <TabsTrigger 
            value="profile"
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              activeTab === 'profile' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Profil</div>
              <div className="text-xs text-gray-500">Vision & Mission</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="benefits"
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              activeTab === 'benefits' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <Star className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Bénéfices</div>
              <div className="text-xs text-gray-500">Forces & Solutions</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="personas"
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              activeTab === 'personas' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Personas</div>
              <div className="text-xs text-gray-500">Cibles & Audiences</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="clients"
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              activeTab === 'clients' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <Briefcase className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Clients</div>
              <div className="text-xs text-gray-500">Success Stories</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="styles"
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              activeTab === 'styles' 
                ? 'border-indigo-600 bg-indigo-50 text-indigo-600 ring-2 ring-indigo-200'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <PenTool className="h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Styles</div>
              <div className="text-xs text-gray-500">Ton & Écriture</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <CompanyProfile />
        </TabsContent>

        <TabsContent value="benefits">
          <KeyBenefits />
        </TabsContent>

        <TabsContent value="personas">
          <CompanyPersonas />
        </TabsContent>

        <TabsContent value="clients">
          <CompanyClients />
        </TabsContent>

        <TabsContent value="styles">
          <WritingStyles />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyHome;