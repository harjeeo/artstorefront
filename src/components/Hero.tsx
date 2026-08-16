export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/seed/hero-bg/1600/700')" }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center">
          <p className="text-white/90 font-semibold tracking-wide uppercase text-sm mb-3">
            Handmade &middot; Original &middot; One of a kind
          </p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6">
            Discover art made with heart
          </h1>
          <p className="text-white/85 text-base sm:text-lg mb-8 max-w-md">
            Shop unique pieces from independent artists and small creators around the world.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand hover:bg-brand-dark text-white font-semibold text-base transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}
