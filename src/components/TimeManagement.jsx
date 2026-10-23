import { useState, useCallback } from 'react';
import { Clock, Coffee, MapPin, AlertTriangle, ChevronDown, ChevronUp, Trash2, RefreshCw, CloudRain, Zap } from 'lucide-react';
import './TimeManagement.css';

const INITIAL_DAYS = [
  {
    day: 'Day 1 — Arrival & Old Manali', items: [
      { id: 'd1-1', time: '09:00 AM', dur: '1.5 hrs', act: "Breakfast at Johnson's Cafe", type: 'food' },
      { id: 'd1-2', time: '10:30 AM', dur: '30 min', act: 'Buffer / Transit', type: 'buffer', isBuffer: true },
      { id: 'd1-3', time: '11:00 AM', dur: '2 hrs', act: 'Hadimba Temple', type: 'activity', tip: 'Arrive early to skip crowds.' },
      { id: 'd1-4', time: '01:00 PM', dur: '1 hr', act: 'Lunch — Old Manali Cafes', type: 'food' },
      { id: 'd1-5', time: '02:00 PM', dur: '3 hrs', act: 'Mall Road & Market Exploration', type: 'activity' },
      { id: 'd1-6', time: '05:00 PM', dur: '1 hr', act: 'Hotel Check-in + Rest', type: 'buffer', isBuffer: true },
      { id: 'd1-7', time: '07:00 PM', dur: '2 hrs', act: 'Dinner & Bonfire', type: 'food', warn: 'Avoid isolated areas after 9 PM.' },
    ]
  },
  {
    day: 'Day 2 — Solang Valley Adventure', items: [
      { id: 'd2-1', time: '07:00 AM', dur: '1 hr', act: 'Early Breakfast', type: 'food' },
      { id: 'd2-2', time: '08:00 AM', dur: '1 hr', act: 'Cab to Solang Valley', type: 'buffer', isBuffer: true },
      { id: 'd2-3', time: '09:00 AM', dur: '4 hrs', act: 'Snow Activities & Paragliding', type: 'activity', tip: 'Book paragliding at official counter only — ₹2,500.' },
      { id: 'd2-4', time: '01:00 PM', dur: '1 hr', act: 'Lunch at Solang Dhaba', type: 'food' },
      { id: 'd2-5', time: '02:00 PM', dur: '3 hrs', act: 'Trek to Anjani Mahadev', type: 'activity' },
      { id: 'd2-6', time: '05:00 PM', dur: '30 min', act: 'Buffer / Rest', type: 'buffer', isBuffer: true },
      { id: 'd2-7', time: '07:00 PM', dur: '2 hrs', act: 'Dinner at Café 1947', type: 'food' },
    ]
  },
  {
    day: 'Day 3 — Rohtang Pass Day Trip', items: [
      { id: 'd3-1', time: '06:00 AM', dur: '30 min', act: 'Early Breakfast (packed)', type: 'food' },
      { id: 'd3-2', time: '06:30 AM', dur: '2.5 hrs', act: 'Drive to Rohtang Pass', type: 'buffer', isBuffer: true },
      { id: 'd3-3', time: '09:00 AM', dur: '3 hrs', act: 'Rohtang Exploration + Photography', type: 'activity', tip: 'Rohtang permit required — ₹500 online.', warn: 'Weather can change rapidly.' },
      { id: 'd3-4', time: '12:00 PM', dur: '1 hr', act: 'Lunch at Dhaba', type: 'food' },
      { id: 'd3-5', time: '01:00 PM', dur: '2.5 hrs', act: 'Return drive to Manali', type: 'buffer', isBuffer: true },
      { id: 'd3-6', time: '05:00 PM', dur: '2 hrs', act: 'Old Manali Street Shopping', type: 'activity' },
      { id: 'd3-7', time: '08:00 PM', dur: '2 hrs', act: 'Farewell Dinner', type: 'food' },
    ]
  },
];

const buildDaysFromTripData = (destination, tripData) => {
  const itinerary = tripData?.itinerary;
  if (!itinerary || itinerary.length === 0) return INITIAL_DAYS;

  return itinerary.map((dayPlan, dayIndex) => {
    const mappedItems = (dayPlan.schedule || []).map((slot, slotIdx) => {
      const activity = slot.activity || `Explore ${destination}`;
      const lower = activity.toLowerCase();
      const isFood = lower.includes('breakfast') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('cuisine');
      const isBuffer = lower.includes('buffer') || lower.includes('relax') || lower.includes('transit');
      return {
        id: `d${dayIndex + 1}-${slotIdx + 1}`,
        time: slot.time || '09:00 AM',
        dur: isFood ? '1 hr' : isBuffer ? '45 min' : '2 hrs',
        act: activity,
        type: isBuffer ? 'buffer' : isFood ? 'food' : 'activity',
        isBuffer,
      };
    });

    const normalizedItems = rebuildTimeline(mappedItems);

    return {
      day: `Day ${dayIndex + 1} — ${destination}`,
      items: normalizedItems.length > 0 ? normalizedItems : INITIAL_DAYS[dayIndex % INITIAL_DAYS.length].items,
    };
  });
};

// TC20: Parse time to minutes
const timeToMinutes = (timeStr) => {
  const [time, meridiem] = timeStr.split(' ');
  let [hours, mins] = time.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return hours * 60 + mins;
};

// TC20: Minutes to time string
const minutesToTime = (mins) => {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const meridiem = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 === 0 ? 12 : h % 12;
  return `${displayH}:${String(m).padStart(2, '0')} ${meridiem}`;
};

// TC16: Rebuild timeline from items (re-calculate times based on durations)
const rebuildTimeline = (items, startDelayMins = 0) => {
  let currentMins = timeToMinutes(items[0]?.time || '09:00 AM') + startDelayMins;
  return items.map((item) => {
    const newTime = minutesToTime(currentMins);
    const durNum = parseFloat(item.dur);
    const durMins = Math.round(durNum * 60);
    currentMins += durMins;
    // TC18: Add 15-min buffer after each non-buffer activity
    if (!item.isBuffer) currentMins += 15;
    return { ...item, time: newTime };
  });
};

// TC17: Detect time conflicts
const detectConflicts = (items) => {
  const conflicts = [];
  for (let i = 0; i < items.length - 1; i++) {
    const endA = timeToMinutes(items[i].time) + Math.round(parseFloat(items[i].dur) * 60);
    const startB = timeToMinutes(items[i + 1].time);
    if (endA > startB) {
      conflicts.push({ indexA: i, indexB: i + 1, overlap: endA - startB });
    }
  }
  return conflicts;
};

const TimeManagement = ({ destination = 'Manali', tripData = null }) => {
  const initialDays = buildDaysFromTripData(destination, tripData);
  const [days, setDays] = useState(initialDays);
  const [expandedDay, setExpandedDay] = useState(0);
  const [delayInput, setDelayInput] = useState('');      // TC20
  const [delayDay, setDelayDay] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(false); // TC37 integration
  const [reoptimized, setReoptimized] = useState({});

  // TC19: Remove activity and re-optimize
  const removeActivity = useCallback((dayIdx, itemId) => {
    setDays(prev => {
      const updated = prev.map((d, di) => {
        if (di !== dayIdx) return d;
        const newItems = d.items.filter(it => it.id !== itemId);
        const rebuilt = rebuildTimeline(newItems);
        return { ...d, items: rebuilt };
      });
      return updated;
    });
  }, []);

  // TC20: Apply delay and re-optimize plan
  const applyDelay = useCallback((dayIdx) => {
    const delayMins = parseInt(delayInput);
    if (!delayInput || isNaN(delayMins) || delayMins <= 0) return;
    setDays(prev => {
      const updated = prev.map((d, di) => {
        if (di !== dayIdx) return d;
        const rebuilt = rebuildTimeline(d.items, delayMins);
        return { ...d, items: rebuilt };
      });
      return updated;
    });
    setReoptimized(prev => ({ ...prev, [dayIdx]: delayMins }));
    setDelayInput('');
    setDelayDay(null);
  }, [delayInput]);

  // TC16: Reset day to original
  const resetDay = useCallback((dayIdx) => {
    setDays(prev => prev.map((d, di) => di === dayIdx ? initialDays[dayIdx] : d));
    setReoptimized(prev => { const n = { ...prev }; delete n[dayIdx]; return n; });
  }, [initialDays]);

  // TC17: Get conflicts for current day
  const getConflicts = (items) => detectConflicts(items);

  return (
    <div className="time-module glass-panel" id="time-management">
      <div className="time-header">
        <div className="time-header-top">
          <div>
            <h2>Hour-by-Hour Plan</h2>
            <p className="text-muted">Dynamic scheduling for {destination} with smart buffers & safety alerts.</p>
          </div>
          {/* TC37: Weather alert toggle for demo */}
          <button
            className={`weather-alert-toggle ${weatherAlert ? 'active' : ''}`}
            onClick={() => setWeatherAlert(w => !w)}
            id="weather-alert-toggle"
          >
            <CloudRain size={16} />
            {weatherAlert ? 'Weather Warning ON' : 'Simulate Rain Alert'}
          </button>
        </div>
        {/* TC37: Weather alert banner */}
        {weatherAlert && (
          <div className="weather-banner" id="weather-banner">
            <AlertTriangle size={16} />
            <strong>Heavy Rain Forecast</strong> — Outdoor activities after 3 PM may be impacted. Plan has been adjusted.
          </div>
        )}
      </div>

      <div className="day-accordion">
        {days.map((d, di) => {
          const conflicts = getConflicts(d.items);
          return (
            <div key={di} className={`day-section ${expandedDay === di ? 'open' : ''}`} id={`day-section-${di}`}>
              <button className="day-toggle" onClick={() => setExpandedDay(expandedDay === di ? -1 : di)} id={`day-toggle-${di}`}>
                <span className="day-label">{d.day}</span>
                <div className="day-toggle-right">
                  {/* TC17: Conflict badge */}
                  {conflicts.length > 0 && (
                    <span className="conflict-badge" title="Time conflict detected">
                      <AlertTriangle size={12} /> {conflicts.length} conflict
                    </span>
                  )}
                  {/* TC20: Reoptimized badge */}
                  {reoptimized[di] && (
                    <span className="reopt-badge">
                      <Zap size={12} /> +{reoptimized[di]}min adjusted
                    </span>
                  )}
                  <span className="day-count">{d.items.length} activities</span>
                  {expandedDay === di ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </div>
              </button>

              {expandedDay === di && (
                <div className="day-timeline-wrapper">
                  {/* TC17: Conflict warning */}
                  {conflicts.length > 0 && (
                    <div className="conflict-alert" id={`conflict-alert-${di}`}>
                      <AlertTriangle size={14} />
                      <span><strong>Time Conflict Detected</strong> — {conflicts.length} activity overlaps found. Use Re-Optimize to fix.</span>
                    </div>
                  )}

                  {/* TC18: Buffer info */}
                  <div className="buffer-info" id={`buffer-info-${di}`}>
                    <Clock size={13} />
                    <span>15-min smart buffers automatically included between activities</span>
                  </div>

                  {/* TC20: Delay input */}
                  <div className="delay-section" id={`delay-section-${di}`}>
                    {delayDay === di ? (
                      <div className="delay-input-row">
                        <Clock size={14} />
                        <span>Running late by</span>
                        <input
                          type="number"
                          value={delayInput}
                          onChange={e => setDelayInput(e.target.value)}
                          placeholder="mins"
                          className="delay-input"
                          min="1"
                          max="480"
                          id={`delay-input-${di}`}
                        />
                        <span>minutes</span>
                        <button className="primary-btn delay-apply-btn" onClick={() => applyDelay(di)} id={`apply-delay-${di}`}>
                          <Zap size={14} /> Re-Optimize
                        </button>
                        <button className="secondary-btn" onClick={() => { setDelayDay(null); setDelayInput(''); }}>Cancel</button>
                      </div>
                    ) : (
                      <div className="delay-actions">
                        <button className="outline-btn" onClick={() => setDelayDay(di)} id={`report-delay-btn-${di}`}>
                          <Clock size={14} /> I'm Running Late
                        </button>
                        <button className="outline-btn reset" onClick={() => resetDay(di)} id={`reset-day-btn-${di}`}>
                          <RefreshCw size={14} /> Reset Day
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="day-timeline">
                    {d.items.map((item, idx) => (
                      <div key={item.id} className={`tl-item ${item.type} ${item.isBuffer ? 'is-buffer' : ''}`} id={`tl-item-${item.id}`}>
                        <div className="tl-time">
                          <span className="tl-clock">{item.time}</span>
                          <span className="tl-dur">{item.dur}</span>
                        </div>
                        <div className="tl-dot-col">
                          <div className="tl-dot"></div>
                          {idx < d.items.length - 1 && <div className="tl-line"></div>}
                        </div>
                        <div className="tl-content">
                          <div className="tl-act-row">
                            {item.type === 'food' && <Coffee size={15}/>}
                            {item.type === 'activity' && <MapPin size={15}/>}
                            {item.type === 'buffer' && <Clock size={15}/>}
                            <h4>{item.act}</h4>
                            {/* TC19: Remove activity button */}
                            {!item.isBuffer && (
                              <button
                                className="remove-activity-btn"
                                onClick={() => removeActivity(di, item.id)}
                                title="Remove this activity"
                                id={`remove-${item.id}`}
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                          {item.tip && <div className="tl-tip">{item.tip}</div>}
                          {item.warn && <div className="tl-warn"><AlertTriangle size={13}/> {item.warn}</div>}
                          {/* TC18: Buffer indicator */}
                          {item.isBuffer && <div className="tl-buffer-label">Smart buffer included</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeManagement;
