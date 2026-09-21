// Fit the original logo artwork, excluding its transparent outer margins.
export default function BrandLogo({ className }) {
  return (
    <svg className={className} viewBox="590 392 868 435" role="img" aria-label="Soul of Seoul">
      <image href="/assets/soul-of-seoul-logo.png" width="2048" height="1219" />
    </svg>
  )
}
