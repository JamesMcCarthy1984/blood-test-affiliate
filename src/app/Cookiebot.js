// Server component - outputs script tag directly in head
export default function Cookiebot() {
  return (
    <script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="81334869-f43d-4e33-8362-5c98fa5a65ec"
      data-blockingmode="auto"
      async
      defer
    />
  )
}
