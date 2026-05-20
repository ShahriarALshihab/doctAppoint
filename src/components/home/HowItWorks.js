const steps = [
  { icon: "🔍", step: "01", title: "Find a Doctor", desc: "Browse our directory of verified specialist doctors across all medical fields." },
  { icon: "📅", step: "02", title: "Book Appointment", desc: "Choose your preferred date and time slot that fits your schedule." },
  { icon: "✅", step: "03", title: "Get Confirmation", desc: "Receive instant confirmation with all appointment details via your dashboard." },
  { icon: "🩺", step: "04", title: "Visit Doctor", desc: "Visit the doctor at your scheduled time and get the care you need." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block bg-teal-50 text-teal-600 px-4 py-1 rounded-full text-sm font-semibold mb-3">
            🔄 Simple Process
          </span>
          <h2 className="section-title mb-3">How It Works</h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Book your doctor appointment in just 4 simple steps — fast, easy, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-100 z-0" />
              )}
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 border border-slate-100">
                  {step.icon}
                </div>
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                  Step {step.step}
                </span>
                <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}