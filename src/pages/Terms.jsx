import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 max-w-3xl mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition mb-12 font-mono uppercase tracking-widest">
        <ArrowLeft className="h-4 w-4" /> Back to Revv Dynamics
      </Link>
      <h1 className="font-display font-bold text-4xl text-ink mb-6">Terms of Service</h1>
      <p className="text-muted leading-relaxed">
        By using the Revv Dynamics website you agree to these terms. The content on this site is provided for informational purposes only. Revv Dynamics reserves the right to modify services and pricing without notice. All work performed is subject to a separate written service agreement. Contact info@revvdynamics.com for any questions.
      </p>
    </div>
  )
}
