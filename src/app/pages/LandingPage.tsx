import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { changeLanguage } from '@/services/localizationService';
import { StarShield, ShieldCalculator } from '@/icons';

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ar';
  const isRTL = currentLang === 'ar';

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    changeLanguage(lang);
  };

  useEffect(() => {
    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const elements = document.querySelectorAll('[data-scroll-reveal]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div 
      className="min-h-screen" 
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        background: 'linear-gradient(180deg, #1a1c1e 0%, #212325 50%, #2a2c2e 100%)',
        color: '#E7E9EB'
      }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-yellow-600/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center">
                <StarShield size={24} color="#000" />
              </div>
              <span className="text-xl font-bold text-gray-100">{t('header.title')}</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">{t('landing.nav.features')}</a>
              <a href="#benefits" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">{t('landing.nav.benefits')}</a>
              <a href="#demo" className="text-sm text-gray-400 hover:text-yellow-500 transition-colors">{t('landing.nav.demo')}</a>
              <div className="flex items-center gap-1.5 bg-black/20 rounded-xl p-1">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentLang === 'en'
                      ? 'bg-yellow-600 text-black'
                      : 'text-gray-500 hover:bg-white/5'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange('ar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentLang === 'ar'
                      ? 'bg-yellow-600 text-black'
                      : 'text-gray-500 hover:bg-white/5'
                  }`}
                >
                  AR
                </button>
              </div>
              <button 
                onClick={() => navigate('/calculator')}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-semibold text-sm hover:shadow-lg hover:shadow-yellow-600/20 transition-all"
              >
                {t('landing.nav.getStarted')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 px-6 relative overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(201, 162, 77, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(201, 162, 77, 0.05) 0%, transparent 50%),
            linear-gradient(180deg, transparent 0%, rgba(201, 162, 77, 0.02) 100%)
          `
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-600/10 border border-yellow-600/30 mb-6 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] opacity-0">
                <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wide">{t('landing.hero.badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
                <Trans
                  i18nKey="landing.hero.title"
                  values={{ zakat: t('landing.hero.zakat') }}
                  components={{
                    zakat: <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent" />
                  }}
                />
              </h1>
              
              <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] opacity-0">
                {t('landing.hero.subtitle')}
              </p>
              
              <div className="flex items-center gap-4 flex-wrap animate-[fadeInUp_0.8s_ease-out_0.4s_forwards] opacity-0">
              <button 
                onClick={() => navigate('/calculator')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold hover:shadow-lg hover:shadow-yellow-600/30 transition-all"
                style={{ boxShadow: '0 0 30px rgba(201, 162, 77, 0.3)' }}
              >
                {t('landing.hero.tryCalculator')}
              </button>
                <button 
                  onClick={() => navigate('/calculator')}
                  className="px-8 py-4 rounded-2xl border border-yellow-600/50 text-yellow-600 font-semibold hover:bg-yellow-600/10 transition-all"
                >
                  {t('landing.hero.watchDemo')}
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards] opacity-0">
                <div className="rounded-2xl p-5" style={{
                  background: 'rgba(201, 162, 77, 0.05)',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>2.5%</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{t('landing.hero.stats.zakatRate')}</p>
                </div>
                <div className="rounded-2xl p-5" style={{
                  background: 'rgba(201, 162, 77, 0.05)',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>4</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{t('landing.hero.stats.rulingSources')}</p>
                </div>
                <div className="rounded-2xl p-5" style={{
                  background: 'rgba(201, 162, 77, 0.05)',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>1-Click</p>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{t('landing.hero.stats.pdfExport')}</p>
                </div>
              </div>
            </div>
            
            {/* Right: App Screenshot/Preview */}
            <div className="animate-[float_6s_ease-in-out_infinite] animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black p-6" style={{
                border: '2px solid rgba(201, 162, 77, 0.3)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-yellow-600/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center">
                        <ShieldCalculator size={20} color="#000" innerColor="#fff" />
                      </div>
                      <span className="text-sm font-bold text-gray-200">{t('header.title')}</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  
                  {/* Excel Grid Preview */}
                  <div className="bg-black/40 rounded-xl p-4 border border-yellow-600/10">
                    <div className="grid grid-cols-4 gap-1 mb-2">
                      <div className="text-xs text-yellow-500 font-bold">A</div>
                      <div className="text-xs text-yellow-500 font-bold">B</div>
                      <div className="text-xs text-yellow-500 font-bold">C</div>
                      <div className="text-xs text-yellow-500 font-bold">D</div>
                    </div>
                    <div className="space-y-1">
                      <div className="grid grid-cols-4 gap-1">
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">1000</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">$150</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">$5.4k</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">3.2%</div>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">500</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">$280</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">$3.1k</div>
                        <div className="bg-gray-700/50 h-6 rounded text-xs flex items-center justify-center text-gray-400">2.8%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Result Preview */}
                  <div className="mt-4 bg-gradient-to-br from-yellow-600/20 to-yellow-700/10 rounded-xl p-4 border border-yellow-600/30">
                    <p className="text-xs text-gray-400 mb-1">{t('landing.hero.preview.totalAmountDue')}</p>
                    <p className="text-2xl font-black text-yellow-500 mono">$1,247.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <Trans
                i18nKey="landing.benefits.title"
                values={{ ourCalculator: t('landing.benefits.ourCalculator') }}
                components={{
                  ourCalculator: <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent" />
                }}
              />
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('landing.benefits.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { key: 'lightningFast', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { key: 'shariahCompliant', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { key: 'excelFirst', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { key: 'smartMapping', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
              { key: 'dualCalculation', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { key: 'pdfExport', icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { key: 'private', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
              { key: 'bilingual', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129' },
              { key: 'noInstall', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
            ].map((benefit, idx) => (
              <div
                key={idx}
                data-scroll-reveal
                className="rounded-3xl p-8 transition-all duration-400 scroll-reveal"
                style={{
                  background: 'linear-gradient(145deg, #2a2c2e, #212325)',
                  border: '1px solid rgba(201, 162, 77, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  opacity: 0,
                  transform: 'translateY(50px)',
                  transition: 'all 0.8s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.5)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(201, 162, 77, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(201, 162, 77, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
                }}
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-600/10 flex items-center justify-center mb-6 border border-yellow-600/30">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={benefit.icon}/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-100">{t(`landing.benefits.items.${benefit.key}.title`)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(`landing.benefits.items.${benefit.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <Trans
                i18nKey="landing.features.title"
                values={{ need: t('landing.features.need') }}
                components={{
                  need: <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent" />
                }}
              />
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Method */}
            <div className="rounded-3xl p-8" style={{
              background: 'linear-gradient(145deg, #2a2c2e, #212325)',
              border: '1px solid rgba(201, 162, 77, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/30">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-300">{t('landing.features.traditional.title')}</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'manual',
                  'hours',
                  'errors',
                  'noBreakdown',
                  'difficult',
                  'manualPdf'
                ].map((key, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-gray-400">{t(`landing.features.traditional.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Calculator */}
            <div className="rounded-3xl p-8" style={{
              background: 'linear-gradient(145deg, #2a2c2e, #212325)',
              border: '2px solid rgba(201, 162, 77, 0.5)',
              boxShadow: '0 0 30px rgba(201, 162, 77, 0.3)'
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center border border-yellow-600/50">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-yellow-500">{t('landing.features.ourCalculator.title')}</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'instant',
                  'upload',
                  'accurate',
                  'detailed',
                  'multiple',
                  'oneClick'
                ].map((key, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span className="text-gray-200 font-medium">{t(`landing.features.ourCalculator.items.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <Trans
                i18nKey="landing.howItWorks.title"
                values={{ threeSimple: t('landing.howItWorks.threeSimple') }}
                components={{
                  threeSimple: <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent" />
                }}
              />
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: '1', key: 'upload' },
              { num: '2', key: 'map' },
              { num: '3', key: 'results' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div 
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center text-3xl font-black text-black mx-auto mb-6"
                  style={{ boxShadow: '0 0 30px rgba(201, 162, 77, 0.3)' }}
                >
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-100">{t(`landing.howItWorks.steps.${step.key}.title`)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(`landing.howItWorks.steps.${step.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="demo" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-transparent to-yellow-700/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <Trans
              i18nKey="landing.cta.title"
              values={{ zakat: t('landing.cta.zakat') }}
              components={{
                zakat: <span className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent" />
              }}
            />
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-10">
            {t('landing.cta.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <button 
              onClick={() => navigate('/calculator')}
              className="px-12 py-5 rounded-2xl bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold text-lg hover:shadow-2xl hover:shadow-yellow-600/30 transition-all"
              style={{ boxShadow: '0 0 30px rgba(201, 162, 77, 0.3)' }}
            >
              {t('landing.cta.startCalculating')}
            </button>
            <button 
              onClick={() => navigate('/calculator')}
              className="px-12 py-5 rounded-2xl border-2 border-yellow-600/50 text-yellow-600 font-bold text-lg hover:bg-yellow-600/10 transition-all"
            >
              {t('landing.cta.watchTutorial')}
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex items-center justify-center gap-12 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>100%</p>
              <p className="text-sm text-gray-500 mt-1">{t('landing.cta.trust.shariahCompliant')}</p>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>0</p>
              <p className="text-sm text-gray-500 mt-1">{t('landing.cta.trust.dataCollection')}</p>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <p className="text-3xl font-black mono" style={{ color: '#C9A24D' }}>Free</p>
              <p className="text-sm text-gray-500 mt-1">{t('landing.cta.trust.forever')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-600/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-600 to-yellow-700 flex items-center justify-center">
                <StarShield size={24} color="#000" />
              </div>
              <div>
                <span className="text-lg font-bold text-gray-100">{t('header.title')}</span>
                <p className="text-xs text-gray-500">{t('landing.footer.tagline')}</p>
              </div>
            </div>
            <div className="flex items-center gap-8 flex-wrap">
              <a href="#" className="text-sm text-gray-500 hover:text-yellow-500 transition-colors">{t('landing.footer.privacy')}</a>
              <a href="#" className="text-sm text-gray-500 hover:text-yellow-500 transition-colors">{t('landing.footer.terms')}</a>
              <a href="#" className="text-sm text-gray-500 hover:text-yellow-500 transition-colors">{t('landing.footer.contact')}</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-600">
              {t('landing.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .scroll-reveal.active {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}

