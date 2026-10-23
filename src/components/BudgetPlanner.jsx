import { useState, useRef, useEffect } from 'react';
import { Info, ChevronDown, ChevronUp, Train, Utensils, Home, Ticket, AlertCircle, CheckCircle2, Edit3, RefreshCw } from 'lucide-react';
import './BudgetPlanner.css';

const tiers = {
  budget: { name: 'Budget', range: '₹1,000–1,800/day', total: 11200, icon: '🎒' },
  mid: { name: 'Mid-Range', range: '₹2,500–5,000/day', total: 25800, icon: '🏨' },
  comfort: { name: 'Comfort', range: '₹7,000–15,000/day', total: 73500, icon: '✨' },
};

const getCostsForTier = (tierKey) => {
  const multipliers = {
    budget: 0.43,
    mid: 1,
    comfort: 2.85,
  };
  const m = multipliers[tierKey] || 1;
  return [
    { category: 'Accommodation', icon: <Home size={18}/>, amount: Math.round(12500 * m), pct: 48, details: tierKey === 'budget' ? '5 Nights @ ₹950/night (Hostel/Guesthouse)' : tierKey === 'mid' ? '5 Nights @ ₹2,500/night (3-Star Hotel)' : '5 Nights @ ₹7,100/night (5-Star Resort)', color: '#3B82F6' },
    { category: 'Transport', icon: <Train size={18}/>, amount: Math.round(4200 * m), pct: 16, details: tierKey === 'budget' ? 'HRTC Bus (₹500) + Shared Auto (₹1,200)' : tierKey === 'mid' ? 'Volvo Bus (₹1,200) + Local Ola/Auto (₹3,000)' : 'Flight (₹4,500) + Private Cab (₹7,500)', color: '#10B981' },
    { category: 'Food & Dining', icon: <Utensils size={18}/>, amount: Math.round(7000 * m), pct: 27, details: tierKey === 'budget' ? '₹400/day — Dhabas + Street Food' : tierKey === 'mid' ? '₹1,000/day avg — Cafes + Dhabas + Restaurants' : '₹2,800/day — Fine Dining + Cafes + Room Service', color: '#F59E0B' },
    { category: 'Activities & Entry', icon: <Ticket size={18}/>, amount: Math.round(2100 * m), pct: 9, details: tierKey === 'budget' ? 'Basic entries only — ₹50 ASI rate' : tierKey === 'mid' ? 'Rohtang Pass Permit ₹500 + ASI ₹50 (Indian rate)' : 'Premium paragliding ₹3,500 + Private guided tours', color: '#8B5CF6' },
  ];
};

const AnimatedBar = ({ pct, color, delay }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(pct), delay); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  return (
    <div className="abar-track" ref={ref}>
      <div className="abar-fill" style={{ width: `${width}%`, background: color }}></div>
    </div>
  );
};

const CITY_BUDGET_MULTIPLIER = {
  goa: 1.2,
  mumbai: 1.35,
  delhi: 1.15,
  jaipur: 0.95,
  manali: 1.0,
  agra: 0.9,
  udaipur: 1.05,
  kerala: 1.1,
};

const BudgetPlanner = ({ destination = 'Manali', tripData = null }) => {
  const [tier, setTier] = useState('mid');
  const [expanded, setExpanded] = useState(null);

  // TC06-TC10: Custom budget input
  const [customBudget, setCustomBudget] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [budgetError, setBudgetError] = useState('');
  const [budgetSuccess, setBudgetSuccess] = useState('');
  const [customTotal, setCustomTotal] = useState(null);

  const getTripDays = () => {
    const dateRange = tripData?.dates;
    if (!dateRange || !dateRange.includes(' to ')) return 7;
    const [start, end] = dateRange.split(' to ');
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 7;
    const diffMs = endDate.getTime() - startDate.getTime();
    return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1);
  };

  const tripDays = getTripDays();
  const durationFactor = tripDays / 7;
  const destinationKey = destination.toLowerCase();
  const cityFactor = CITY_BUDGET_MULTIPLIER[destinationKey] || 1;
  const costs = getCostsForTier(tier).map((cost) => ({
    ...cost,
    amount: Math.round(cost.amount * cityFactor * durationFactor),
  }));
  const backendTotal = tripData?.budgetBreakdown?.total;
  const tierTotal = Math.round(tiers[tier].total * cityFactor * durationFactor);
  const displayTotal = customTotal || backendTotal || tierTotal;
  const dailyBudget = tripData?.budgetBreakdown?.dailyAverage || Math.round(displayTotal / tripDays);

  // TC06: Validate and apply custom budget
  const handleCustomBudget = (val) => {
    setCustomBudget(val);
    setBudgetError('');
    setBudgetSuccess('');

    const num = parseFloat(val.replace(/[₹,\s]/g, ''));

    // TC07: Zero budget
    if (val && num === 0) {
      setBudgetError('Budget must be greater than zero');
      return;
    }

    if (val && isNaN(num)) {
      setBudgetError('Please enter a valid number');
      return;
    }

    if (val && num < 0) {
      setBudgetError('Budget cannot be negative');
      return;
    }
  };

  // TC06, TC08, TC10: Apply the custom budget
  const applyCustomBudget = () => {
    const num = parseFloat(customBudget.replace(/[₹,\s]/g, ''));

    if (!customBudget || isNaN(num)) {
      setBudgetError('Please enter a valid budget amount');
      return;
    }

    if (num === 0) {
      setBudgetError('Budget must be greater than zero');
      return;
    }

    if (num < 500) {
      setBudgetError('Minimum budget is ₹500/day for a basic trip');
      return;
    }

    // TC08: High budget handling
    if (num > 50000) {
      setBudgetSuccess(`₹${num.toLocaleString()}/day — Premium luxury tier applied!`);
    } else if (num > 15000) {
      setBudgetSuccess(`₹${num.toLocaleString()}/day — Comfort tier matched`);
    } else if (num > 5000) {
      setBudgetSuccess(`₹${num.toLocaleString()}/day — Mid-range tier matched`);
    } else {
      setBudgetSuccess(`₹${num.toLocaleString()}/day — Budget tier matched`);
    }

    // TC10: Update the total based on custom input and selected trip duration
    const total = Math.round(num * tripDays);
    setCustomTotal(total);

    // Auto-select the closest tier
    if (num <= 1800) setTier('budget');
    else if (num <= 5000) setTier('mid');
    else setTier('comfort');

    setBudgetError('');
  };

  // TC10: Reset custom budget
  const resetBudget = () => {
    setCustomBudget('');
    setCustomTotal(null);
    setBudgetError('');
    setBudgetSuccess('');
    setShowCustomInput(false);
  };

  // TC09: Switch tiers
  const handleTierChange = (newTier) => {
    setTier(newTier);
    setCustomTotal(null);
    setCustomBudget('');
    setBudgetError('');
    setBudgetSuccess('');
  };

  return (
    <div className="budget-module glass-panel" id="budget-planner">
      <div className="budget-top">
        <h2>Budget Planner for {destination}</h2>
        {/* TC09: Budget type selector */}
        <div className="tier-switch" id="tier-switch">
          {Object.entries(tiers).map(([k, v]) => (
            <button key={k} className={`tier-opt ${tier === k ? 'active' : ''}`} onClick={() => handleTierChange(k)} id={`tier-${k}`}>
              <span className="tier-emoji">{v.icon}</span> {v.name}
            </button>
          ))}
        </div>
      </div>

      <div className="budget-hero">
        <div className="total-card">
          <span className="total-label">Estimated Total (per person)</span>
          <div className="total-amount gradient-text" id="budget-total">₹{displayTotal.toLocaleString()}</div>
          <span className="total-range">{tiers[tier].range} (city-adjusted)</span>
          <div className="budget-feedback success" style={{ marginTop: 10 }}>
            <CheckCircle2 size={14} /> Estimated daily budget: ₹{dailyBudget.toLocaleString()}
          </div>

          {/* TC06-TC10: Custom budget input toggle */}
          {!showCustomInput ? (
            <button className="custom-budget-toggle" onClick={() => setShowCustomInput(true)} id="custom-budget-toggle">
              <Edit3 size={14} /> Set Custom Budget
            </button>
          ) : (
            <div className="custom-budget-section" id="custom-budget-section">
              <div className="custom-budget-input-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="text"
                  placeholder="e.g. 2000"
                  value={customBudget}
                  onChange={(e) => handleCustomBudget(e.target.value)}
                  className={`custom-budget-input ${budgetError ? 'input-error' : ''} ${budgetSuccess ? 'input-success' : ''}`}
                  id="custom-budget-input"
                />
                <span className="currency-suffix">/day</span>
              </div>

              {/* TC07: Budget validation error */}
              {budgetError && (
                <div className="budget-feedback error" id="budget-error-msg">
                  <AlertCircle size={14} /> {budgetError}
                </div>
              )}

              {/* TC06/TC08: Budget success */}
              {budgetSuccess && (
                <div className="budget-feedback success" id="budget-success-msg">
                  <CheckCircle2 size={14} /> {budgetSuccess}
                </div>
              )}

              <div className="custom-budget-actions">
                <button className="primary-btn custom-apply-btn" onClick={applyCustomBudget} id="apply-budget-btn">
                  Apply Budget
                </button>
                <button className="secondary-btn custom-reset-btn" onClick={resetBudget} id="reset-budget-btn">
                  <RefreshCw size={14} /> Reset
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="donut-chart">
          <svg viewBox="0 0 120 120" className="donut-svg">
            {costs.reduce((acc, cost, i) => {
              const offset = acc.offset;
              const dash = (cost.pct / 100) * 314;
              acc.elements.push(
                <circle key={i} cx="60" cy="60" r="50" fill="none" stroke={cost.color} strokeWidth="12"
                  strokeDasharray={`${dash} ${314 - dash}`} strokeDashoffset={-offset}
                  className="donut-segment" style={{ animationDelay: `${i * 0.2}s` }} />
              );
              acc.offset = offset + dash;
              return acc;
            }, { offset: 0, elements: [] }).elements}
          </svg>
          <div className="donut-center">{tripDays} Days</div>
        </div>
      </div>

      <div className="india-badge" id="india-badge">
        <Info size={16} /> Uses <strong>Indian National Rates</strong> — ASI ₹50 (vs ₹500 foreign), IRCTC prices, Ola/Uber estimates.
      </div>

      <div className="breakdown-section">
        <h3>Cost Breakdown</h3>
        {costs.map((c, i) => (
          <div key={i} className={`cost-row ${expanded === i ? 'expanded' : ''}`} onClick={() => setExpanded(expanded === i ? null : i)} id={`cost-row-${i}`}>
            <div className="cost-row-main">
              <div className="cost-icon" style={{ color: c.color, background: `${c.color}15` }}>{c.icon}</div>
              <div className="cost-meta">
                <span className="cost-name">{c.category}</span>
                <AnimatedBar pct={c.pct} color={c.color} delay={i * 150} />
              </div>
              <div className="cost-right">
                <span className="cost-val">₹{c.amount.toLocaleString()}</span>
                <span className="cost-pct">{c.pct}%</span>
                {expanded === i ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </div>
            </div>
            {expanded === i && (
              <div className="cost-detail">{c.details}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPlanner;
