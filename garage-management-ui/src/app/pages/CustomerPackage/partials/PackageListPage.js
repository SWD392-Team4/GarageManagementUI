
import React from 'react'
import PackageList from './PackageList';

export default function PackageListPage() {
    const packages = [
        {
          id: 1,
          name: 'Basic Maintenance Package',
          description: 'Oil change, tire pressure check, fluid level check, battery health check, and more.',
        },
        {
          id: 2,
          name: 'Intermediate Maintenance Package',
          description: 'Includes Basic Package services plus air filter replacement, brake inspection, and more.',
        },
        {
          id: 3,
          name: 'Comprehensive Maintenance Package',
          description: 'Full vehicle diagnostic, transmission fluid flush, suspension inspection, and more.',
        },
        {
          id: 4,
          name: 'Seasonal Tune-Up Package',
          description: 'Winter or summer-specific services like antifreeze check, AC recharge, and tire changes.',
        },
        {
          id: 5,
          name: 'Performance Enhancement Package',
          description: 'Engine tuning, exhaust upgrades, suspension upgrades, and more for car enthusiasts.',
        },
        {
          id: 6,
          name: 'Eco-Friendly Maintenance Package',
          description: 'Hybrid/electric vehicle battery check, emission system cleaning, and fuel efficiency services.',
        },
      ];
  return (
      <PackageList packages={packages} /> 
  )
}