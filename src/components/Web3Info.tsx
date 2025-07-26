import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface InfoSection {
  id: string;
  title: string;
  content: string;
  links?: { text: string; url: string }[];
}

const Web3Info: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const infoSections: InfoSection[] = [
    {
      id: 'web3',
      title: 'What is Web3?',
      content: 'Web3 represents the next evolution of the internet, built on blockchain technology. It enables decentralized applications (dApps) that give users control over their data and digital assets without relying on centralized intermediaries.',
      links: [
        { text: 'Learn more about Web3', url: 'https://ethereum.org/en/web3/' },
        { text: 'Web3 Foundation', url: 'https://web3.foundation/' }
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Technology',
      content: 'Blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography. Each block contains transaction data and a reference to the previous block.',
      links: [
        { text: 'Blockchain Basics', url: 'https://ethereum.org/en/developers/docs/intro-to-ethereum/' },
        { text: 'How Blockchain Works', url: 'https://www.investopedia.com/terms/b/blockchain.asp' }
      ]
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts',
      content: 'Smart contracts are self-executing contracts with the terms of the agreement directly written into code. They automatically execute when predetermined conditions are met, eliminating the need for intermediaries.',
      links: [
        { text: 'Smart Contract Guide', url: 'https://ethereum.org/en/developers/docs/smart-contracts/' },
        { text: 'Solidity Documentation', url: 'https://docs.soliditylang.org/' }
      ]
    },
    {
      id: 'defi',
      title: 'DeFi (Decentralized Finance)',
      content: 'DeFi refers to financial applications built on blockchain technology that aim to recreate traditional financial systems in a decentralized manner. This includes lending, borrowing, trading, and yield farming.',
      links: [
        { text: 'DeFi Explained', url: 'https://ethereum.org/en/defi/' },
        { text: 'DeFi Pulse', url: 'https://defipulse.com/' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Learn About Web3</h2>
      </div>
      
      <div className="space-y-4">
        {infoSections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {expandedSections.includes(section.id) && (
              <div className="px-4 pb-4">
                <p className="text-gray-600 mb-4">{section.content}</p>
                {section.links && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Learn More:</p>
                    {section.links.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Web3Info; 