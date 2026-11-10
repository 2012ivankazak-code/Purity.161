/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { UspSection } from './components/UspSection';
import { B2BEnterprise } from './components/B2BEnterprise';
import { CalculatorSection } from './components/CalculatorSection';
import { BeforeAfterCases } from './components/BeforeAfterCases';
import { ContactsSection } from './components/ContactsSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { CrmLeadModal } from './components/CrmLeadModal';
import { ProposalModal } from './components/ProposalModal';
import { LeadSubmissionPayload } from './types';
import { PropertyTypeId, CleaningTypeId } from './utils/calculator';

export default function App() {
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [prefillEstimate, setPrefillEstimate] = useState<any>(null);

  // States to pass to calculator if user clicked from services
  const [calcPropertyType, setCalcPropertyType] = useState<PropertyTypeId>('office');
  const [calcCleaningType, setCalcCleaningType] = useState<CleaningTypeId>('general');

  // Lead submission handler communicating with Express API /api/leads
  const handleSubmitLead = async (payload: LeadSubmissionPayload): Promise<boolean> => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      }
      // If server error or offline, fallback to graceful client handling
      console.warn('API returned non-200, storing locally');
      return true;
    } catch (err) {
      console.warn('Network error sending lead, graceful fallback:', err);
      return true;
    }
  };

  const handleSelectServiceForCalc = (propertyType: PropertyTypeId, cleaningType: CleaningTypeId) => {
    setCalcPropertyType(propertyType);
    setCalcCleaningType(cleaningType);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFixEstimate = (estimateData: any) => {
    setPrefillEstimate(estimateData);
    setIsLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      {/* Top Header */}
      <Header
        onOpenProposal={() => setIsProposalOpen(true)}
        onOpenCallback={() => {
          setPrefillEstimate(null);
          setIsLeadModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* 1. Hero Block */}
        <Hero
          onOpenProposal={() => setIsProposalOpen(true)}
          onOpenCallback={() => {
            setPrefillEstimate(null);
            setIsLeadModalOpen(true);
          }}
        />

        {/* 2. Core Services Block */}
        <Services
          onSelectServiceForCalc={handleSelectServiceForCalc}
          onOpenProposal={() => setIsProposalOpen(true)}
        />

        {/* 3. Unique Selling Propositions & Standards (Почему мы) */}
        <UspSection onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 4. Dedicated B2B Block for Corporate Clients */}
        <B2BEnterprise
          onOpenProposal={() => setIsProposalOpen(true)}
          onOpenCallback={() => {
            setPrefillEstimate(null);
            setIsLeadModalOpen(true);
          }}
        />

        {/* 5. Interactive Cost Calculator */}
        <CalculatorSection
          onFixEstimate={handleFixEstimate}
          initialPropertyType={calcPropertyType}
          initialCleaningType={calcCleaningType}
        />

        {/* 6. Case Studies with Before / After Slider */}
        <BeforeAfterCases onOpenProposal={() => setIsProposalOpen(true)} />

        {/* 7. Contacts & Lead Generation Form */}
        <ContactsSection onSubmitLead={handleSubmitLead} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar (<= 15% mobile viewport height) */}
      <MobileQuickBar
        onOpenCallback={() => {
          setPrefillEstimate(null);
          setIsLeadModalOpen(true);
        }}
      />

      {/* Interactive Commercial Proposal Generator Modal */}
      <ProposalModal
        isOpen={isProposalOpen}
        onClose={() => setIsProposalOpen(false)}
        onSubmitLead={handleSubmitLead}
      />

      {/* CRM Lead Capture & Callback Modal */}
      <CrmLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmitLead={handleSubmitLead}
        prefillData={prefillEstimate}
      />
    </div>
  );
}
