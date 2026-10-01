// Daily-plan editing does not change or consume the spin allowance.
const planMetaKey = 'daywheel-plan-meta-v1';
let planMeta = {};
try {
  const saved = JSON.parse(localStorage.getItem(planMetaKey));
  if (saved && typeof saved === 'object') {
    for (let h = 0; h < 24; h++) {
      const item = saved[h];
      if (item && typeof item === 'object') planMeta[h] = {
        date: validPlanDate(item.date) ? item.date : todayPlanDate(),
        duration: [15,30,45,60,90,120].includes(item.duration) ? item.duration : 60,
        done: item.done === true
      };
    }
  }
} catch {}
function todayPlanDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function validPlanDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y,m,d] = value.split('-').map(Number), check = new Date(y,m-1,d);
  return y >= 2000 && y <= 2100 && check.getFullYear() === y && check.getMonth() === m-1 && check.getDate() === d;
}
function savePlanMeta() {
  try { localStorage.setItem(planMetaKey,JSON.stringify(planMeta)); }
  catch { $('plan-status').textContent = 'Browser storage is unavailable. Plan changes last for this visit.'; }
}
function getPlanMeta(h) {
  return planMeta[h] || (planMeta[h] = { date: todayPlanDate(), duration:60, done:false });
}
function calendarLink(title, day, h, duration) {
  if (!validPlanDate(day) || !Number.isInteger(+h) || +h<0 || +h>23 || ![15,30,45,60,90,120].includes(duration)) throw Error('Check the event date, hour, and duration.');
  const [y,m,d] = day.split('-').map(Number), start = new Date(y,m-1,d,+h);
  if (start.getHours() !== +h) throw Error('That hour is skipped by daylight saving time. Choose another hour.');
  const end = new Date(start.getTime()+duration*60000);
  const stamp = date => date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const params = new URLSearchParams({action:'TEMPLATE',text:title,dates:`${stamp(start)}/${stamp(end)}`,details:'Planned with Daywheel',stz:zone,etz:zone});
  return 'https://calendar.google.com/calendar/r/eventedit?'+params;
}
function planElement(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent=text;
  if (className) el.className=className;
  return el;
}
function renderPlan() {
  const entries=Object.entries(state.picks).sort((a,b)=>Number(a[0])-Number(b[0]));
  $('planned-count').textContent=`${entries.length} planned · ${entries.filter(([h])=>getPlanMeta(h).done).length} complete`;
  $('timeline').replaceChildren();
  if (!entries.length) $('timeline').append(planElement('p','Your picks will appear here as you spin.','empty'));
  entries.forEach(([h,title])=>{
    const meta=getPlanMeta(h), card=planElement('article',undefined,'pick plan-card');
    const heading=planElement('h3',title); if(meta.done) heading.classList.add('completed');
    card.append(planElement('small',`${meta.date} · ${time(+h)} · ${meta.duration} min`),heading);
    const actions=planElement('div',undefined,'plan-actions');
    const complete=planElement('button',meta.done?'✓ Completed':'Mark complete');
    complete.type='button'; complete.setAttribute('aria-pressed',String(meta.done));
    complete.setAttribute('aria-label',`${meta.done?'Mark incomplete':'Complete'}: ${title}`);
    complete.onclick=()=>{if(spinning)return;meta.done=!meta.done;savePlanMeta();renderDay();$('plan-status').textContent=meta.done?'Activity completed.':'Activity marked incomplete.';};
    const edit=planElement('button','Edit');edit.type='button';edit.setAttribute('aria-label','Edit '+title);
    edit.onclick=()=>{if(!spinning)openPlanEditor(h)};
    const remove=planElement('button','Remove');remove.type='button';remove.setAttribute('aria-label','Remove from plan: '+title);
    remove.onclick=()=>{if(spinning)return;delete state.picks[h];delete planMeta[h];save();savePlanMeta();render();$('plan-status').textContent='Activity removed from your plan.';};
    const calendar=planElement('button','Add to Google Calendar');calendar.type='button';calendar.className='calendar-button';
    calendar.onclick=()=>{if(!spinning)openPlanEditor(h,true)};
    actions.append(complete,edit,remove,calendar);card.append(actions);$('timeline').append(card);
  });
  savePlanMeta();
}
let editingPlanHour=null;
function openPlanEditor(h, forCalendar=false) {
  editingPlanHour=String(h);const meta=getPlanMeta(h);
  $('plan-name').value=state.picks[h];$('plan-hour').value=h;$('plan-date').value=meta.date;$('plan-duration').value=meta.duration;
  $('plan-error').textContent='';$('plan-dialog-title').textContent=forCalendar?'Plan your calendar event':'Edit your activity';
  $('plan-zone').textContent='Times use your device timezone: '+Intl.DateTimeFormat().resolvedOptions().timeZone+'.';
  $('plan-dialog').showModal();$('plan-name').focus();
}
function savePlanEditor() {
  if (!$('plan-form').reportValidity()) return false;
  const old=editingPlanHour, next=$('plan-hour').value, title=$('plan-name').value.trim(), day=$('plan-date').value, duration=Number($('plan-duration').value);
  if(!title){$('plan-error').textContent='Enter an activity name.';return false;}
  if(next!==old && Object.hasOwn(state.picks,next)){$('plan-error').textContent='That hour already has an activity. Choose an empty hour, or remove its activity first.';return false;}
  try { calendarLink(title,day,next,duration); } catch(error){$('plan-error').textContent=error.message;return false;}
  const done=getPlanMeta(old).done;delete state.picks[old];delete planMeta[old];
  state.picks[next]=title;planMeta[next]={date:day,duration,done};editingPlanHour=next;save();savePlanMeta();render();
  $('plan-status').textContent='Plan saved. Your spin allowance is unchanged.';return true;
}
function initPlanEditor() {
  for(let h=0;h<24;h++){const option=planElement('option',time(h));option.value=h;$('plan-hour').append(option)}
  $('plan-form').onsubmit=e=>{e.preventDefault();if(savePlanEditor())$('plan-dialog').close()};
  $('plan-cancel').onclick=()=>$('plan-dialog').close();
  $('plan-calendar').onclick=()=>{
    if(!savePlanEditor())return;
    const h=editingPlanHour,meta=getPlanMeta(h);
    window.open(calendarLink(state.picks[h],meta.date,+h,meta.duration),'_blank','noopener,noreferrer');
    $('plan-error').textContent='Review and save in Google Calendar. If no tab opened, allow pop-ups and try again. Opening it again can create a duplicate event.';
  };
  $('plan-dialog').addEventListener('close',()=>$('plan-heading').focus());
}
