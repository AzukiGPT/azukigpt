import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  FileText,
  BarChart,
  Users,
  Star,
  Target,
  Clock,
  Command,
  Brain,
  Rocket,
  Zap,
  Mail,
  Phone,
  Facebook,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Command className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">MarketingGPT</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/dashboard"
                className="btn btn-primary"
              >
                Essayez Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Entrez dans l'ère de</span>
            <span className="block text-primary">l'IA Marketing</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Le futur du marketing est déjà là. Gagnez 10 ans d'avance en unissant le meilleur du growth marketing et de l'intelligence artificielle.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Link
              to="/dashboard"
              className="btn btn-primary"
            >
              Essayez Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Devenez le pionnier du marketing de demain
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Le monde du marketing évolue à une vitesse fulgurante. Les stratégies d'hier ne suffisent plus pour se démarquer. Avec MarketingGPT, intégrez dès aujourd'hui les innovations qui façonneront le marketing de demain.
            </p>
          </div>
        </div>
      </div>

      {/* Evolution Timeline */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            10 ans d'innovation en un seul outil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">2012-2017</h3>
              <h4 className="text-lg font-medium mb-2">L'Essor du Growth Marketing</h4>
              <p className="text-gray-600">
                Des visionnaires comme Brian Balfour et Andrew Chen ont révolutionné le marketing avec des approches centrées sur la croissance rapide.
              </p>
            </div>
            <div className="card">
              <Rocket className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">2018-2023</h3>
              <h4 className="text-lg font-medium mb-2">La Transformation en Outils</h4>
              <p className="text-gray-600">
                Le savoir s'est transformé en plateformes puissantes. Les connaissances des experts sont devenues accessibles à tous.
              </p>
            </div>
            <div className="card">
              <Brain className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">2024-2030</h3>
              <h4 className="text-lg font-medium mb-2">L'Ère de l'IA Marketing</h4>
              <p className="text-gray-600">
                MarketingGPT incarne cette nouvelle ère, en intégrant le meilleur des 10 dernières années dans une plateforme alimentée par l'IA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Tout ce dont vous avez besoin pour dominer votre marché
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-100 rounded-2xl p-8 aspect-video">
              {/* Application Screenshot/Demo would go here */}
              <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Templates d'experts intégrés</h3>
                  <p className="text-gray-600">Utilisez des modèles conçus par les leaders du secteur pour des résultats immédiats.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Automatisation intelligente</h3>
                  <p className="text-gray-600">L'IA gère les tâches répétitives, vous laissant vous concentrer sur la stratégie.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Growth hacking simplifié</h3>
                  <p className="text-gray-600">Mettez en œuvre des techniques avancées sans complexité.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Analyses prédictives avancées</h3>
                  <p className="text-gray-600">Anticipez les tendances et prenez de l'avance sur vos concurrents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Investissez dans votre avenir</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Trial */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Essai Gratuit</h3>
              <div className="text-4xl font-bold mb-6">0€ <span className="text-lg font-normal text-gray-500">/14 jours</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>Obtenez votre pitch d'entreprise par MarketingGPT</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Jusqu'à 3 utilisateurs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Support par email</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn btn-primary w-full">
                Démarrer l'essai gratuit
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="card border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Populaire
              </div>
              <h3 className="text-xl font-semibold mb-4">Plan Pro</h3>
              <div className="text-4xl font-bold mb-6">250€ <span className="text-lg font-normal text-gray-500">/mois</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <span>Toutes les fonctionnalités avancées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Jusqu'à 10 utilisateurs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Support prioritaire</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>100,000 tokens/mois inclus</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn btn-primary w-full">
                Choisir le Plan Pro
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Plan Enterprise</h3>
              <div className="text-4xl font-bold mb-6">2000€+ <span className="text-lg font-normal text-gray-500">/mois</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>CMO part-time dédié</span>
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span>Expert dédié 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>500,000 tokens/mois inclus</span>
                </li>
              </ul>
              <Link to="/dashboard" className="btn btn-primary w-full">
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <Command className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-900">MarketingGPT</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-primary">À propos</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary">Fonctionnalités</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary">Tarifs</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">support@marketinggpt.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">+33 1 23 45 67 89</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-gray-400 text-sm">
              © 2024 MarketingGPT. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;