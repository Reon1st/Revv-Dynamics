import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition mb-12 font-mono uppercase tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Revv Dynamics
      </Link>
      <h1 className="font-display font-bold text-4xl text-ink mb-6">Privacy Policy</h1>
      <p className="text-muted leading-relaxed">
        Revv Dynamics collects only the information you provide through our contact form (name, email, phone, vehicle details) and uses it solely to respond to your inquiry. We do not sell, share, or use your data for marketing purposes. All information is stored securely and may be deleted upon request. Contact us at info@revvdynamics.com with any questions.
      </p>
    </div>
  )
}
