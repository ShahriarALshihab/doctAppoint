const features = [
  { icon: "🏥", title: "Verified Doctors", desc: "All doctors are thoroughly verified with valid medical licenses and credentials.", color: "bg-blue-50 text-blue-600" },
  { icon: "⚡", title: "Instant Booking", desc: "Book appointments in under 2 minutes. No long calls or waiting in queues.", color: "bg-teal-50 text-teal-600" },
  { icon: "🔒", title: "Secure & Private", desc: "Your medical data is encrypted and protected with the highest security standards.", color: "bg-indigo-50 text-indigo-600" },
  { icon: "💰", title: "Transparent Fees", desc: "No hidden charges. See doctor consultation fees clearly before booking.", color: "bg-amber-50 text-amber-600" },
  { icon: "📱", title: "24/7 Access", desc: "Manage your bookings anytime, anywhere from your phone or computer.", color: "bg-rose-50 text-rose-600" },
  { icon: "⭐", title: "Patient Reviews", desc: "Read honest reviews from verified patients to choose the right doctor.", color: "bg-green-50 text-green-600" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              💙 Why Us
            </span>
            <h2 className="section-title mb-4">
              Why Choose <span className="text-blue-600">DocAppoint?</span>
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              We make healthcare accessible and convenient for everyone in Bangladesh. 
              Our platform connects patients with the right doctors at the right time.
            </p>
            <div className="flex gap-8">
              {[{ num: "50+", label: "Doctors" }, { num: "10K+", label: "Happy Patients" }, { num: "99%", label: "Satisfaction" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-blue-600" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.num}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 bg-amber-50 rounded-2xl border border-slate-100 hover:shadow-2xl transition-all duration-300 group">
                <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}