import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';

export function LandingPage() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
    </div>
  );
}