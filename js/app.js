
const {useState,useEffect,useRef,useCallback,useMemo}=React;
const STORAGE_KEY='finwise_v4';

const TIPS_AR=['"أفضل وقت للادخار كان بالأمس. ثاني أفضل وقت هو الآن."','"لا تدخر ما تبقى بعد الإنفاق — أنفق ما تبقى بعد الادخار."','"حريتك المالية تبدأ بقرار واحد: ادخار جنيه واحد اليوم."'];

const T={
  en:{
    logo:'FinWise',logoSub:'Wise',
    nav:{home:'Home',tracker:'Tracker',history:'History',plan:'Plan',goals:'Goals',converter:'Converter',recurring:'Recurring',learn:'Learn'},
    home:{eyebrow:'Financial Literacy for Young People',h1a:'Take control of your',h1b:'money',h1c:'— before it controls you.',sub:'Track every pound, build smart budgets, get personalized advice. Built for young people.',stat1:'73%',stat1l:'Youth have no budget',stat2:'2 min',stat2l:'To set up your plan',stat3:'100%',stat3l:'Free & private',addExp:'Add expense',viewPlan:'View my plan',income:'Monthly income',spent:'This month spent',remaining:'Remaining',savingsRate:'Savings rate',target:'Target: 20%+',overBudget:'Over budget!',available:'Available',setFirst:'Set income in plan',recentExp:'Recent Expenses',noRecent:'No expenses yet 👀',noRecentSub:'Add your first expense to start tracking.',quickAdd:'Quick Add'},
    tracker:{title:'Daily Expense Tracker',sub:'Log your spending — every pound counts.',todaySpend:"Today's spending",transactions:'transactions',dailyBudget:'Daily budget',basedOn:'Based on your plan',vsbudget:'Status',onTrack:'On Track ✓',over:'Over Budget',setIncome:'Set income first',addNew:'Add New Expense',amount:'Amount (EGP)',date:'Date',note:'Note (optional)',notePlaceholder:'e.g. Lunch at work',category:'Category',addBtn:'Add Expense',todayTx:"Today's Transactions",noTodayExp:"No expenses today 🎉",noTodayExpSub:"You haven't spent anything today. Great job!",missingFields:'Please enter amount and category.',invalidAmt:'Please enter a valid amount.',budgetAlert:"🚨 You've exceeded 80% of your monthly income!",budgetWarn:"⚠️ You're approaching your spending limit.",added:'Expense added',inCat:'in',calculator:'Quick Calculator',useResult:'Use this amount'},
    history:{title:'Transaction History',sub:'All your expenses in one place.',monthly:'Month-by-Month Comparison',catBreak:'Category Breakdown',allMonths:'All months',allCats:'All categories',total:'Total',date:'Date',category:'Category',note:'Note',amount:'Amount',noData:'No data yet — add expenses to see the chart',noTx:'No transactions to show',noTxFound:"No transactions found 🔍",noTxFoundSub:"Try changing your filters.",exportPDF:'Export PDF',exportExcel:'Export Excel',exportTitle:'Monthly Report'},
    plan:{title:'My Financial Plan',sub:'Your personalized budget and roadmap.',incomeSetup:'Monthly Income Setup',netIncome:'Net monthly income (EGP)',savePlan:'Save Plan',savedBtn:'Saved!',livingExp:'Living expenses',monthlySav:'Monthly savings',investments:'Investments',healthScore:'Health Score',great:'Great shape! 🎉',room:'Room to improve',needs:'Needs attention ⚠️',basedOn:'Based on your income and spending this month.',budgetVsActual:'Budget vs Actual',needsLabel:'Needs',savLabel:'Savings',advice:'Personalized Advice'},
    goals:{title:'My Financial Goals',sub:'Set targets and track your progress.',addGoal:'Add New Goal',goalName:'Goal name',targetAmt:'Target amount',savedSoFar:'Amount saved so far',addBtn:'Add Goal',noGoals:'No goals set yet 🎯',noGoalsSub:'Set your first financial goal above and start tracking progress!',months:'months away',reached:'Goal Reached! 🎉',away:'remaining',addSavings:'Add Savings',progress:'Progress'},
    converter:{title:'Currency Converter',sub:'Live rates updated daily — powered by ExchangeRate-API.',amount:'Amount',from:'From',to:'To',fetchingRates:'Fetching live rates...',rateError:'Using fallback rates (offline mode).',allRates:'Live Exchange Rates (base: USD)',currency:'Currency',rate:'1 USD =',swap:'Swap',lastUpdate:'Updated'},
    recurring:{title:'Recurring Expenses',sub:'Fixed monthly bills — added automatically each month.',addNew:'Add Recurring Expense',name:'Name',amount:'Amount (EGP)',category:'Category',dueDay:'Due day of month',addBtn:'Add',noRecurring:'No recurring expenses yet 📋',noRecurringSub:'Add your fixed monthly bills like rent, internet, and subscriptions.',totalMonthly:'Total monthly',upcoming:'Upcoming this week',upcomingNone:'All clear this week ✓'},
    learn:{title:'Financial Education',sub:'Short, practical articles to build your financial knowledge.',search:'Search articles...'},
    cats:{food:'Food & Groceries',transport:'Transport',entertainment:'Entertainment',dining:'Eating Out',bills:'Bills & Utilities',health:'Health',clothing:'Clothing',education:'Education',rent:'Rent',subscriptions:'Subscriptions',personal:'Personal Care',savings:'Savings',investment:'Investment',other:'Other'},
  },
  ar:{
    logo:'فين',logoSub:'وايز',
    nav:{home:'الرئيسية',tracker:'المصاريف',history:'السجل',plan:'خطتي',goals:'أهدافي',converter:'محوّل',recurring:'الثابتة',learn:'تعلّم'},
    home:{eyebrow:'الوعي المالي للشباب',h1a:'تحكم في',h1b:'فلوسك',h1c:'— قبل ما تتحكم فيك.',sub:'تتبع كل جنيه، ابن ميزانية ذكية، واحصل على نصائح مخصصة. مصمم للشباب.',stat1:'٧٣٪',stat1l:'الشباب بلا ميزانية',stat2:'٢ دقيقة',stat2l:'لإعداد خطتك',stat3:'١٠٠٪',stat3l:'مجاني وخاص',addExp:'أضف مصروف',viewPlan:'شوف خطتي',income:'الدخل الشهري',spent:'مصاريف الشهر',remaining:'المتبقي',savingsRate:'نسبة الادخار',target:'الهدف: ٢٠٪+',overBudget:'تجاوزت الميزانية!',available:'متاح',setFirst:'حدد دخلك في الخطة',recentExp:'آخر المصاريف',noRecent:'لا مصاريف بعد 👀',noRecentSub:'أضف أول مصروف لتبدأ التتبع.',quickAdd:'إضافة سريعة'},
    tracker:{title:'تتبع المصاريف اليومية',sub:'سجّل مصاريفك — كل جنيه يحسب.',todaySpend:'مصاريف اليوم',transactions:'معاملات',dailyBudget:'الميزانية اليومية',basedOn:'بناءً على خطتك',vsbudget:'الحالة',onTrack:'في المسار ✓',over:'تجاوزت الميزانية',setIncome:'حدد دخلك أولاً',addNew:'إضافة مصروف جديد',amount:'المبلغ (جنيه)',date:'التاريخ',note:'ملاحظة (اختياري)',notePlaceholder:'مثال: غداء في الشغل',category:'الفئة',addBtn:'إضافة المصروف',todayTx:'معاملات اليوم',noTodayExp:'لا مصاريف اليوم 🎉',noTodayExpSub:'لم تنفق شيئاً اليوم. عمل رائع!',missingFields:'من فضلك أدخل المبلغ والفئة.',invalidAmt:'من فضلك أدخل مبلغاً صحيحاً.',budgetAlert:'🚨 تجاوزت ٨٠٪ من دخلك الشهري!',budgetWarn:'⚠️ أنت قريب من حد الإنفاق.',added:'تم إضافة المصروف',inCat:'في فئة',calculator:'حاسبة سريعة',useResult:'استخدم هذا المبلغ'},
    history:{title:'سجل المعاملات',sub:'كل مصاريفك في مكان واحد.',monthly:'مقارنة شهر بشهر',catBreak:'توزيع الفئات',allMonths:'كل الشهور',allCats:'كل الفئات',total:'الإجمالي',date:'التاريخ',category:'الفئة',note:'ملاحظة',amount:'المبلغ',noData:'لا بيانات بعد — أضف مصاريف لترى الرسم البياني',noTx:'لا توجد معاملات',noTxFound:'لا توجد معاملات مطابقة 🔍',noTxFoundSub:'جرب تغيير الفلاتر.',exportPDF:'تصدير PDF',exportExcel:'تصدير Excel',exportTitle:'تقرير شهري'},
    plan:{title:'خطتي المالية',sub:'ميزانيتك الشخصية وخارطة طريقك.',incomeSetup:'إعداد الدخل الشهري',netIncome:'صافي الدخل الشهري (جنيه)',savePlan:'حفظ الخطة',savedBtn:'تم الحفظ!',livingExp:'مصاريف المعيشة',monthlySav:'الادخار الشهري',investments:'الاستثمارات',healthScore:'درجة الصحة المالية',great:'وضعك ممتاز! 🎉',room:'يمكن تحسينه',needs:'يحتاج انتباه ⚠️',basedOn:'بناءً على دخلك ومصاريفك هذا الشهر.',budgetVsActual:'الميزانية مقابل الفعلي',needsLabel:'الاحتياجات',savLabel:'الادخار',advice:'نصائح مخصصة'},
    goals:{title:'أهدافي المالية',sub:'حدد أهدافك وتابع تقدمك.',addGoal:'إضافة هدف جديد',goalName:'اسم الهدف',targetAmt:'المبلغ المستهدف',savedSoFar:'المدخر حتى الآن',addBtn:'إضافة الهدف',noGoals:'لا أهداف بعد 🎯',noGoalsSub:'أضف هدفك المالي الأول وابدأ تتبع تقدمك!',months:'شهر متبقي',reached:'تحقق الهدف! 🎉',away:'متبقي',addSavings:'إضافة مدخرات',progress:'التقدم'},
    converter:{title:'محوّل العملات',sub:'أسعار لحظية تتحدث يومياً — مدعوم من ExchangeRate-API.',amount:'المبلغ',from:'من',to:'إلى',fetchingRates:'جلب الأسعار اللحظية...',rateError:'نستخدم أسعاراً احتياطية (وضع بدون إنترنت).',allRates:'أسعار الصرف اللحظية (أساس: دولار)',currency:'العملة',rate:'١ دولار =',swap:'عكس',lastUpdate:'آخر تحديث'},
    recurring:{title:'المصاريف الثابتة الشهرية',sub:'فواتير ثابتة تُضاف تلقائياً كل شهر.',addNew:'إضافة مصروف ثابت',name:'الاسم',amount:'المبلغ (جنيه)',category:'الفئة',dueDay:'يوم الاستحقاق',addBtn:'إضافة',noRecurring:'لا مصاريف ثابتة بعد 📋',noRecurringSub:'أضف فواتيرك الثابتة كالإيجار والإنترنت والاشتراكات.',totalMonthly:'الإجمالي الشهري',upcoming:'المستحقة هذا الأسبوع',upcomingNone:'لا مستحقات هذا الأسبوع ✓'},
    learn:{title:'التعليم المالي',sub:'مقالات قصيرة وعملية لبناء وعيك المالي.',search:'ابحث عن مقالات...'},
    cats:{food:'طعام وبقالة',transport:'مواصلات',entertainment:'ترفيه',dining:'أكل خارج',bills:'فواتير',health:'صحة',clothing:'ملابس',education:'تعليم',rent:'إيجار',subscriptions:'اشتراكات',personal:'عناية شخصية',savings:'تحويل مدخرات',investment:'استثمار',other:'أخرى'},
  }
};

const EXPENSE_CATS=[
  {id:'food',icon:'🍽️',color:'#b8f050'},{id:'transport',icon:'🚌',color:'#50c8f0'},
  {id:'entertainment',icon:'🎬',color:'#f09050'},{id:'dining',icon:'☕',color:'#f05080'},
  {id:'bills',icon:'💡',color:'#c050f0'},{id:'health',icon:'💊',color:'#50d090'},
  {id:'clothing',icon:'👗',color:'#f0c050'},{id:'education',icon:'📚',color:'#50a0f0'},
  {id:'rent',icon:'🏠',color:'#f08050'},{id:'subscriptions',icon:'📺',color:'#80c0f0'},
  {id:'personal',icon:'💄',color:'#f060c0'},{id:'savings',icon:'🏦',color:'#60d0b0'},
  {id:'investment',icon:'📈',color:'#60d050'},{id:'other',icon:'📦',color:'#909090'},
];

const CURRENCIES=[
  {code:'EGP',flag:'🇪🇬',name:'Egyptian Pound',nameAr:'جنيه مصري'},
  {code:'USD',flag:'🇺🇸',name:'US Dollar',nameAr:'دولار أمريكي'},
  {code:'EUR',flag:'🇪🇺',name:'Euro',nameAr:'يورو'},
  {code:'SAR',flag:'🇸🇦',name:'Saudi Riyal',nameAr:'ريال سعودي'},
  {code:'ILS',flag:'🇮🇱',name:'Israeli Shekel',nameAr:'شيكل إسرائيلي'},
];

// Fallback rates base USD
const FALLBACK_RATES_USD={EGP:53.8,EUR:0.92,SAR:3.75,ILS:3.67,USD:1};

const ARTICLES=[
  {id:1,icon:'💡',bg:'#1a2010',catColor:'#b8f050',category:'Budgeting',categoryAr:'الميزانية',title:'The 50/30/20 Rule — Adapted for Young Earners',titleAr:'قاعدة ٥٠/٣٠/٢٠ للشباب',desc:'Smart income splitting for young earners.',descAr:'تقسيم ذكي للدخل للشباب.',readTime:'4 min',readTimeAr:'٤ دقائق',
   content:[{type:'p',text:'With rising costs today, adapt the rule to 60% needs, 20% wants, 20% savings. Pay yourself first — transfer savings the moment your salary arrives.',textAr:'مع ارتفاع تكاليف المعيشة، عدّل القاعدة إلى: ٦٠٪ احتياجات، ٢٠٪ رغبات، ٢٠٪ ادخار. ادفع لنفسك أولاً — حوّل مدخراتك فور وصول الراتب.'},{type:'h4',text:'Why This Works',textAr:'لماذا ينجح هذا'},{type:'p',text:'By automating savings first, you never "forget" to save. You adjust your lifestyle to what remains, not the other way around.',textAr:'بأتمتة الادخار أولاً، لن "تنسى" أبداً أن تدخر. تتكيف مع ما يتبقى، وليس العكس.'}]},
  {id:2,icon:'📈',bg:'#101828',catColor:'#50c8f0',category:'Investing',categoryAr:'الاستثمار',title:'Where to Invest as a Young Person',titleAr:'أين تستثمر كشاب',desc:'Certificates, gold, stocks — a beginner\'s guide.',descAr:'شهادات، ذهب، أسهم — دليل المبتدئين.',readTime:'6 min',readTimeAr:'٦ دقائق',
   content:[{type:'h4',text:'Bank Certificates (Safest)',textAr:'شهادات البنوك (الأأمن)'},{type:'p',text:'Many banks offer high-yield savings certificates. Check your local bank for current rates.',textAr:'تقدم كثير من البنوك شهادات ادخار بعوائد مرتفعة. راجع بنكك المحلي للاطلاع على أحدث الأسعار.'},{type:'h4',text:'Gold',textAr:'الذهب'},{type:'p',text:'A strong store of value especially during currency fluctuations. Start with small gram quantities.',textAr:'مخزن قيمة قوي خاصة أثناء تقلبات العملة. ابدأ بكميات صغيرة بالغرام.'}]},
  {id:3,icon:'🚨',bg:'#1a1010',catColor:'#f09050',category:'Emergency Fund',categoryAr:'صندوق الطوارئ',title:'Why You Need an Emergency Fund Now',titleAr:'لماذا تحتاج صندوق طوارئ الآن',desc:'One expense can destroy months of saving.',descAr:'مصروف واحد يمكنه تدمير شهور من الادخار.',readTime:'3 min',readTimeAr:'٣ دقائق',
   content:[{type:'p',text:'Target 3-6 months of expenses. Keep it liquid, separate, and never invest it in stocks.',textAr:'استهدف ٣–٦ أشهر من مصاريفك. احتفظ به سائلاً، منفصلاً، ولا تستثمره في الأسهم.'},{type:'h4',text:'Where to Keep It',textAr:'أين تحتفظ به'},{type:'p',text:'A separate savings account in a different bank makes it harder to dip into casually.',textAr:'حساب توفير منفصل في بنك مختلف يجعل الوصول إليه أصعب بشكل غير رسمي.'}]},
  {id:4,icon:'💳',bg:'#101a18',catColor:'#50d090',category:'Debt',categoryAr:'الديون',title:'Getting Out of Debt — A Practical Guide',titleAr:'الخروج من الديون — دليل عملي',desc:'Pay off debt faster without sacrificing life.',descAr:'سدّد الديون أسرع دون التضحية بحياتك.',readTime:'5 min',readTimeAr:'٥ دقائق',
   content:[{type:'h4',text:'Avalanche vs Snowball',textAr:'الانهيار الجليدي مقابل كرة الثلج'},{type:'p',text:'Avalanche: attack highest interest first — saves the most money. Snowball: pay smallest balance first — best for motivation.',textAr:'الانهيار الجليدي: اهجم على أعلى فائدة أولاً — يوفر أكثر مالاً. كرة الثلج: اسدد أصغر رصيد أولاً — أفضل للتحفيز.'},{type:'p',text:'Pick whichever you can stick to consistently.',textAr:'اختر الذي يمكنك الالتزام به باستمرار.'}]},
  {id:5,icon:'🎯',bg:'#181018',catColor:'#c050f0',category:'Goals',categoryAr:'الأهداف',title:'Setting Financial Goals That Actually Work',titleAr:'تحديد أهداف مالية تنجح فعلاً',desc:'Most goals fail because they\'re vague.',descAr:'معظم الأهداف تفشل لأنها مبهمة.',readTime:'4 min',readTimeAr:'٤ دقائق',
   content:[{type:'p',text:'"Save EGP 500/month for 12 months to build a EGP 6,000 emergency fund by December 2025." That is a goal. "Save money" is a wish.',textAr:'"ادخر ٥٠٠ جنيه شهرياً لمدة ١٢ شهراً لبناء صندوق طوارئ ٦٠٠٠ جنيه بحلول ديسمبر ٢٠٢٥." هذا هدف. "ادخر فلوس" هذه أمنية.'},{type:'h4',text:'Review Monthly',textAr:'راجع شهرياً'},{type:'p',text:'10 minutes each month reviewing your goals keeps you on track and lets you adjust to life changes.',textAr:'١٠ دقائق كل شهر لمراجعة أهدافك تبقيك في المسار وتتيح لك التكيف مع تغييرات الحياة.'}]},
  {id:6,icon:'🧮',bg:'#101818',catColor:'#50d0b0',category:'Basics',categoryAr:'الأساسيات',title:'Financial Literacy 101',titleAr:'أساسيات الوعي المالي',desc:'Net worth, inflation, compound interest explained.',descAr:'صافي الثروة، التضخم، الفائدة المركبة بالبساطة.',readTime:'7 min',readTimeAr:'٧ دقائق',
   content:[{type:'h4',text:'Compound Interest',textAr:'الفائدة المركبة'},{type:'p',text:'EGP 1,000 at 25% annually becomes EGP 9,313 in 10 years. The earlier you start, the more powerful this becomes.',textAr:'١٠٠٠ جنيه بفائدة ٢٥٪ سنوياً تصبح ٩٣١٣ جنيه في ١٠ سنوات. كلما بدأت مبكراً، كان أقوى.'},{type:'h4',text:'Inflation',textAr:'التضخم'},{type:'p',text:'If inflation is 30% and your savings earn 10%, you lose 20% in real purchasing power each year.',textAr:'إذا كان التضخم ٣٠٪ وادخارك يربح ١٠٪، فأنت تخسر ٢٠٪ من قوتك الشرائية الحقيقية سنوياً.'}]},
];

function fmtEGP(n){return 'EGP '+Math.round(n).toLocaleString();}
function getMonthKey(d){return d.toISOString().slice(0,7);}
function loadData(){try{const r=localStorage.getItem(STORAGE_KEY);if(r)return JSON.parse(r);}catch(e){}return{income:0,expenses:[],goals:[],recurring:[],ratesCache:null,ratesCacheDate:null,onboardingDone:false};}
function saveData(d){localStorage.setItem(STORAGE_KEY,JSON.stringify(d));}

// ── TOAST ────────────────────────────────────────────
function ToastContainer({toasts}){
  return <div className="toast-container-fw">{toasts.map(t=>(
    <div key={t.id} className="toast-fw">
      <span style={{fontSize:18}}>{t.icon}</span>
      <div><div style={{fontWeight:600,fontSize:13,color:'var(--text)'}}>{t.title}</div>{t.msg&&<div style={{color:'var(--text2)',fontSize:12}}>{t.msg}</div>}</div>
    </div>
  ))}</div>;
}

// ── MINI CALCULATOR ──────────────────────────────────
function MiniCalc({onUse,lang}){
  const [display,setDisplay]=useState('0');
  const [expr,setExpr]=useState('');
  const [flashing,setFlashing]=useState(false);
  const [key,setKey]=useState(0); // force re-mount for animation
  const t=T[lang].tracker;

  function press(v){
    if(v==='C'){setDisplay('0');setExpr('');return;}
    if(v==='='){
      try{
        const res=Function('"use strict";return('+expr+')')();
        const rounded=Math.round(res*100)/100;
        setDisplay(String(rounded));setExpr(String(rounded));
        setFlashing(true);
        setTimeout(()=>setFlashing(false),400);
      }catch{setDisplay('Err');setExpr('');}
      return;
    }
    if(v==='⌫'){
      const ne=expr.slice(0,-1)||'0';
      setExpr(ne==='0'?'':ne);setDisplay(ne||'0');return;
    }
    const ne=expr===''&&(v==='+'||v==='-'||v==='×'||v==='÷')?v:(expr+(v==='×'?'*':v==='÷'?'/':v));
    setExpr(ne);setDisplay(ne);
  }

  const btns=[['7','8','9','÷'],['4','5','6','×'],['1','2','3','-'],['0','.','⌫','+'],['C','','','=']];
  const allBtns=btns.flat();

  return(
    <div className="calc-wrap">
      <div style={{fontSize:11,color:'var(--text3)',marginBottom:8,fontWeight:600,textTransform:'uppercase',letterSpacing:1,display:'flex',alignItems:'center',gap:6}}>
        <i className="bi bi-calculator" style={{color:'var(--accent)'}}></i>
        {t.calculator}
      </div>
      <div className={`calc-display ${flashing?'result-flash':''}`}>
        {display}
      </div>
      <div className="calc-grid">
        {allBtns.map((b,i)=>{
          if(b==='')return <div key={i}></div>;
          const cls=b==='='?'calc-eq':b==='C'?'calc-clr':(b==='+'||b==='-'||b==='×'||b==='÷'||b==='⌫')?'calc-op':'calc-num';
          const delay=(Math.floor(i/4)*0.04 + (i%4)*0.02).toFixed(2);
          return(
            <button key={i}
              className={`calc-btn ${cls} calc-btn-stagger`}
              style={{animationDelay:`${delay}s`}}
              onClick={()=>press(b)}>
              {b}
            </button>
          );
        })}
      </div>
      {display!=='0'&&display!=='Err'&&parseFloat(display)>0&&(
        <button className="calc-use" onClick={()=>onUse(display)}>
          ✓ {t.useResult}: <strong>EGP {display}</strong>
        </button>
      )}
    </div>
  );
}

// ── QUICK ADD POPUP ──────────────────────────────────
function QuickAddPopup({onClose,data,setData,addToast,lang}){
  const t=T[lang];
  const [amount,setAmount]=useState('');
  const [category,setCategory]=useState('food');
  const [note,setNote]=useState('');
  const [showCalc,setShowCalc]=useState(false);
  function submit(){
    const amt=parseFloat(amount);
    if(!amt||amt<=0){addToast('⚠️',t.tracker.invalidAmt,'');return;}
    const today=new Date().toISOString().slice(0,10);
    const newExp={id:Date.now(),amount:amt,category,note,date:today};
    const nd={...data,expenses:[newExp,...(data.expenses||[])]};
    setData(nd);saveData(nd);
    const cat=EXPENSE_CATS.find(c=>c.id===category);
    addToast('✅',t.tracker.added,`${fmtEGP(amt)} — ${cat?.icon} ${t.cats[category]}`);
    onClose();
  }
  return(
    <div className="popup-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="popup-box">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <div className="popup-title">⚡ {t.home.quickAdd}</div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'var(--text2)',cursor:'pointer',fontSize:20}}><i className="bi bi-x-lg"></i></button>
        </div>
        {showCalc&&<MiniCalc lang={lang} onUse={v=>{setAmount(v);setShowCalc(false);}}/>}
        <div style={{marginBottom:12}}>
          <label className="fw-label">{t.tracker.amount}</label>
          <div style={{display:'flex',gap:8}}>
            <div className="input-prefix" style={{flex:1}}><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} autoFocus min="0"/>
            </div>
            <button className="icon-btn" onClick={()=>setShowCalc(s=>!s)} title="Calculator" style={{flexShrink:0}}>
              <i className="bi bi-calculator"></i>
            </button>
          </div>
        </div>
        <div style={{marginBottom:12}}>
          <label className="fw-label">{t.tracker.note}</label>
          <input className="fw-input" placeholder={t.tracker.notePlaceholder} value={note} onChange={e=>setNote(e.target.value)}/>
        </div>
        <div style={{marginBottom:16}}>
          <label className="fw-label">{t.tracker.category}</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:5}}>
            {EXPENSE_CATS.slice(0,8).map(c=>(
              <button key={c.id} className={`cat-chip ${category===c.id?'selected':''}`}
                onClick={()=>setCategory(c.id)}
                style={category===c.id?{borderColor:c.color,color:c.color,background:c.color+'18'}:{}}>
                {c.icon} {t.cats[c.id]}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-fw" style={{flex:1}} onClick={submit}><i className="bi bi-plus-circle"></i>{t.tracker.addBtn}</button>
          <button className="btn-fw-outline" onClick={onClose}>{lang==='en'?'Cancel':'إلغاء'}</button>
        </div>
      </div>
    </div>
  );
}


// ── EXPANDING BOTTOM NAV ─────────────────────────────
function ExpandingNav({page,setPage,lang,theme,toggleTheme,toggleLang,alerts,onQuickAdd}){
  const t=T[lang].nav;
  const tabs=[
    {id:'home',icon:'bi-house-fill',label:t.home},
    {id:'tracker',icon:'bi-wallet2',label:t.tracker},
    {id:'history',icon:'bi-clock-history',label:t.history},
    {id:'plan',icon:'bi-bar-chart-line',label:t.plan},
    {id:'goals',icon:'bi-flag-fill',label:t.goals},
    {id:'converter',icon:'bi-currency-exchange',label:t.converter},
    {id:'recurring',icon:'bi-arrow-repeat',label:t.recurring},
    {id:'learn',icon:'bi-book-fill',label:t.learn},
  ];
  return(
    <div className="exp-nav">
      {tabs.map(tb=>(
        <button key={tb.id}
          className={`exp-link ${page===tb.id?'exp-active':''} ${alerts[tb.id]?'has-alert':''}`}
          onClick={()=>setPage(tb.id)}
          title={tb.label}>
          <i className={`bi ${tb.icon} exp-icon`}></i>
          <span className="exp-label">{tb.label}</span>
          <span className="exp-alert"></span>
        </button>
      ))}
      <div className="exp-sep"></div>
      <div className="exp-actions">
        <button className="exp-quick-btn" onClick={onQuickAdd} title="Quick Add">＋</button>
        <button className="exp-action-btn" onClick={toggleLang} title="Language" style={{fontSize:11,fontWeight:700}}>
          {lang==='en'?'ع':'EN'}
        </button>
        <button className="exp-action-btn" onClick={toggleTheme} title="Theme">
          <i className={`bi ${theme==='dark'?'bi-sun':'bi-moon'}`}></i>
        </button>
      </div>
    </div>
  );
}

// ── NAVBAR ───────────────────────────────────────────
function Navbar({page,setPage,theme,toggleTheme,lang,toggleLang,alerts,onQuickAdd}){
  const t=T[lang].nav;
  const tabs=[
    {id:'home',icon:'bi-house',label:t.home},
    {id:'tracker',icon:'bi-wallet2',label:t.tracker},
    {id:'history',icon:'bi-clock-history',label:t.history},
    {id:'plan',icon:'bi-bar-chart-line',label:t.plan},
    {id:'goals',icon:'bi-flag',label:t.goals},
    {id:'converter',icon:'bi-currency-exchange',label:t.converter},
    {id:'recurring',icon:'bi-arrow-repeat',label:t.recurring},
    {id:'learn',icon:'bi-book',label:t.learn},
  ];
  return(
    <nav className="fw-nav">
      <div className="fw-logo" onClick={()=>setPage('home')}>Fin<span>Wise</span></div>
      <div className="nav-tabs-fw">
        {tabs.map(tb=>(
          <button key={tb.id} className={`nav-tab-fw ${page===tb.id?'active':''} ${alerts[tb.id]?'has-alert':''}`} onClick={()=>setPage(tb.id)}>
            <i className={`bi ${tb.icon}`}></i>{tb.label}<span className="badge-dot"></span>
          </button>
        ))}
      </div>
      <div className="nav-right">
        <button className="quick-add-fab" onClick={onQuickAdd} title="Quick Add">＋</button>
        <button className="lang-btn" onClick={toggleLang}>{lang==='en'?'عربي':'EN'}</button>
        <button className="icon-btn" onClick={toggleTheme}><i className={`bi ${theme==='dark'?'bi-sun':'bi-moon'}`}></i></button>
      </div>
    </nav>
  );
}

// ── HOME ─────────────────────────────────────────────
function HomePage({setPage,data,lang,onQuickAdd}){
  const t=T[lang].home;
  const thisMonth=getMonthKey(new Date());
  const monthExp=(data.expenses||[]).filter(e=>e.date.startsWith(thisMonth)).reduce((s,e)=>s+e.amount,0);
  const surplus=data.income-monthExp;
  const savingsRate=data.income>0?(surplus/data.income)*100:0;
  const recentExp=(data.expenses||[]).slice(0,3);
  return(
    <div style={{padding:'32px 24px',maxWidth:920,margin:'0 auto'}}>
      <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:18,padding:'36px',marginBottom:24,position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)',backgroundSize:'40px 40px',opacity:.4,pointerEvents:'none'}}></div>
        <div style={{position:'relative'}}>
          <div className="hero-eyebrow">{t.eyebrow}</div>
          <h1 className="hero-h1">{t.h1a} <span className="accent">{t.h1b}</span><br/>{t.h1c}</h1>
          <p className="hero-sub">{t.sub}</p>
          <div className="hero-stats-row">
            {[[t.stat1,t.stat1l],[t.stat2,t.stat2l],[t.stat3,t.stat3l]].map(([n,l],i)=>(
              <div key={i} className="hero-stat"><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
            ))}
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button className="btn-fw" onClick={onQuickAdd}><i className="bi bi-lightning-charge"></i>{t.quickAdd}</button>
            <button className="btn-fw-outline" onClick={()=>setPage('tracker')}><i className="bi bi-wallet2"></i>{t.addExp}</button>
            <button className="btn-fw-outline" onClick={()=>setPage('plan')}><i className="bi bi-bar-chart-line"></i>{t.viewPlan}</button>
          </div>
        </div>
      </div>

      {data.income>0&&(
        <div className="row g-3 mb-3">
          {[
            {label:t.income,val:fmtEGP(data.income),sub:'',cls:'c-success'},
            {label:t.spent,val:fmtEGP(monthExp),sub:data.income>0?Math.round(monthExp/data.income*100)+'% of income':'',cls:'c-accent3'},
            {label:t.remaining,val:fmtEGP(Math.abs(surplus)),sub:surplus<0?t.overBudget:t.available,cls:surplus<0?'c-danger':'c-accent'},
            {label:t.savingsRate,val:Math.round(savingsRate)+'%',sub:t.target,cls:savingsRate>=20?'c-success':savingsRate>=10?'c-warning':'c-danger'},
          ].map((m,i)=>(
            <div key={i} className="col-md-3 col-6">
              <div className="metric-card">
                <div className="metric-label">{m.label}</div>
                <div className={`metric-val ${m.cls}`}>{m.val}</div>
                <div className="metric-sub">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <div className="fw-card">
            <div className="fw-card-title">{t.recentExp}</div>
            {recentExp.length===0?(
              <div className="empty-state" style={{padding:'24px 0'}}>
                <span className="es-icon">👀</span>
                <div className="es-title">{t.noRecent}</div>
                <div className="es-sub">{t.noRecentSub}</div>
              </div>
            ):(
              recentExp.map(e=>{
                const cat=EXPENSE_CATS.find(c=>c.id===e.category);
                return(
                  <div key={e.id} className="recent-exp-item">
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:34,height:34,borderRadius:8,background:cat?.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>{cat?.icon}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:500}}>{T[lang].cats[e.category]||e.category}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{e.note||e.date}</div>
                      </div>
                    </div>
                    <div style={{fontFamily:'var(--ff-head)',fontWeight:700,color:'var(--accent3)',fontSize:14}}>{fmtEGP(e.amount)}</div>
                  </div>
                );
              })
            )}
            <button className="btn-fw-outline" style={{width:'100%',marginTop:12,justifyContent:'center'}} onClick={()=>setPage('tracker')}>
              <i className="bi bi-plus-circle"></i>{t.addExp}
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-3">
            {[
              {icon:'bi-flag',title:T[lang].nav.goals,desc:lang==='en'?'Track financial goals':'تتبع الأهداف المالية',page:'goals',c:'var(--success)'},
              {icon:'bi-currency-exchange',title:T[lang].nav.converter,desc:lang==='en'?'Live currency rates':'أسعار عملات لحظية',page:'converter',c:'var(--accent2)'},
              {icon:'bi-arrow-repeat',title:T[lang].nav.recurring,desc:lang==='en'?'Fixed monthly bills':'الفواتير الشهرية الثابتة',page:'recurring',c:'var(--accent3)'},
              {icon:'bi-book',title:T[lang].nav.learn,desc:lang==='en'?'Financial education articles':'مقالات تعليمية مالية',page:'learn',c:'var(--accent)'},
            ].map(c=>(
              <div key={c.page} className="col-6">
                <div className="fw-card" style={{cursor:'pointer',padding:'14px 16px',transition:'transform .2s'}}
                  onClick={()=>setPage(c.page)}
                  onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';}}
                  onMouseLeave={e=>{e.currentTarget.style.transform='';}}>
                  <div style={{width:36,height:36,borderRadius:9,background:c.c+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,color:c.c,marginBottom:8}}><i className={`bi ${c.icon}`}></i></div>
                  <div style={{fontFamily:'var(--ff-head)',fontWeight:600,fontSize:13,marginBottom:2}}>{c.title}</div>
                  <div style={{fontSize:12,color:'var(--text2)'}}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SmartInsights data={data} lang={lang}/>
      <div className="motiv-strip">
        <span style={{fontSize:28}}>🔥</span>
        <div>
          <div style={{fontSize:13,fontWeight:600,marginBottom:2}}>{lang==='en'?'Keep building your financial future!':'استمر في بناء مستقبلك المالي!'}</div>
          <div style={{fontSize:12,color:'var(--text2)'}}>
            {lang==='en'?'"A penny saved is a penny earned." — Benjamin Franklin':'"الجنيه المدخر هو جنيه مكتسب." — بنجامين فرانكلين'}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TRACKER ──────────────────────────────────────────
function EditExpenseModal({expense,data,setData,addToast,lang,onClose}){
  const t=T[lang].tracker; const tCats=T[lang].cats;
  const [amount,setAmount]=useState(String(expense.amount));
  const [category,setCategory]=useState(expense.category);
  const [note,setNote]=useState(expense.note||'');
  const [date,setDate]=useState(expense.date);
  // Escape to close
  useEffect(()=>{
    const h=e=>{if(e.key==='Escape')onClose();};
    window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);
  },[]);
  function save(){
    const amt=parseFloat(amount);
    if(!amt||amt<=0||!category){addToast('⚠️',t.invalidAmt,'');return;}
    const updated={...expense,amount:amt,category,note,date};
    const nd={...data,expenses:data.expenses.map(e=>e.id===expense.id?updated:e)};
    setData(nd);saveData(nd);
    addToast('✅',lang==='en'?'Expense updated!':'تم تحديث المصروف!','');
    onClose();
  }
  return(
    <div className="popup-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="popup-box" style={{maxWidth:440}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <div className="popup-title">✏️ {lang==='en'?'Edit Expense':'تعديل المصروف'}</div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'var(--text2)',cursor:'pointer',fontSize:20}}><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="row g-2 mb-3">
          <div className="col-6">
            <label className="fw-label">{t.amount}</label>
            <div className="input-prefix"><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} autoFocus/>
            </div>
          </div>
          <div className="col-6">
            <label className="fw-label">{t.date}</label>
            <input className="fw-input" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          </div>
        </div>
        <div className="mb-3">
          <label className="fw-label">{t.note}</label>
          <input className="fw-input" value={note} onChange={e=>setNote(e.target.value)} placeholder={t.notePlaceholder}/>
        </div>
        <div className="mb-3">
          <label className="fw-label">{t.category}</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:5}}>
            {EXPENSE_CATS.map(cat=>(
              <button key={cat.id} className={`cat-chip ${category===cat.id?'selected':''}`}
                onClick={()=>setCategory(cat.id)}
                style={category===cat.id?{borderColor:cat.color,color:cat.color,background:cat.color+'18'}:{}}>
                {cat.icon} {tCats[cat.id]}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn-fw" style={{flex:1}} onClick={save}><i className="bi bi-check2"></i>{lang==='en'?'Save changes':'حفظ التغييرات'}</button>
          <button className="btn-fw-outline" onClick={onClose}>{lang==='en'?'Cancel':'إلغاء'}</button>
        </div>
      </div>
    </div>
  );
}

function TrackerPage({data,setData,addToast,lang}){
  const t=T[lang].tracker; const tCats=T[lang].cats;
  const [amount,setAmount]=useState('');
  const [category,setCategory]=useState('');
  const [note,setNote]=useState('');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [showCalc,setShowCalc]=useState(false);
  const [search,setSearch]=useState('');
  const [editExp,setEditExp]=useState(null);
  const today=new Date().toISOString().slice(0,10);

  // All expenses filtered by search — shown in table
  const allExp=(data.expenses||[]).filter(e=>{
    if(!search.trim())return e.date===today;
    const q=search.toLowerCase();
    const cat=EXPENSE_CATS.find(c=>c.id===e.category);
    return (
      (tCats[e.category]||'').toLowerCase().includes(q)||
      (e.note||'').toLowerCase().includes(q)||
      String(e.amount).includes(q)||
      e.date.includes(q)||
      (cat?.icon||'').includes(q)
    );
  });

  const todayExp=(data.expenses||[]).filter(e=>e.date===today);
  const todayTotal=todayExp.reduce((s,e)=>s+e.amount,0);

  function addExpense(){
    if(!amount||!category){addToast('⚠️',t.missingFields,'');return;}
    const amt=parseFloat(amount);
    if(isNaN(amt)||amt<=0){addToast('⚠️',t.invalidAmt,'');return;}
    const newExp={id:Date.now(),amount:amt,category,note,date};
    const nd={...data,expenses:[newExp,...(data.expenses||[])]};
    setData(nd);saveData(nd);
    const mk=date.slice(0,7);
    const mTotal=nd.expenses.filter(e=>e.date.startsWith(mk)).reduce((s,e)=>s+e.amount,0);
    const budget=nd.income*.80;
    if(mTotal>budget)addToast('🚨',t.budgetAlert,'');
    else if(mTotal>budget*.9)addToast('⚠️',t.budgetWarn,'');
    else addToast('✅',t.added,`${fmtEGP(amt)} ${t.inCat} ${tCats[category]||category}`);
    setAmount('');setNote('');setCategory('');
  }

  return(
    <div className='page-enter' style={{padding:'32px 24px',maxWidth:900,margin:'0 auto'}}>
      {editExp&&<EditExpenseModal expense={editExp} data={data} setData={setData} addToast={addToast} lang={lang} onClose={()=>setEditExp(null)}/>}
      <div style={{marginBottom:22,display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
        <div>
          <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
          <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
        </div>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="metric-card">
          <div className="metric-label">{t.todaySpend}</div>
          <div className="metric-val c-accent3">{fmtEGP(todayTotal)}</div>
          <div className="metric-sub">{todayExp.length} {t.transactions}</div>
        </div></div>
        <div className="col-md-4"><div className="metric-card">
          <div className="metric-label">{t.dailyBudget}</div>
          <div className="metric-val c-accent">{data.income>0?fmtEGP(data.income*.6/30):t.setIncome}</div>
          <div className="metric-sub">{t.basedOn}</div>
        </div></div>
        <div className="col-md-4"><div className="metric-card">
          <div className="metric-label">{t.vsbudget}</div>
          <div className={`metric-val ${data.income>0&&todayTotal>data.income*.6/30?'c-danger':'c-success'}`} style={{fontSize:16,marginTop:6}}>
            {data.income>0?(todayTotal<=data.income*.6/30?t.onTrack:t.over):'—'}
          </div>
        </div></div>
      </div>

      <div className="fw-card mb-4">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
          <div className="fw-card-title" style={{marginBottom:0}}>{t.addNew}</div>
          <button className="btn-fw-outline" style={{padding:'6px 12px',fontSize:12}} onClick={()=>setShowCalc(s=>!s)}>
            <i className="bi bi-calculator"></i>{showCalc?(lang==='en'?'Hide':'إخفاء'):(lang==='en'?'Calculator':'حاسبة')}
          </button>
        </div>
        {showCalc&&<MiniCalc lang={lang} onUse={v=>{setAmount(v);setShowCalc(false);}}/>}
        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <label className="fw-label">{t.amount}</label>
            <div className="input-prefix"><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" placeholder="0" value={amount} onChange={e=>setAmount(e.target.value)} min="0"/>
            </div>
          </div>
          <div className="col-md-3">
            <label className="fw-label">{t.date}</label>
            <input className="fw-input" type="date" value={date} onChange={e=>setDate(e.target.value)}/>
          </div>
          <div className="col-md-6">
            <label className="fw-label">{t.note}</label>
            <input className="fw-input" placeholder={t.notePlaceholder} value={note} onChange={e=>setNote(e.target.value)}/>
          </div>
        </div>
        <div style={{marginBottom:14}}>
          <label className="fw-label">{t.category}</label>
          <div style={{display:'flex',flexWrap:'wrap',gap:7,marginTop:5}}>
            {EXPENSE_CATS.map(cat=>(
              <button key={cat.id} className={`cat-chip ${category===cat.id?'selected':''}`}
                onClick={()=>setCategory(cat.id)}
                style={category===cat.id?{borderColor:cat.color,color:cat.color,background:cat.color+'18'}:{}}>
                {cat.icon} {tCats[cat.id]}
              </button>
            ))}
          </div>
        </div>
        <button className="btn-fw" onClick={addExpense}><i className="bi bi-plus-circle"></i>{t.addBtn}</button>
      </div>

      <div className="fw-card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,flexWrap:'wrap',gap:10}}>
          <div className="fw-card-title" style={{marginBottom:0}}>
            {search.trim()?(lang==='en'?`Search results (${allExp.length})`:`نتائج البحث (${allExp.length})`):t.todayTx}
          </div>
          <div style={{position:'relative',minWidth:200}}>
            <i className="bi bi-search" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'var(--text3)',fontSize:13}}></i>
            <input className="fw-input" style={{paddingLeft:30,paddingTop:7,paddingBottom:7,fontSize:13}}
              placeholder={lang==='en'?'Search expenses...':'ابحث عن مصروف...'}
              value={search} onChange={e=>setSearch(e.target.value)}/>
            {search&&<button onClick={()=>setSearch('')} style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:14,padding:0}}><i className="bi bi-x"></i></button>}
          </div>
        </div>
        {allExp.length===0?(
          <div className="empty-state">
            <span className="es-icon">{search?'🔍':'🎉'}</span>
            <div className="es-title">{search?(lang==='en'?'No results found':'لا توجد نتائج'):t.noTodayExp}</div>
            <div className="es-sub">{search?(lang==='en'?'Try a different search term':'جرّب كلمة بحث مختلفة'):t.noTodayExpSub}</div>
          </div>
        ):(
          <table className="fw-table">
            <thead><tr>
              <th>{t.date}</th><th>{t.category}</th><th>{t.note}</th>
              <th style={{textAlign:'right'}}>{t.amount}</th><th></th>
            </tr></thead>
            <tbody>{allExp.map(e=>{
              const cat=EXPENSE_CATS.find(c=>c.id===e.category);
              return(<tr key={e.id}>
                <td style={{color:'var(--text3)',fontSize:12}}>{e.date}</td>
                <td><span style={{display:'inline-flex',alignItems:'center',gap:7}}>
                  <span style={{width:8,height:8,borderRadius:'50%',background:cat?.color||'#888',display:'inline-block',flexShrink:0}}></span>
                  {cat?.icon} {tCats[e.category]||e.category}
                </span></td>
                <td style={{color:'var(--text2)'}}>{e.note||'—'}</td>
                <td style={{textAlign:'right',fontWeight:600,color:'var(--accent3)'}}>{fmtEGP(e.amount)}</td>
                <td>
                  <div style={{display:'flex',gap:5}}>
                    <button style={{background:'none',border:'1px solid var(--border2)',borderRadius:6,padding:'4px 8px',color:'var(--text2)',cursor:'pointer',fontSize:12,transition:'all .15s'}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text2)';}}
                      onClick={()=>setEditExp(e)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn-danger" onClick={()=>{const nd={...data,expenses:data.expenses.filter(x=>x.id!==e.id)};setData(nd);saveData(nd);}}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>);
            })}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── HISTORY + EXPORT ─────────────────────────────────
function HistoryPage({data,lang}){
  const t=T[lang].history;
  const [filterCat,setFilterCat]=useState('all');
  const [filterMonth,setFilterMonth]=useState('all');
  const [dateFrom,setDateFrom]=useState('');
  const [dateTo,setDateTo]=useState('');
  const [showDateRange,setShowDateRange]=useState(false);
  const chartRef=useRef(null);const chartInst=useRef(null);
  const catChartRef=useRef(null);const catChartInst=useRef(null);
  const months=[...new Set((data.expenses||[]).map(e=>e.date.slice(0,7)))].sort().reverse();

  // Escape closes date range
  useEffect(()=>{
    const h=e=>{if(e.key==='Escape'&&showDateRange)setShowDateRange(false);};
    window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);
  },[showDateRange]);

  const filtered=(data.expenses||[]).filter(e=>{
    const catOk=filterCat==='all'||e.category===filterCat;
    const monOk=filterMonth==='all'||e.date.startsWith(filterMonth);
    const fromOk=!dateFrom||e.date>=dateFrom;
    const toOk=!dateTo||e.date<=dateTo;
    return catOk&&monOk&&fromOk&&toOk;
  });
  const totalFiltered=filtered.reduce((s,e)=>s+e.amount,0);

  useEffect(()=>{
    if(!chartRef.current)return;
    if(chartInst.current)chartInst.current.destroy();
    const last6=[...new Set((data.expenses||[]).map(e=>e.date.slice(0,7)))].sort().slice(-6);
    if(!last6.length)return;
    const mTotals=last6.map(m=>({month:m,total:(data.expenses||[]).filter(e=>e.date.startsWith(m)).reduce((s,e)=>s+e.amount,0)}));
    chartInst.current=new Chart(chartRef.current,{type:'bar',data:{
      labels:mTotals.map(m=>{const d=new Date(m.month+'-01');return d.toLocaleString('default',{month:'short',year:'2-digit'});}),
      datasets:[{label:'Spending',data:mTotals.map(m=>m.total),backgroundColor:mTotals.map((_,i)=>i===mTotals.length-1?'#b8f050':'rgba(184,240,80,.3)'),borderRadius:6,borderSkipped:false}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' EGP '+Math.round(ctx.raw).toLocaleString()}}},scales:{x:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#9199ad'}},y:{grid:{color:'rgba(255,255,255,.04)'},ticks:{color:'#9199ad',callback:v=>'EGP'+Math.round(v/1000)+'k'}}}}});
  },[data.expenses]);

  useEffect(()=>{
    if(!catChartRef.current)return;
    if(catChartInst.current)catChartInst.current.destroy();
    const catTotals={};
    filtered.forEach(e=>{catTotals[e.category]=(catTotals[e.category]||0)+e.amount;});
    const cats=Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).slice(0,8);
    if(!cats.length)return;
    catChartInst.current=new Chart(catChartRef.current,{type:'doughnut',data:{
      labels:cats.map(([id])=>T[lang].cats[id]||id),
      datasets:[{data:cats.map(([,v])=>v),backgroundColor:cats.map(([id])=>EXPENSE_CATS.find(c=>c.id===id)?.color||'#888'),borderWidth:0,borderRadius:3}]
    },options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' EGP '+Math.round(ctx.raw).toLocaleString()}}}}});
  },[filtered]);

  function exportPDF(){
    try{
      const {jsPDF}=window.jspdf;
      const doc=new jsPDF();
      const month=filterMonth==='all'?'All Months':new Date(filterMonth+'-01').toLocaleString('default',{month:'long',year:'numeric'});
      doc.setFontSize(20);doc.setTextColor(40,40,40);
      doc.text('FinWise — '+t.exportTitle,20,20);
      doc.setFontSize(12);doc.setTextColor(100,100,100);
      doc.text(month,20,30);
      doc.text('Total: EGP '+Math.round(totalFiltered).toLocaleString(),20,38);
      doc.setFontSize(10);
      let y=52;
      doc.setFillColor(240,240,240);doc.rect(15,44,180,7,'F');
      doc.setTextColor(60,60,60);doc.setFontSize(9);
      doc.text('Date',18,49);doc.text('Category',55,49);doc.text('Note',105,49);doc.text('Amount (EGP)',155,49);
      doc.setTextColor(40,40,40);
      filtered.forEach(e=>{
        if(y>275){doc.addPage();y=20;}
        const cat=EXPENSE_CATS.find(c=>c.id===e.category);
        doc.text(e.date,18,y);
        doc.text((cat?.label||e.category).slice(0,20),55,y);
        doc.text((e.note||'').slice(0,30),105,y);
        doc.text('EGP '+Math.round(e.amount).toLocaleString(),155,y);
        y+=7;
        doc.setDrawColor(220,220,220);doc.line(15,y-2,195,y-2);
      });
      doc.save('finwise-report.pdf');
    }catch(err){alert('PDF export failed: '+err.message);}
  }

  function exportExcel(){
    try{
      const rows=filtered.map(e=>{
        const cat=EXPENSE_CATS.find(c=>c.id===e.category);
        return{Date:e.date,Category:cat?.label||e.category,Note:e.note||'',Amount:e.amount};
      });
      // Monthly summary sheet
      const monthMap={};
      filtered.forEach(e=>{const m=e.date.slice(0,7);monthMap[m]=(monthMap[m]||0)+e.amount;});
      const summary=Object.entries(monthMap).map(([m,total])=>({Month:m,Total:total}));
      const wb=XLSX.utils.book_new();
      const ws=XLSX.utils.json_to_sheet(rows);
      const ws2=XLSX.utils.json_to_sheet(summary);
      XLSX.utils.book_append_sheet(wb,ws,'Transactions');
      XLSX.utils.book_append_sheet(wb,ws2,'Monthly Summary');
      XLSX.writeFile(wb,'finwise-report.xlsx');
    }catch(err){alert('Excel export failed: '+err.message);}
  }

  return(
    <div style={{padding:'32px 24px',maxWidth:980,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-6"><div className="fw-card" style={{height:220}}>
          <div className="fw-card-title">{t.monthly}</div>
          <div className="chart-container" style={{height:165}}>
            {!(data.expenses||[]).length?
              <div className="empty-state" style={{height:'100%',padding:'0',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontSize:28}}>📊</span><div style={{fontSize:12,color:'var(--text3)',marginTop:8}}>{t.noData}</div>
              </div>
              :<canvas ref={chartRef} aria-label="Monthly chart">Monthly spending.</canvas>}
          </div>
        </div></div>
        <div className="col-md-6"><div className="fw-card" style={{height:220}}>
          <div className="fw-card-title">{t.catBreak}</div>
          <div className="chart-container" style={{height:165}}>
            {!filtered.length?
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%',color:'var(--text3)',fontSize:12}}>{t.noTx}</div>
              :<canvas ref={catChartRef} aria-label="Category chart">Category.</canvas>}
          </div>
        </div></div>
      </div>
      <div className="fw-card">
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center',marginBottom:14}}>
          <select className="fw-select" style={{width:'auto'}} value={filterMonth} onChange={e=>{setFilterMonth(e.target.value);setDateFrom('');setDateTo('');}}>
            <option value="all">{t.allMonths}</option>
            {months.map(m=><option key={m} value={m}>{new Date(m+'-01').toLocaleString('default',{month:'long',year:'numeric'})}</option>)}
          </select>
          <select className="fw-select" style={{width:'auto'}} value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
            <option value="all">{t.allCats}</option>
            {EXPENSE_CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {T[lang].cats[c.id]}</option>)}
          </select>
          <button className="btn-export"
            style={(dateFrom||dateTo)?{borderColor:'var(--accent)',color:'var(--accent)'}:{}}
            onClick={()=>setShowDateRange(s=>!s)}>
            <i className="bi bi-calendar-range"></i>
            {dateFrom&&dateTo?`${dateFrom} → ${dateTo}`:(lang==='en'?'Date range':'نطاق تاريخ')}
            {(dateFrom||dateTo)&&<button onClick={e=>{e.stopPropagation();setDateFrom('');setDateTo('');}} style={{background:'none',border:'none',color:'inherit',cursor:'pointer',marginLeft:4,fontSize:12,padding:0}}>✕</button>}
          </button>
          {showDateRange&&(
            <div style={{position:'absolute',marginTop:44,background:'var(--card-bg)',border:'1px solid var(--border2)',borderRadius:12,padding:16,zIndex:100,boxShadow:'0 8px 24px rgba(0,0,0,.3)',display:'flex',gap:12,alignItems:'flex-end',flexWrap:'wrap'}}>
              <div>
                <label className="fw-label">{lang==='en'?'From':'من'}</label>
                <input className="fw-input" type="date" value={dateFrom} onChange={e=>{setDateFrom(e.target.value);setFilterMonth('all');}}/>
              </div>
              <div>
                <label className="fw-label">{lang==='en'?'To':'إلى'}</label>
                <input className="fw-input" type="date" value={dateTo} onChange={e=>{setDateTo(e.target.value);setFilterMonth('all');}}/>
              </div>
              <button className="btn-sm" onClick={()=>setShowDateRange(false)}>{lang==='en'?'Apply':'تطبيق'}</button>
            </div>
          )}
          <div style={{marginLeft:'auto',display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            <span style={{fontFamily:'var(--ff-head)',fontSize:15,color:'var(--accent3)'}}>{t.total}: {fmtEGP(totalFiltered)}</span>
            <button className="btn-export" onClick={exportPDF}><i className="bi bi-file-earmark-pdf"></i>{t.exportPDF}</button>
            <button className="btn-export" onClick={exportExcel}><i className="bi bi-file-earmark-excel"></i>{t.exportExcel}</button>
          </div>
        </div>
        {!filtered.length?(
          <div className="empty-state">
            <span className="es-icon">🔍</span>
            <div className="es-title">{t.noTxFound}</div>
            <div className="es-sub">{t.noTxFoundSub}</div>
          </div>
        ):(
          <table className="fw-table">
            <thead><tr><th>{t.date}</th><th>{t.category}</th><th>{t.note}</th><th style={{textAlign:'right'}}>{t.amount}</th></tr></thead>
            <tbody>{filtered.map(e=>{
              const cat=EXPENSE_CATS.find(c=>c.id===e.category);
              return(<tr key={e.id}>
                <td style={{color:'var(--text2)'}}>{new Date(e.date+'T00:00:00').toLocaleDateString('en-EG',{day:'numeric',month:'short'})}</td>
                <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:cat?.color||'#888',display:'inline-block'}}></span>{cat?.icon} {T[lang].cats[e.category]||e.category}</span></td>
                <td style={{color:'var(--text2)'}}>{e.note||'—'}</td>
                <td style={{textAlign:'right',fontWeight:600,color:'var(--accent3)'}}>{fmtEGP(e.amount)}</td>
              </tr>);
            })}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── PLAN ────────────────────────────────────────────
function PlanPage({data,setData,addToast,lang}){
  const t=T[lang].plan;
  const [income,setIncome]=useState(data.income>0?String(data.income):'');
  const [savedBtn,setSavedBtn]=useState(false);
  function savePlan(){
    const inc=parseFloat(income);
    if(!inc||inc<=0){addToast('⚠️',t.netIncome,'');return;}
    const nd={...data,income:inc};setData(nd);saveData(nd);
    setSavedBtn(true);addToast('✅',t.savedBtn,'');setTimeout(()=>setSavedBtn(false),2000);
  }
  const inc=parseFloat(income)||0;
  let sp=.60,sa=.20,iv=.20;
  if(inc<5000){sp=.65;sa=.25;iv=.10;}else if(inc<10000){sp=.60;sa=.22;iv=.18;}else if(inc<20000){sp=.55;sa=.23;iv=.22;}else{sp=.50;sa=.25;iv=.25;}
  const thisMonth=getMonthKey(new Date());
  const monthExp=(data.expenses||[]).filter(e=>e.date.startsWith(thisMonth)).reduce((s,e)=>s+e.amount,0);
  const surplus=data.income-monthExp;
  let score=50;
  if(data.income>0){const sr=surplus/data.income;if(sr>=.3)score=90;else if(sr>=.2)score=78;else if(sr>=.1)score=65;else if(sr>=0)score=50;else score=30;}
  const advices=[];
  if(inc>0){
    if(surplus<0)advices.push({tag:'warn',tl:lang==='en'?'Warning':'تحذير',ti:lang==='en'?'You are overspending':'أنت تنفق أكثر من دخلك',tx:lang==='en'?'Cut wants first — dining out and subscriptions are the easiest to reduce.':'قلّل الرغبات أولاً — الأكل خارج والاشتراكات هي الأسهل في التقليص.'});
    if(inc<5000)advices.push({tag:'save',tl:lang==='en'?'Savings':'ادخار',ti:lang==='en'?'Start a micro emergency fund':'ابدأ بصندوق طوارئ صغير',tx:lang==='en'?'Save EGP 200–300/month in a separate account. Small amounts build momentum.':'ادخر ٢٠٠–٣٠٠ جنيه شهرياً في حساب منفصل. المبالغ الصغيرة تبني الزخم.'});
    else advices.push({tag:'save',tl:lang==='en'?'Savings':'ادخار',ti:lang==='en'?'Target a 3-6 month emergency fund':'استهدف صندوق طوارئ ٣–٦ أشهر',tx:lang==='en'?`Build ${fmtEGP(monthExp*4)} before investing aggressively.`:`ابن ${fmtEGP(monthExp*4)} قبل الاستثمار بقوة.`});
    if(inc>=8000)advices.push({tag:'invest',tl:lang==='en'?'Invest':'استثمر',ti:lang==='en'?'Try bank certificates':'جرب شهادات البنوك',tx:lang==='en'?'Look for high-yield savings certificates at your local bank. Safe for beginners, minimum EGP 1,000.':'ابحث عن شهادات ادخار بعوائد مرتفعة في بنكك المحلي. آمنة للمبتدئين، الحد الأدنى ١٠٠٠ جنيه.'});
    advices.push({tag:'spend',tl:lang==='en'?'Tip':'نصيحة',ti:lang==='en'?'Automate savings on payday':'أتمتة الادخار يوم الراتب',tx:lang==='en'?`Transfer ${fmtEGP(inc*sa)} to savings immediately on payday before spending anything.`:`حوّل ${fmtEGP(inc*sa)} للادخار فور استلام الراتب قبل أي إنفاق.`});
  }
  const tagCls={save:'tag-save',invest:'tag-invest',spend:'tag-spend',warn:'tag-warn'};
  return(
    <div style={{padding:'32px 24px',maxWidth:900,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>
      <div className="fw-card mb-4">
        <div className="fw-card-title">{t.incomeSetup}</div>
        <div className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="fw-label">{t.netIncome}</label>
            <div className="input-prefix"><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" placeholder="e.g. 9000" value={income} onChange={e=>setIncome(e.target.value)}/>
            </div>
          </div>
          <div className="col-md-3">
            <button className="btn-fw" onClick={savePlan}>{savedBtn?<><i className="bi bi-check2"></i>{t.savedBtn}</>:<><i className="bi bi-floppy"></i>{t.savePlan}</>}</button>
          </div>
        </div>
      </div>
      {inc>0&&(<>
        <div className="row g-3 mb-4">
          {[{label:t.livingExp,val:fmtEGP(inc*sp),sub:Math.round(sp*100)+'%',cls:'c-accent3'},{label:t.monthlySav,val:fmtEGP(inc*sa),sub:Math.round(sa*100)+'%',cls:'c-success'},{label:t.investments,val:fmtEGP(inc*iv),sub:Math.round(iv*100)+'%',cls:'c-accent2'}].map((m,i)=>(
            <div key={i} className="col-md-4"><div className="metric-card">
              <div className="metric-label">{m.label}</div>
              <div className={`metric-val ${m.cls}`}>{m.val}</div>
              <div className="metric-sub">{m.sub} of income</div>
            </div></div>
          ))}
        </div>
        <div className="row g-3 mb-4">
          <div className="col-md-5"><div className="fw-card">
            <div className="fw-card-title">{t.healthScore}</div>
            <div style={{display:'flex',alignItems:'center',gap:20}}>
              <div style={{position:'relative',width:76,height:76,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <ProgressRing pct={score} size={76} stroke={5} score={score}/>
                <div style={{position:'absolute',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <span style={{fontFamily:'var(--ff-head)',fontSize:20,fontWeight:800,lineHeight:1,color:score>=70?'var(--success)':score>=50?'var(--accent)':'var(--danger)'}}>{score}</span>
                  <span style={{fontSize:9,color:'var(--text3)'}}>/ 100</span>
                </div>
              </div>
              <div>
                <div style={{fontWeight:600,marginBottom:4}}>{score>=70?t.great:score>=50?t.room:t.needs}</div>
                <div style={{fontSize:12,color:'var(--text2)'}}>{t.basedOn}</div>
              </div>
            </div>
          </div></div>
          <div className="col-md-7"><div className="fw-card">
            <div className="fw-card-title">{t.budgetVsActual}</div>
            {[{label:t.needsLabel,actual:monthExp,budget:inc*sp,color:'#50c8f0'},{label:t.savLabel,actual:Math.max(0,surplus),budget:inc*sa,color:'#50d090'}].map((b,i)=>(
              <div key={i} style={{marginBottom:13}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:5,fontSize:12}}>
                  <span>{b.label}</span><span style={{color:'var(--text2)'}}>{fmtEGP(b.actual)} / {fmtEGP(b.budget)}</span>
                </div>
                <div className="prog-bar-bg"><div className="prog-bar-fill" style={{width:`${Math.min(100,(b.actual/b.budget)*100||0)}%`,background:b.actual>b.budget?'var(--danger)':b.color}}></div></div>
              </div>
            ))}
          </div></div>
        </div>
        <div className="fw-card">
          <div className="fw-card-title">{t.advice}</div>
          <div className="row g-3">
            {advices.map((a,i)=>(
              <div key={i} className="col-md-6">
                <div style={{background:'var(--bg3)',borderRadius:10,padding:'13px 15px',border:'1px solid var(--border)'}}>
                  <span className={`tag ${tagCls[a.tag]}`} style={{marginBottom:7,display:'inline-block'}}>{a.tl}</span>
                  <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>{a.ti}</div>
                  <div style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>{a.tx}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>)}
    </div>
  );
}

// ── GOALS ───────────────────────────────────────────
function GoalsPage({data,setData,addToast,lang}){
  const t=T[lang].goals;
  const [name,setName]=useState('');
  const [target,setTarget]=useState('');
  const [savingsInput,setSavingsInput]=useState({});
  function addGoal(){
    if(!name||!target){addToast('⚠️','Missing fields','');return;}
    const tgt=parseFloat(target);
    if(isNaN(tgt)||tgt<=0)return;
    const ng={id:Date.now(),name,target:tgt,saved:0,createdAt:new Date().toISOString()};
    const nd={...data,goals:[...(data.goals||[]),ng]};
    setData(nd);saveData(nd);setName('');setTarget('');
    addToast('🎯',lang==='en'?'Goal added!':'تم إضافة الهدف!',name);
  }
  function addSavings(goalId){
    const amt=parseFloat(savingsInput[goalId]||0);
    if(!amt||amt<=0)return;
    const goalItem=(data.goals||[]).find(g=>g.id===goalId);
    const newSaved=goalItem?Math.min(goalItem.target,goalItem.saved+amt):0;
    const nd={...data,goals:(data.goals||[]).map(g=>g.id===goalId?{...g,saved:newSaved}:g)};
    setData(nd);saveData(nd);setSavingsInput(s=>({...s,[goalId]:''}));
    if(goalItem&&newSaved>=goalItem.target){launchConfetti();addToast('🎉',lang==='en'?'Goal Reached! 🎉':'تحقق الهدف! 🎉',goalItem.name);}
    else addToast('✅',lang==='en'?'Savings added!':'تم إضافة المدخرات!','');
  }
  const goals=data.goals||[];
  const monthlySav=Math.max(0,(data.income||0)*.20);
  return(
    <div style={{padding:'32px 24px',maxWidth:860,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>
      <div className="fw-card mb-4">
        <div className="fw-card-title">{t.addGoal}</div>
        <div className="row g-3 align-items-end">
          <div className="col-md-5"><label className="fw-label">{t.goalName}</label>
            <input className="fw-input" placeholder={lang==='en'?'e.g. Emergency fund':'مثال: صندوق طوارئ'} value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="col-md-4"><label className="fw-label">{t.targetAmt}</label>
            <div className="input-prefix"><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" placeholder="0" min="0" value={target} onChange={e=>setTarget(e.target.value)}/>
            </div>
          </div>
          <div className="col-md-3"><button className="btn-fw" onClick={addGoal}><i className="bi bi-flag"></i>{t.addBtn}</button></div>
        </div>
      </div>
      {!goals.length?(
        <div className="empty-state">
          <span className="es-icon">🎯</span>
          <div className="es-title">{t.noGoals}</div>
          <div className="es-sub">{t.noGoalsSub}</div>
        </div>
      ):goals.map(g=>{
        const pct=g.target>0?(g.saved/g.target)*100:0;
        const rem=g.target-g.saved;
        const months=monthlySav>0?Math.ceil(rem/monthlySav):null;
        const done=pct>=100;
        return(
          <div key={g.id} className="goal-card">
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:10}}>
              <div>
                <div style={{fontFamily:'var(--ff-head)',fontSize:16,fontWeight:700}}>{g.name}</div>
                <div style={{fontSize:12,color:'var(--text2)',marginTop:2}}>{fmtEGP(g.saved)} / {fmtEGP(g.target)}</div>
              </div>
              <div style={{textAlign:'right',display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                {done?<span className="tag tag-save">{t.reached}</span>:(months&&<div style={{fontSize:12,color:'var(--accent)',fontWeight:600}}>{months} {t.months}</div>)}
                <button className="btn-danger" onClick={()=>{const nd={...data,goals:data.goals.filter(x=>x.id!==g.id)};setData(nd);saveData(nd);}}><i className="bi bi-trash"></i></button>
              </div>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--text3)',marginBottom:4}}>
                <span>{t.progress}</span><span>{Math.round(pct)}%</span>
              </div>
              <div className="prog-bar-bg"><div className="prog-bar-fill" style={{width:`${Math.min(100,pct)}%`,background:done?'var(--success)':'var(--accent)'}}></div></div>
            </div>
            {!done&&(<div style={{display:'flex',gap:8,alignItems:'center'}}>
              <div className="input-prefix" style={{flex:1}}><span className="prefix-label">EGP</span>
                <input className="fw-input" style={{padding:'8px 8px 8px 40px'}} type="number" placeholder="0" min="0"
                  value={savingsInput[g.id]||''} onChange={e=>setSavingsInput(s=>({...s,[g.id]:e.target.value}))}/>
              </div>
              <button className="btn-sm" onClick={()=>addSavings(g.id)}><i className="bi bi-plus-circle"></i>{t.addSavings}</button>
            </div>)}
          </div>
        );
      })}
    </div>
  );
}

// ── CONVERTER (USD base rates table) ─────────────────
function ConverterPage({data,setData,lang}){
  const t=T[lang].converter;
  const [amount,setAmount]=useState('100');
  const [from,setFrom]=useState('USD');
  const [to,setTo]=useState('EGP');
  const [rates,setRates]=useState(null);// USD-based
  const [loading,setLoading]=useState(false);
  const [rateInfo,setRateInfo]=useState('');
  const [error,setError]=useState('');

  // Fetch rates — always fresh, cache max 1 hour
  function fetchRates(force=false){
    const now=Date.now();
    const today=new Date().toISOString().slice(0,10);
    const cacheAgeMs=now-(data.ratesCacheTimestamp||0);
    const cacheOk=data.ratesCacheDate===today&&data.ratesCache&&cacheAgeMs<3600000;// 1 hour

    if(!force&&cacheOk){
      const egpBase=data.ratesCache;
      if(egpBase&&egpBase.USD){
        const usdBase={};
        CURRENCIES.forEach(c=>{usdBase[c.code]=(egpBase[c.code]||1)/egpBase.USD;});
        usdBase.USD=1;
        const mins=Math.round(cacheAgeMs/60000);
        setRates(usdBase);
        setRateInfo(`${t.lastUpdate}: ${today} · ${mins}${lang==='en'?'m ago':'د مضت'}`);
        return;
      }
    }

    setLoading(true);setError('');
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(r=>r.json())
      .then(d=>{
        const today2=new Date().toISOString().slice(0,10);
        const r={USD:1};
        CURRENCIES.forEach(c=>{if(d.rates[c.code])r[c.code]=d.rates[c.code];});
        setRates(r);setLoading(false);
        const timeStr=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
        setRateInfo(`${t.lastUpdate}: ${today2} ${timeStr}`);
        const egpVal=d.rates['EGP']||53.8;
        const egpBased={};
        CURRENCIES.forEach(c=>{egpBased[c.code]=(d.rates[c.code]||1)/egpVal;});
        egpBased.EGP=1;
        const nd={...data,ratesCache:egpBased,ratesCacheDate:today2,ratesCacheTimestamp:Date.now()};
        setData(nd);saveData(nd);
      })
      .catch(()=>{
        setLoading(false);setError(t.rateError);
        setRates(FALLBACK_RATES_USD);
      });
  }

  useEffect(()=>{
    fetchRates();
    // Auto-refresh every hour while converter is open
    const iv=setInterval(()=>fetchRates(true),3600000);
    return()=>clearInterval(iv);
  },[]);

  const effectiveRates=rates||FALLBACK_RATES_USD;

  function convert(amt,f,t2){
    if(!effectiveRates[f]||!effectiveRates[t2])return 0;
    const inUSD=f==='USD'?amt:amt/effectiveRates[f];
    return t2==='USD'?inUSD:inUSD*effectiveRates[t2];
  }
  function swap(){const tmp=from;setFrom(to);setTo(tmp);}
  const result=convert(parseFloat(amount)||0,from,to);
  const fromCurr=CURRENCIES.find(c=>c.code===from);
  const toCurr=CURRENCIES.find(c=>c.code===to);

  return(
    <div style={{padding:'32px 24px',maxWidth:680,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>
      <div className="fw-card mb-4">
        {loading&&<div style={{textAlign:'center',padding:'10px 0',color:'var(--text2)',fontSize:13,marginBottom:14}}><i className="bi bi-arrow-repeat" style={{marginRight:6,animation:'spin 1s linear infinite'}}></i>{t.fetchingRates}</div>}
        {error&&<div style={{background:'rgba(240,80,80,.1)',border:'1px solid rgba(240,80,80,.3)',borderRadius:8,padding:'9px 13px',fontSize:12,color:'var(--danger)',marginBottom:14}}>{error}</div>}
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <label className="fw-label">{t.amount}</label>
            <input className="fw-input" type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} style={{fontSize:18,fontWeight:600}}/>
          </div>
          <div className="col-md-3">
            <label className="fw-label">{t.from}</label>
            <select className="fw-select" value={from} onChange={e=>setFrom(e.target.value)}>
              {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
            </select>
          </div>
          <div className="col-md-1" style={{display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:2}}>
            <button className="swap-btn" onClick={swap}><i className="bi bi-arrow-left-right"></i></button>
          </div>
          <div className="col-md-3">
            <label className="fw-label">{t.to}</label>
            <select className="fw-select" value={to} onChange={e=>setTo(e.target.value)}>
              {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
            </select>
          </div>
        </div>
        <div style={{marginTop:22,textAlign:'center',padding:'20px',background:'var(--bg3)',borderRadius:12,border:'1px solid var(--border)'}}>
          <div style={{fontSize:13,color:'var(--text2)',marginBottom:6}}>{fromCurr?.flag} {parseFloat(amount)||0} {lang==='en'?fromCurr?.name:fromCurr?.nameAr} =</div>
          <div className="result-big">{toCurr?.flag} {result.toLocaleString('en',{maximumFractionDigits:2})} {to}</div>
          <div style={{fontSize:11,color:'var(--text3)',marginTop:6}}>1 {from} = {convert(1,from,to).toLocaleString('en',{maximumFractionDigits:4})} {to}</div>
        </div>
        <div style={{marginTop:12,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
          {rateInfo&&<div className="rate-badge"><i className="bi bi-lightning-charge-fill"></i>{rateInfo}</div>}
          <button
            onClick={()=>fetchRates(true)}
            disabled={loading}
            style={{display:'inline-flex',alignItems:'center',gap:5,background:'none',border:'1px solid var(--border2)',borderRadius:8,padding:'4px 12px',color:'var(--text2)',cursor:loading?'not-allowed':'pointer',fontSize:12,fontWeight:500,transition:'all .2s',opacity:loading?.6:1}}
            onMouseEnter={e=>{if(!loading){e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.color='var(--accent)';}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border2)';e.currentTarget.style.color='var(--text2)';}}>
            <i className={`bi bi-arrow-clockwise ${loading?'spin':''}`}></i>
            {loading?(lang==='en'?'Updating...':'جاري التحديث...'):(lang==='en'?'Refresh rates':'تحديث الأسعار')}
          </button>
        </div>
      </div>

      {/* USD-BASE RATES TABLE */}
      <div className="fw-card">
        <div className="fw-card-title">{t.allRates}</div>
        <table className="fw-table">
          <thead><tr><th>{t.currency}</th><th style={{textAlign:'right'}}>{t.rate}</th></tr></thead>
          <tbody>
            {CURRENCIES.map(c=>(
              <tr key={c.code}>
                <td><span style={{display:'inline-flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:20}}>{c.flag}</span>
                  <span>{lang==='en'?c.name:c.nameAr} <span style={{color:'var(--text3)',fontSize:11}}>({c.code})</span></span>
                </span></td>
                <td style={{textAlign:'right',fontWeight:700,color:'var(--accent)',fontFamily:'var(--ff-head)',fontSize:15}}>
                  {effectiveRates[c.code]?(c.code==='USD'?'1.0000':effectiveRates[c.code].toLocaleString('en',{maximumFractionDigits:4})):'-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ── RECURRING (with due dates + alerts) ──────────────
function RecurringPage({data,setData,addToast,lang}){
  const t=T[lang].recurring; const tCats=T[lang].cats;
  const [name,setName]=useState('');
  const [amount,setAmount]=useState('');
  const [category,setCategory]=useState('bills');
  const [dueDay,setDueDay]=useState('1');

  function getDueStatus(day){
    const today=new Date();
    const thisDay=today.getDate();
    const diff=day-thisDay;
    if(diff===0)return{label:lang==='en'?'Due today!':'اليوم!',cls:'due-today'};
    if(diff>0&&diff<=7)return{label:lang==='en'?`In ${diff} days`:`بعد ${diff} أيام`,cls:'due-soon'};
    if(diff<0){const daysInMonth=new Date(today.getFullYear(),today.getMonth()+1,0).getDate();const remaining=(daysInMonth-thisDay)+day;if(remaining<=7)return{label:lang==='en'?`In ${remaining} days`:`بعد ${remaining} أيام`,cls:'due-soon'};}
    return{label:lang==='en'?`Day ${day}`:`يوم ${day}`,cls:'due-ok'};
  }

  function addRecurring(){
    if(!name||!amount){addToast('⚠️','Missing fields','');return;}
    const amt=parseFloat(amount);
    if(isNaN(amt)||amt<=0)return;
    const dd=parseInt(dueDay)||1;
    const nr={id:Date.now(),name,amount:amt,category,dueDay:dd};
    const nd={...data,recurring:[...(data.recurring||[]),nr]};
    setData(nd);saveData(nd);setName('');setAmount('');setDueDay('1');
    addToast('🔄',lang==='en'?'Recurring added!':'تم الإضافة!',name);
    // Auto-add this month
    const today=new Date().toISOString().slice(0,10);
    const thisMonth=getMonthKey(new Date());
    const exists=(nd.expenses||[]).some(e=>e.recurringId===nr.id&&e.date.startsWith(thisMonth));
    if(!exists){
      const y=new Date().getFullYear(),m=new Date().getMonth();
      const expDate=new Date(y,m,Math.min(dd,new Date(y,m+1,0).getDate())).toISOString().slice(0,10);
      const ae={id:Date.now()+1,amount:amt,category,note:`${name} (${lang==='en'?'Auto':'تلقائي'})`,date:expDate,recurringId:nr.id};
      const nd2={...nd,expenses:[ae,...(nd.expenses||[])]};
      setData(nd2);saveData(nd2);
    }
  }

  const recs=data.recurring||[];
  const total=recs.reduce((s,r)=>s+r.amount,0);
  const upcoming=recs.filter(r=>{
    const s=getDueStatus(r.dueDay);
    return s.cls==='due-today'||s.cls==='due-soon';
  });

  return(
    <div style={{padding:'32px 24px',maxWidth:820,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>

      {/* UPCOMING ALERTS */}
      {upcoming.length>0&&(
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:1,color:'var(--warning)',marginBottom:8}}>⚠️ {t.upcoming}</div>
          {upcoming.map(r=>{
            const s=getDueStatus(r.dueDay);
            const cat=EXPENSE_CATS.find(c=>c.id===r.category);
            return(
              <div key={r.id} className={`alert-banner ${s.cls==='due-today'?'danger':'warning'}`}>
                <span style={{fontSize:18}}>{cat?.icon}</span>
                <div>
                  <div style={{fontWeight:600}}>{r.name}</div>
                  <div style={{fontSize:12,opacity:.8}}>{fmtEGP(r.amount)} — {s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!upcoming.length&&recs.length>0&&(
        <div className="alert-banner info" style={{marginBottom:16}}>
          <i className="bi bi-check2-circle" style={{fontSize:18}}></i>
          <span>{t.upcomingNone}</span>
        </div>
      )}

      <div className="row g-3 mb-4">
        <div className="col-md-6"><div className="metric-card">
          <div className="metric-label">{t.totalMonthly}</div>
          <div className="metric-val c-accent3">{fmtEGP(total)}</div>
          <div className="metric-sub">{data.income>0?Math.round(total/data.income*100)+'% of income':''}</div>
        </div></div>
        <div className="col-md-6"><div className="metric-card">
          <div className="metric-label">{lang==='en'?'Bills this week':'المستحقات هذا الأسبوع'}</div>
          <div className={`metric-val ${upcoming.length>0?'c-warning':'c-success'}`}>{upcoming.length}</div>
          <div className="metric-sub">{lang==='en'?'upcoming payments':'مدفوعات قادمة'}</div>
        </div></div>
      </div>

      <div className="fw-card mb-4">
        <div className="fw-card-title">{t.addNew}</div>
        <div className="row g-3 align-items-end">
          <div className="col-md-3">
            <label className="fw-label">{t.name}</label>
            <input className="fw-input" placeholder={lang==='en'?'e.g. Internet':'مثال: إنترنت'} value={name} onChange={e=>setName(e.target.value)}/>
          </div>
          <div className="col-md-2">
            <label className="fw-label">{t.amount}</label>
            <div className="input-prefix"><span className="prefix-label">EGP</span>
              <input className="fw-input" type="number" placeholder="0" min="0" value={amount} onChange={e=>setAmount(e.target.value)}/>
            </div>
          </div>
          <div className="col-md-3">
            <label className="fw-label">{t.category}</label>
            <select className="fw-select" value={category} onChange={e=>setCategory(e.target.value)}>
              {EXPENSE_CATS.map(c=><option key={c.id} value={c.id}>{c.icon} {tCats[c.id]}</option>)}
            </select>
          </div>
          <div className="col-md-2">
            <label className="fw-label">{t.dueDay}</label>
            <input className="fw-input" type="number" min="1" max="31" placeholder="1" value={dueDay} onChange={e=>setDueDay(e.target.value)}/>
          </div>
          <div className="col-md-2">
            <button className="btn-fw" onClick={addRecurring}><i className="bi bi-plus-circle"></i>{t.addBtn}</button>
          </div>
        </div>
      </div>

      {!recs.length?(
        <div className="empty-state">
          <span className="es-icon">📋</span>
          <div className="es-title">{t.noRecurring}</div>
          <div className="es-sub">{t.noRecurringSub}</div>
        </div>
      ):(
        <div className="fw-card">
          {recs.map(r=>{
            const cat=EXPENSE_CATS.find(c=>c.id===r.category);
            const status=getDueStatus(r.dueDay);
            return(
              <div key={r.id} className="rec-item">
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:38,height:38,borderRadius:9,background:cat?.color+'22',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>{cat?.icon}</div>
                  <div>
                    <div style={{fontWeight:600,fontSize:14}}>{r.name}</div>
                    <div style={{fontSize:11,color:'var(--text2)'}}>{tCats[r.category]} · {lang==='en'?`Due day ${r.dueDay}`:`يوم ${r.dueDay}`}</div>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span className={`due-badge ${status.cls}`}>{status.label}</span>
                  <span style={{fontFamily:'var(--ff-head)',fontSize:15,fontWeight:700,color:'var(--accent3)'}}>{fmtEGP(r.amount)}</span>
                  <button className="btn-danger" onClick={()=>{const nd={...data,recurring:data.recurring.filter(x=>x.id!==r.id)};setData(nd);saveData(nd);}}><i className="bi bi-trash"></i></button>
                </div>
              </div>
            );
          })}
          <div style={{paddingTop:12,display:'flex',justifyContent:'space-between',fontWeight:600,fontSize:14}}>
            <span style={{color:'var(--text2)'}}>{lang==='en'?'Total':'الإجمالي'}</span>
            <span style={{color:'var(--accent3)',fontFamily:'var(--ff-head)'}}>{fmtEGP(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ── LEARN ───────────────────────────────────────────
function LearnPage({lang}){
  const t=T[lang].learn;
  const [openArticle,setOpenArticle]=useState(null);
  const [search,setSearch]=useState('');
  const filtered=ARTICLES.filter(a=>{
    const title=lang==='en'?a.title:a.titleAr;
    const cat=lang==='en'?a.category:a.categoryAr;
    return title.toLowerCase().includes(search.toLowerCase())||cat.toLowerCase().includes(search.toLowerCase());
  });
  return(
    <div style={{padding:'32px 24px',maxWidth:960,margin:'0 auto'}}>
      <div style={{marginBottom:22}}>
        <h2 style={{fontFamily:'var(--ff-head)',fontSize:24,fontWeight:800,letterSpacing:-1}}>{t.title}</h2>
        <p style={{color:'var(--text2)',fontSize:13,marginTop:4}}>{t.sub}</p>
      </div>
      <div style={{position:'relative',marginBottom:22,maxWidth:380}}>
        <i className="bi bi-search" style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}></i>
        <input className="fw-input" style={{paddingLeft:36}} placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)}/>
      </div>
      <div className="row g-3">
        {filtered.map(a=>(
          <div key={a.id} className="col-md-4" onClick={()=>setOpenArticle(a)}>
            <div className="article-card">
              <div className="article-thumb" style={{background:a.bg}}>{a.icon}</div>
              <div className="article-body">
                <div className="article-category" style={{color:a.catColor}}>{lang==='en'?a.category:a.categoryAr}</div>
                <div className="article-title">{lang==='en'?a.title:a.titleAr}</div>
                <div className="article-desc">{lang==='en'?a.desc:a.descAr}</div>
                <div className="article-read-time"><i className="bi bi-clock" style={{marginRight:4}}></i>{lang==='en'?a.readTime:a.readTimeAr}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openArticle&&(
        <div className="modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setOpenArticle(null);}}>
          <div className="modal-box">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
              <span className="tag" style={{background:openArticle.catColor+'22',color:openArticle.catColor}}>{lang==='en'?openArticle.category:openArticle.categoryAr}</span>
              <button onClick={()=>setOpenArticle(null)} style={{background:'none',border:'none',color:'var(--text2)',cursor:'pointer',fontSize:20}}><i className="bi bi-x-lg"></i></button>
            </div>
            <h2>{lang==='en'?openArticle.title:openArticle.titleAr}</h2>
            <div style={{fontSize:11,color:'var(--text3)',marginBottom:16}}><i className="bi bi-clock" style={{marginRight:4}}></i>{lang==='en'?openArticle.readTime:openArticle.readTimeAr}</div>
            {openArticle.content.map((c,i)=>c.type==='p'?<p key={i}>{lang==='en'?c.text:c.textAr}</p>:<h4 key={i}>{lang==='en'?c.text:c.textAr}</h4>)}
          </div>
        </div>
      )}
    </div>
  );
}


// ── ONBOARDING WIZARD ────────────────────────────────
function OnboardingWizard({onDone, lang}){
  const t = lang === 'en';
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [income, setIncome] = useState('');
  const [job, setJob] = useState('');
  const [living, setLiving] = useState('');
  const [goals, setGoals] = useState([]);
  const [currency] = useState('EGP');

  const totalSteps = 5;
  const pct = Math.round(((step) / totalSteps) * 100);

  const jobOptions = t
    ? [['employed','💼 Employed full-time'],['part','🧑‍💻 Part-time / Freelance'],['student','🎓 Student'],['unemployed','🔍 Looking for work']]
    : [['employed','💼 موظف بدوام كامل'],['part','🧑‍💻 دوام جزئي / فريلانس'],['student','🎓 طالب'],['unemployed','🔍 أبحث عن عمل']];

  const livingOptions = t
    ? [['family','🏠 With family (no rent)'],['renting','🏢 Renting independently'],['shared','🤝 Shared apartment']]
    : [['family','🏠 مع العائلة (بدون إيجار)'],['renting','🏢 مستأجر باستقلالية'],['shared','🤝 شقة مشتركة']];

  const goalOptions = t
    ? [['emergency','🚨 Emergency fund'],['invest','📈 Start investing'],['travel','✈️ Travel'],['gadget','💻 Buy a gadget'],['car','🚗 Car down payment'],['debt','💳 Pay off debt']]
    : [['emergency','🚨 صندوق طوارئ'],['invest','📈 البدء بالاستثمار'],['travel','✈️ السفر'],['gadget','💻 شراء جهاز'],['car','🚗 دفعة أولى سيارة'],['debt','💳 سداد ديون']];

  function toggleGoal(id){
    setGoals(g => g.includes(id) ? g.filter(x=>x!==id) : [...g, id]);
  }

  function finish(){
    const inc = parseFloat(income) || 0;
    const newData = loadData();
    newData.income = inc;
    newData.onboardingDone = true;
    newData.profile = { name, job, living, goals };
    saveData(newData);
    onDone(newData);
  }

  const steps = [
    // Step 0: Welcome
    <div key={0} style={{textAlign:'center', padding:'20px 0'}}>
      <div style={{fontSize:56, marginBottom:20}}>👋</div>
      <h2 style={{fontFamily:'var(--ff-head)', fontSize:28, fontWeight:800, letterSpacing:-1, marginBottom:14}}>
        {t ? 'Welcome to FinWise!' : 'أهلاً بك في FinWise!'}
      </h2>
      <p style={{color:'var(--text2)', fontSize:15, lineHeight:1.8, maxWidth:400, margin:'0 auto 28px'}}>
        {t
          ? "Let's set up your personalized financial plan in under 2 minutes. We'll ask you a few quick questions to get started."
          : 'سنعدّ خطتك المالية الشخصية في أقل من دقيقتين. سنسألك بعض الأسئلة السريعة للبدء.'}
      </p>
      <div style={{display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap', marginBottom:32}}>
        {[
          {icon:'🔒', label: t?'Private':'خاص'},
          {icon:'⚡', label: t?'2 minutes':'دقيقتان'},
          {icon:'🆓', label: t?'100% Free':'مجاني كلياً'},
        ].map((b,i)=>(
          <div key={i} style={{background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:10, padding:'10px 18px', textAlign:'center'}}>
            <div style={{fontSize:20}}>{b.icon}</div>
            <div style={{fontSize:12, color:'var(--text2)', marginTop:4}}>{b.label}</div>
          </div>
        ))}
      </div>
      <button className="btn-fw" style={{fontSize:16, padding:'14px 36px'}} onClick={()=>setStep(1)}>
        {t ? "Let's go →" : 'هيا نبدأ ←'}
      </button>
    </div>,

    // Step 1: Name
    <div key={1}>
      <div style={{textAlign:'center', marginBottom:28}}>
        <div style={{fontSize:40, marginBottom:12}}>🙋</div>
        <h3 style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:700, marginBottom:8}}>
          {t ? "What's your name?" : 'ما اسمك؟'}
        </h3>
        <p style={{color:'var(--text2)', fontSize:14}}>{t ? 'So we can personalize your experience.' : 'حتى نخصص تجربتك.'}</p>
      </div>
      <input className="fw-input" style={{fontSize:18, textAlign:'center', marginBottom:24}}
        placeholder={t ? 'Your name...' : 'اسمك...'}
        value={name} onChange={e=>setName(e.target.value)}
        autoFocus/>
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn-fw-outline" onClick={()=>setStep(0)}>{t?'← Back':'→ رجوع'}</button>
        <button className="btn-fw" onClick={()=>setStep(2)}>
          {name.trim() ? (t?'Next →':'التالي ←') : (t?'Skip →':'تخطي ←')}
        </button>
      </div>
    </div>,

    // Step 2: Income
    <div key={2}>
      <div style={{textAlign:'center', marginBottom:24}}>
        <div style={{fontSize:40, marginBottom:12}}>💰</div>
        <h3 style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:700, marginBottom:8}}>
          {t ? "What's your monthly income?" : 'ما دخلك الشهري؟'}
        </h3>
        <p style={{color:'var(--text2)', fontSize:14}}>
          {t ? 'Enter your net income after any deductions.' : 'أدخل دخلك الصافي بعد الخصومات.'}
        </p>
      </div>
      <div style={{maxWidth:300, margin:'0 auto 12px'}}>
        <div className="input-prefix">
          <span className="prefix-label">EGP</span>
          <input className="fw-input" type="number" min="0"
            style={{fontSize:22, fontWeight:700, textAlign:'center', paddingLeft:50}}
            placeholder="0" value={income} onChange={e=>setIncome(e.target.value)} autoFocus/>
        </div>
      </div>
      {income && parseFloat(income) > 0 && (
        <div style={{textAlign:'center', marginBottom:20}}>
          {[
            {label: t?'Suggested spending':'مصاريف مقترحة', val: parseFloat(income)*0.60, color:'var(--accent3)'},
            {label: t?'Savings':'ادخار', val: parseFloat(income)*0.20, color:'var(--success)'},
            {label: t?'Investment':'استثمار', val: parseFloat(income)*0.20, color:'var(--accent2)'},
          ].map((r,i)=>(
            <div key={i} style={{display:'inline-block', margin:'4px 6px', background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'6px 14px'}}>
              <div style={{fontSize:11, color:'var(--text3)'}}>{r.label}</div>
              <div style={{fontFamily:'var(--ff-head)', fontSize:14, color:r.color, fontWeight:700}}>EGP {Math.round(r.val).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn-fw-outline" onClick={()=>setStep(1)}>{t?'← Back':'→ رجوع'}</button>
        <button className="btn-fw" onClick={()=>setStep(3)}>{t?'Next →':'التالي ←'}</button>
      </div>
    </div>,

    // Step 3: Job + Living
    <div key={3}>
      <div style={{textAlign:'center', marginBottom:20}}>
        <div style={{fontSize:40, marginBottom:12}}>🏡</div>
        <h3 style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:700, marginBottom:6}}>
          {t ? 'Tell us about your situation' : 'أخبرنا عن وضعك'}
        </h3>
        <p style={{color:'var(--text2)', fontSize:13}}>{t?'Helps us give better advice.':'يساعدنا على تقديم نصائح أفضل.'}</p>
      </div>
      <div style={{marginBottom:16}}>
        <label className="fw-label">{t?'Employment status':'الوضع الوظيفي'}</label>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
          {jobOptions.map(([val, label])=>(
            <button key={val} className={`cat-chip ${job===val?'selected':''}`}
              style={job===val?{borderColor:'var(--accent)', color:'var(--accent)', background:'var(--accent-dim)'}:{}}
              onClick={()=>setJob(val)}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{marginBottom:20}}>
        <label className="fw-label">{t?'Living situation':'وضع السكن'}</label>
        <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:6}}>
          {livingOptions.map(([val, label])=>(
            <button key={val} className={`cat-chip ${living===val?'selected':''}`}
              style={living===val?{borderColor:'var(--accent)', color:'var(--accent)', background:'var(--accent-dim)'}:{}}
              onClick={()=>setLiving(val)}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn-fw-outline" onClick={()=>setStep(2)}>{t?'← Back':'→ رجوع'}</button>
        <button className="btn-fw" onClick={()=>setStep(4)}>{t?'Next →':'التالي ←'}</button>
      </div>
    </div>,

    // Step 4: Goals
    <div key={4}>
      <div style={{textAlign:'center', marginBottom:20}}>
        <div style={{fontSize:40, marginBottom:12}}>🎯</div>
        <h3 style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:700, marginBottom:6}}>
          {t ? "What are your financial goals?" : 'ما أهدافك المالية؟'}
        </h3>
        <p style={{color:'var(--text2)', fontSize:13}}>{t?'Pick all that apply.':'اختر كل ما ينطبق عليك.'}</p>
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:10, marginBottom:24, justifyContent:'center'}}>
        {goalOptions.map(([id, label])=>(
          <button key={id}
            className={`cat-chip ${goals.includes(id)?'selected':''}`}
            style={goals.includes(id)?{borderColor:'var(--accent)', color:'var(--accent)', background:'var(--accent-dim)', fontSize:14, padding:'10px 16px'}:{fontSize:14, padding:'10px 16px'}}
            onClick={()=>toggleGoal(id)}>{label}</button>
        ))}
      </div>
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn-fw-outline" onClick={()=>setStep(3)}>{t?'← Back':'→ رجوع'}</button>
        <button className="btn-fw" onClick={()=>setStep(5)}>{t?'Next →':'التالي ←'}</button>
      </div>
    </div>,

    // Step 5: Done
    <div key={5} style={{textAlign:'center', padding:'10px 0'}}>
      <div style={{fontSize:60, marginBottom:16}}>🎉</div>
      <h2 style={{fontFamily:'var(--ff-head)', fontSize:26, fontWeight:800, letterSpacing:-1, marginBottom:10}}>
        {name ? (t ? `You're all set, ${name}!` : `كل شيء جاهز، ${name}!`) : (t ? "You're all set!" : 'كل شيء جاهز!')}
      </h2>
      <p style={{color:'var(--text2)', fontSize:14, lineHeight:1.8, maxWidth:380, margin:'0 auto 24px'}}>
        {t
          ? "Your personalized financial plan is ready. Start by adding your first expense or exploring your dashboard."
          : 'خطتك المالية الشخصية جاهزة. ابدأ بإضافة أول مصروف أو استكشاف لوحة التحكم.'}
      </p>
      {goals.length > 0 && (
        <div style={{background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:12, padding:'14px 20px', marginBottom:24, display:'inline-block', textAlign:'left'}}>
          <div style={{fontSize:12, color:'var(--text3)', marginBottom:8, textTransform:'uppercase', letterSpacing:1}}>{t?'Your goals':'أهدافك'}</div>
          {goals.map(g=>{
            const opt = goalOptions.find(([id])=>id===g);
            return opt ? <div key={g} style={{fontSize:13, marginBottom:4}}>{opt[1]}</div> : null;
          })}
        </div>
      )}
      {income && parseFloat(income) > 0 && (
        <div style={{marginBottom:24}}>
          <div style={{background:'var(--accent-dim)', border:'1px solid rgba(184,240,80,.3)', borderRadius:12, padding:'12px 20px', display:'inline-block'}}>
            <div style={{fontSize:12, color:'var(--text3)', marginBottom:4}}>{t?'Your monthly income':'دخلك الشهري'}</div>
            <div style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:800, color:'var(--accent)'}}>EGP {Math.round(parseFloat(income)).toLocaleString()}</div>
          </div>
        </div>
      )}
      <div style={{display:'flex', gap:10, justifyContent:'center'}}>
        <button className="btn-fw-outline" onClick={()=>setStep(4)}>{t?'← Back':'→ رجوع'}</button>
        <button className="btn-fw" style={{fontSize:16, padding:'13px 32px'}} onClick={finish}>
          {t ? '🚀 Go to Dashboard' : '🚀 انطلق للوحة التحكم'}
        </button>
      </div>
    </div>,
  ];

  return(
    <div style={{position:'fixed', inset:0, background:'var(--bg)', zIndex:4000, display:'flex', alignItems:'center', justifyContent:'center', padding:20, overflowY:'auto'}}>
      <div style={{width:'100%', maxWidth:520}}>
        {/* Header */}
        <div style={{textAlign:'center', marginBottom:28}}>
          <div style={{fontFamily:'var(--ff-head)', fontSize:22, fontWeight:800, color:'var(--accent)', marginBottom:16}}>Fin<span style={{color:'var(--text)'}}>Wise</span></div>
          {step > 0 && step < totalSteps && (
            <>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text3)', marginBottom:6}}>
                <span>{t?`Step ${step} of ${totalSteps-1}`:`الخطوة ${step} من ${totalSteps-1}`}</span>
                <span>{pct}%</span>
              </div>
              <div className="prog-bar-bg">
                <div className="prog-bar-fill" style={{width:pct+'%', background:'var(--accent)'}}></div>
              </div>
            </>
          )}
        </div>

        {/* Card */}
        <div style={{background:'var(--card-bg)', border:'1px solid var(--border2)', borderRadius:20, padding:'32px 28px', boxShadow:'0 24px 60px rgba(0,0,0,.3)'}}>
          {steps[step]}
        </div>

        {/* Skip all */}
        {step > 0 && step < totalSteps && (
          <div style={{textAlign:'center', marginTop:16}}>
            <button onClick={finish} style={{background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:13, textDecoration:'underline'}}>
              {t ? 'Skip setup and go to dashboard' : 'تخطي الإعداد والذهاب للوحة التحكم'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


// ── SCROLL TO TOP ──────────────────────────────────────
function ScrollTopBtn(){
  const [show,setShow]=useState(false);
  useEffect(()=>{
    const h=()=>setShow(window.scrollY>300);
    window.addEventListener('scroll',h);
    return()=>window.removeEventListener('scroll',h);
  },[]);
  return(
    <button className={`scroll-top ${show?'show':''}`}
      onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
      <i className="bi bi-chevron-up"></i>
    </button>
  );
}

// ── CONFETTI ───────────────────────────────────────────
function launchConfetti(){
  const colors=['#b8f050','#50c8f0','#f09050','#f05080','#c050f0','#50d090'];
  for(let i=0;i<70;i++){
    const el=document.createElement('div');
    el.className='confetti-piece';
    const size=Math.random()*10+5;
    el.style.cssText=`left:${Math.random()*100}vw;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'3px'};animation-duration:${Math.random()*2+1.5}s;animation-delay:${Math.random()*.6}s;`;
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),(Math.random()*2+1.5)*1000+600);
  }
}

// ── PROGRESS RING ──────────────────────────────────────
function ProgressRing({pct,size=76,stroke=5,score}){
  const r=(size-stroke*2)/2;
  const circ=2*Math.PI*r;
  const offset=circ-(Math.min(100,pct)/100)*circ;
  const cls=score>=70?'score-ring-good':score>=50?'score-ring-ok':'score-ring-bad';
  return(
    <svg width={size} height={size} className="progress-ring">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg4)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        className={`progress-ring-circle ${cls}`}/>
    </svg>
  );
}

// ── SMART INSIGHTS ─────────────────────────────────────
function SmartInsights({data,lang}){
  const tl=lang==='en';
  const expenses=data.expenses||[];
  const income=data.income||0;
  const thisMonth=new Date().toISOString().slice(0,7);
  const lastMonth=new Date(new Date().getFullYear(),new Date().getMonth()-1,1).toISOString().slice(0,7);
  const thisExp=expenses.filter(e=>e.date.startsWith(thisMonth));
  const lastExp=expenses.filter(e=>e.date.startsWith(lastMonth));
  const thisTotal=thisExp.reduce((s,e)=>s+e.amount,0);
  const lastTotal=lastExp.reduce((s,e)=>s+e.amount,0);
  const insights=[];

  const catTotals={};
  thisExp.forEach(e=>{catTotals[e.category]=(catTotals[e.category]||0)+e.amount;});
  const topCat=Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0];

  if(lastTotal>0&&thisTotal>0){
    const diff=Math.round((thisTotal-lastTotal)/lastTotal*100);
    if(diff>15) insights.push({icon:'📈',color:'#f05050',title:tl?`Spending up ${diff}% vs last month`:`الإنفاق ارتفع ${diff}٪ عن الشهر الماضي`,desc:tl?`EGP ${Math.round(thisTotal-lastTotal).toLocaleString()} more than last month.`:`${Math.round(thisTotal-lastTotal).toLocaleString()} جنيه أكثر من الشهر الماضي.`});
    else if(diff<-10) insights.push({icon:'📉',color:'#50d090',title:tl?`Spending down ${Math.abs(diff)}% — great!`:`الإنفاق انخفض ${Math.abs(diff)}٪ — رائع!`,desc:tl?`Saved EGP ${Math.round(lastTotal-thisTotal).toLocaleString()} vs last month.`:`وفّرت ${Math.round(lastTotal-thisTotal).toLocaleString()} جنيه مقارنة بالشهر الماضي.`});
  }

  if(topCat&&income>0&&topCat[1]>income*.15){
    const cat=EXPENSE_CATS.find(c=>c.id===topCat[0]);
    insights.push({icon:cat?.icon||'💸',color:'#f09050',title:tl?`${cat?.id} is your biggest spend`:`${T[lang].cats[topCat[0]]||topCat[0]} أكبر مصاريفك`,desc:tl?`EGP ${Math.round(topCat[1]).toLocaleString()} — ${Math.round(topCat[1]/income*100)}% of income.`:`${Math.round(topCat[1]).toLocaleString()} جنيه — ${Math.round(topCat[1]/income*100)}٪ من دخلك.`});
  }

  if(income>0&&thisTotal>0){
    const surplus=income-thisTotal;
    const rate=Math.round(surplus/income*100);
    if(surplus>0) insights.push({icon:'🏦',color:'#50d090',title:tl?`Saving ${rate}% this month`:`تدخر ${rate}٪ هذا الشهر`,desc:tl?`EGP ${Math.round(surplus).toLocaleString()} available for savings.`:`${Math.round(surplus).toLocaleString()} جنيه متاح للادخار.`});
    const dayOfMonth=new Date().getDate();
    const projected=Math.round(thisTotal/dayOfMonth*new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate());
    if(projected>income*.9) insights.push({icon:'⚡',color:'#f0c050',title:tl?'Projected to overspend this month':'متوقع تجاوز الميزانية هذا الشهر',desc:tl?`Projected end-of-month: EGP ${projected.toLocaleString()}.`:`المتوقع نهاية الشهر: ${projected.toLocaleString()} جنيه.`});
  }

  if(!insights.length&&thisExp.length>0) insights.push({icon:'✨',color:'#b8f050',title:tl?'Everything looks great!':'كل شيء يبدو رائعاً!',desc:tl?'Keep up the excellent financial habits.':'استمر في عاداتك المالية الممتازة.'});

  if(!insights.length) return null;
  return(
    <div className="fw-card" style={{marginTop:16}}>
      <div className="fw-card-title">💡 {tl?'Smart Insights':'رؤى ذكية'}</div>
      {insights.map((ins,i)=>(
        <div key={i} className="insight-card" style={{background:ins.color+'12',borderColor:ins.color+'33'}}>
          <div className="insight-icon" style={{background:ins.color+'22',color:ins.color}}>{ins.icon}</div>
          <div>
            <div style={{fontWeight:600,fontSize:13,marginBottom:3,color:'var(--text)'}}>{ins.title}</div>
            <div style={{fontSize:12,color:'var(--text2)'}}>{ins.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── APP ─────────────────────────────────────────────

// ── RESET BUTTON ───────────────────────────────────────
function ResetButton({lang, onReset}){
  const [open, setOpen] = useState(false);
  const [wiping, setWiping] = useState(false);
  const tl = lang === 'en';

  function doReset(){
    setWiping(true);
    setTimeout(()=>{
      localStorage.removeItem('finwise_v4');
      onReset();
      setOpen(false);
      setWiping(false);
    }, 500);
  }

  return(
    <>
      <div className="reset-btn-wrap">
        <button
          className="reset-btn fw-tooltip"
          data-tip={tl ? 'Reset all data' : 'مسح جميع البيانات'}
          onClick={()=>setOpen(true)}
          title={tl ? 'Reset all data' : 'مسح جميع البيانات'}>
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
      </div>

      {open && (
        <div className="reset-modal-overlay" onClick={e=>{if(e.target===e.currentTarget)setOpen(false);}}>
          <div className={`reset-modal ${wiping?'wiping':''}`}>
            <span className="reset-modal-icon">🗑️</span>
            <h3>{tl ? 'Reset All Data?' : 'مسح جميع البيانات؟'}</h3>
            <p>{tl
              ? 'This will permanently delete everything you have entered in FinWise. This action cannot be undone.'
              : 'سيتم حذف كل ما أدخلته في FinWise بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.'}</p>
            <ul className="reset-warning-list">
              {[
                tl?'All expenses & transactions':'جميع المصاريف والمعاملات',
                tl?'Budget plan & income':'خطة الميزانية والدخل',
                tl?'Financial goals':'الأهداف المالية',
                tl?'Recurring bills':'الفواتير الثابتة',
                tl?'Onboarding profile':'بيانات الإعداد الأولي',
              ].map((item,i)=>(
                <li key={i}>{item}</li>
              ))}
            </ul>
            <button className="btn-reset-confirm" onClick={doReset}>
              <i className="bi bi-trash3-fill"></i>
              {tl ? 'Yes, delete everything' : 'نعم، احذف كل شيء'}
            </button>
            <button className="btn-reset-cancel" onClick={()=>setOpen(false)}>
              {tl ? 'Cancel, keep my data' : 'إلغاء، احتفظ ببياناتي'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function App(){
  const [theme,setTheme]=useState('dark');
  const [lang,setLang]=useState('en');
  const [page,setPage]=useState('home');
  const [data,setData]=useState(loadData);
  const [toasts,setToasts]=useState([]);
  const [showQuickAdd,setShowQuickAdd]=useState(false);
  const [showOnboarding,setShowOnboarding]=useState(!loadData().onboardingDone);

  function handleOnboardingDone(newData){
    setData(newData);
    setShowOnboarding(false);
    if(newData.income>0) setPage('home');
  }

  function handleReset(){
    const fresh={income:0,expenses:[],goals:[],recurring:[],ratesCache:null,ratesCacheDate:null,onboardingDone:false};
    setData(fresh);
    setShowOnboarding(true);
    setPage('home');
    addToast('✅',lang==='en'?'Data cleared!':'تم مسح البيانات!',lang==='en'?'Starting fresh...':'بداية جديدة...');
  }

  useEffect(()=>{document.body.setAttribute('data-theme',theme);},[theme]);
  useEffect(()=>{document.documentElement.setAttribute('dir',lang==='ar'?'rtl':'ltr');},[lang]);

  function addToast(icon,title,msg){
    const id=Date.now();
    setToasts(t=>[...t,{id,icon,title,msg}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3500);
  }

  // Recurring due alerts on load
  // Global Escape closes any open popup
  useEffect(()=>{
    const h=e=>{
      if(e.key==='Escape'){
        if(showQuickAdd)setShowQuickAdd(false);
      }
    };
    window.addEventListener('keydown',h);
    return()=>window.removeEventListener('keydown',h);
  },[showQuickAdd]);

  useEffect(()=>{
    const recs=data.recurring||[];
    const today=new Date().getDate();
    recs.forEach(r=>{
      const diff=r.dueDay-today;
      if(diff===0)addToast('🔔',lang==='en'?`${r.name} is due today!`:`${r.name} مستحق اليوم!`,fmtEGP(r.amount));
      else if(diff===1)addToast('⚠️',lang==='en'?`${r.name} due tomorrow`:`${r.name} مستحق غداً`,fmtEGP(r.amount));
    });
    if(data.onboardingDone&&data.profile?.name){
      const h=new Date().getHours();
      const g=h<12?'Good morning':h<17?'Good afternoon':'Good evening';
      setTimeout(()=>addToast('👋',`${g}, ${data.profile.name}!`,lang==='en'?'Welcome back to FinWise':'مرحباً بعودتك إلى FinWise'),900);
    }
  },[]);

  const thisMonth=getMonthKey(new Date());
  const monthExp=(data.expenses||[]).filter(e=>e.date.startsWith(thisMonth)).reduce((s,e)=>s+e.amount,0);
  const hasAlert=data.income>0&&monthExp>data.income*.8;
  const today=new Date().getDate();
  const hasRecurringAlert=(data.recurring||[]).some(r=>{const d=r.dueDay-today;return d>=0&&d<=3;});
  const alerts={tracker:hasAlert,recurring:hasRecurringAlert};

  const props={data,setData,addToast,lang};
  const pages={
    home:<HomePage setPage={setPage} onQuickAdd={()=>setShowQuickAdd(true)} {...props}/>,
    tracker:<TrackerPage {...props}/>,
    history:<HistoryPage {...props}/>,
    plan:<PlanPage {...props}/>,
    goals:<GoalsPage {...props}/>,
    converter:<ConverterPage {...props}/>,
    recurring:<RecurringPage {...props}/>,
    learn:<LearnPage lang={lang}/>,
  };

  return(
    <>
      {showOnboarding && <OnboardingWizard onDone={handleOnboardingDone} lang={lang}/>}
      {!showOnboarding && <>
        <Navbar page={page} setPage={setPage} theme={theme} toggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')}
          lang={lang} toggleLang={()=>setLang(l=>l==='en'?'ar':'en')} alerts={alerts} onQuickAdd={()=>setShowQuickAdd(true)}/>
        {pages[page]||pages['home']}
        {showQuickAdd&&<QuickAddPopup onClose={()=>setShowQuickAdd(false)} {...props}/>}
        <ExpandingNav page={page} setPage={setPage} lang={lang} theme={theme}
          toggleTheme={()=>setTheme(t=>t==='dark'?'light':'dark')}
          toggleLang={()=>setLang(l=>l==='en'?'ar':'en')}
          alerts={alerts} onQuickAdd={()=>setShowQuickAdd(true)}/>
      </>}
      <ToastContainer toasts={toasts}/>
      {!showOnboarding&&<ResetButton lang={lang} onReset={handleReset}/>}
      <ScrollTopBtn/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
