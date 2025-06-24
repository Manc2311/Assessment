import React, { useEffect, useState } from 'react';
import axios from 'axios';
const policiesData = [
  {
    id: 'p1',
    name: 'Basic Term Plan',
    type: 'Term',
    basePremium: 1000,
    minAge: 18,
    maxAge: 60,
    riders: [
      { id: 'r1', name: 'Accidental Rider', additionalPremium: 200 },
      { id: 'r2', name: 'Critical Illness', additionalPremium: 300 },
    ],
    premiumOptions: [
      { term: 10, frequency: 'Yearly', multiplier: 1 },
      { term: 20, frequency: 'Monthly', multiplier: 0.1 },
    ],
  },
];

function PolicyDetails() {
  const [policies, setPolicies] = useState(policiesData);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [age, setAge] = useState(30);
  const [term, setTerm] = useState(10);
  const [frequency, setFrequency] = useState('Yearly');
  const [riders, setRiders] = useState([]);
  const [result, setResult] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/policies').then((res) => setPolicies(res.data));
//   }, []);

  const handleCalculate = () => {
    if (!selectedPolicy) return;
    axios
      .post('http://localhost:5000/api/calculate', {
        policyId: selectedPolicy.id,
        age,
        selectedRiderIds: riders,
        termYears: term,
        frequency,
      })
      .then((res) => setResult(res.data));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Insurance Policy Calculator</h1>
      <select onChange={(e) => {
        const policy = policies.find(p => p.id === e.target.value);
        setSelectedPolicy(policy);
        setRiders([]);
      }}>
        <option value="">Select Policy</option>
        {policies.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      {selectedPolicy && (
        <div style={{ marginTop: 20 }}>
          <h3>Enter Age</h3>
          <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />

          <h3>Select Term</h3>
          <select value={term} onChange={e => setTerm(Number(e.target.value))}>
            {selectedPolicy.premiumOptions.map(po => (
              <option key={po.term} value={po.term}>{po.term} Years</option>
            ))}
          </select>

          <h3>Payment Frequency</h3>
          <select value={frequency} onChange={e => setFrequency(e.target.value)}>
            {selectedPolicy.premiumOptions.map(po => (
              <option key={po.frequency} value={po.frequency}>{po.frequency}</option>
            ))}
          </select>

          <h3>Select Riders</h3>
          {selectedPolicy.riders.map(r => (
            <label key={r.id}>
              <input
                type="checkbox"
                value={r.id}
                checked={riders.includes(r.id)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setRiders(prev => checked ? [...prev, r.id] : prev.filter(id => id !== r.id));
                }}
              />
              {r.name}
            </label>
          ))}

          <button onClick={handleCalculate} style={{ display: 'block', marginTop: 20 }}>Calculate</button>

          {result && (
            <div style={{ marginTop: 20 }}>
              <h4>Total Premium Per Period: ₹{result.totalPremiumPerPeriod.toFixed(2)}</h4>
              <h4>Total Premium Paid: ₹{result.totalPremiumPaid.toFixed(2)}</h4>
              <h4>Projected Benefit: ₹{result.projectedBenefit.toFixed(2)}</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PolicyDetails;