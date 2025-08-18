export function SocialProof() {
  return (
    <div className="rounded-2xl border border-gray-200 p-6 text-center shadow-soft">
      <p className="text-gray-700">Más de 20 profesionales ya aplicando estas automatizaciones.</p>
      <div className="mt-4 flex justify-center -space-x-2" aria-label="Avatares de usuarios">
        {[1, 2, 3, 4, 5].map((n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={n}
            src={`https://api.dicebear.com/7.x/initials/svg?seed=U${n}`}
            alt={`Avatar usuario ${n}`}
            className="h-10 w-10 rounded-full border-2 border-white"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

