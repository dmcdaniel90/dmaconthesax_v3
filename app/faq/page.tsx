import FAQ from "@/app/faq/FAQ"
import Footer from "@/app/layout/Footer"

export default function FAQPage() {
    return (
        <main className="mt-16 min-h-screen bg-gradient-to-br from-gray-900/70 via-gray-800/70 to-gray-900/70">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24 xl:py-32">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMkFDQUMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#02ACAC] to-transparent mx-auto mb-8"></div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#02ACAC] bg-clip-text text-transparent mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Find answers to common questions about our services
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 lg:p-12 border border-gray-700/30 shadow-2xl">
                <FAQ showTitle={false} />
            </section>

            <Footer />
        </main>
    )
}
