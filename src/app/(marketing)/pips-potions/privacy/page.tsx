import React from "react";
import { generateMetadata } from '@/utils';

export const metadata = generateMetadata({
  title: "Pip's Potions Privacy Policy - RhythmiqCX",
  description: "How the Pip's Potions mobile game handles your data: progress saved on your phone, ads by Google AdMob with your consent, and anonymous gameplay analytics.",
  alternates: {
    canonical: "/pips-potions/privacy"
  },
});

export default function PipsPotionsPrivacyPage() {
  return (
    <div className="paper-surface bg-paper text-ink font-sans flex flex-col">
      <section className="section-tight text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="eyebrow justify-center">Legal</span>
          <h1 className="h-section mt-3">Pip&apos;s Potions Privacy Policy</h1>
          <p className="lede mt-3 max-w-2xl mx-auto">
            What our potion puzzle game collects, why, and the choices you have.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none prose-headings:font-sans prose-headings:text-ink prose-p:text-ink2 prose-li:text-ink2 prose-a:text-coral prose-a:no-underline hover:prose-a:underline">
            <p className="text-ink2">Last updated: October 3, 2026</p>
            <p className="text-ink2">
              Pip&apos;s Potions: Brew &amp; Sort (the &quot;Game&quot;) is a mobile puzzle game made by
              RhythmiqCX Inc. (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). This policy explains what
              information is collected when you play the Game and how it is used. It only covers the Game.
            </p>

            <h2 className="font-bold mt-8 text-ink">1. What we don&apos;t collect</h2>
            <p className="text-ink2">
              The Game has no accounts or sign-in. We don&apos;t ask for your name, email address, phone
              number, contacts, photos or location. Your progress (levels, stars, essence, boosters and
              settings) is saved only on your phone, along with a random ID created by the Game. That data
              never leaves your device, and uninstalling the Game deletes it.
            </p>

            <h2 className="font-bold mt-8 text-ink">2. Advertising (Google AdMob)</h2>
            <p className="text-ink2">
              The Game is free and shows ads through Google AdMob, including optional ads you can choose to
              watch for rewards. To show and measure ads, Google may collect information from your device,
              such as your device&apos;s advertising ID, IP address, device and app details, and how you
              interact with ads. Where you allow it, ads may be personalized.
            </p>
            <p className="text-ink2">
              If you are in the UK, the European Economic Area or Switzerland, the Game asks for your consent
              before ads are personalized, using Google&apos;s consent form. You can change your choice at any
              time under Settings, Privacy options in the Game. On Android you can also reset or delete your
              advertising ID in your phone&apos;s settings. To learn how Google uses this information, see{" "}
              <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                how Google uses information from apps that use its services
              </a>.
            </p>

            <h2 className="font-bold mt-8 text-ink">3. Gameplay analytics (GameAnalytics)</h2>
            <p className="text-ink2">
              We use GameAnalytics to understand how the Game is played so we can improve it, for example
              which levels players finish or find too hard. It receives anonymous gameplay events (such as
              level started or completed, moves and stars), session times, device model, operating system
              version, an anonymous device identifier and an approximate country based on IP address. It does
              not receive your name or contact details. See the{" "}
              <a href="https://gameanalytics.com/privacy" target="_blank" rel="noopener noreferrer">
                GameAnalytics privacy policy
              </a>.
            </p>

            <h2 className="font-bold mt-8 text-ink">4. How we use information</h2>
            <ul className="text-ink2">
              <li>To run the Game and save your progress on your phone.</li>
              <li>To show ads that keep the Game free, and to give you rewards for the ads you choose to watch.</li>
              <li>To find and fix problems and make levels more fun.</li>
            </ul>
            <p className="text-ink2">We don&apos;t sell your personal information.</p>

            <h2 className="font-bold mt-8 text-ink">5. Children</h2>
            <p className="text-ink2">
              The Game is meant for players aged 13 and over and is not directed at children under 13. We
              don&apos;t knowingly collect personal information from children under 13. If you believe a child
              has used the Game and data was collected, contact us and we will help remove it.
            </p>

            <h2 className="font-bold mt-8 text-ink">6. Keeping and deleting data</h2>
            <p className="text-ink2">
              Data saved on your phone stays there until you uninstall the Game. Google and GameAnalytics keep
              the data they receive according to their own policies. You can ask us to request deletion of
              analytics data linked to your device by emailing us with the date you played.
            </p>

            <h2 className="font-bold mt-8 text-ink">7. Your rights</h2>
            <p className="text-ink2">
              Depending on where you live (for example under the GDPR, UK GDPR or California law), you may have
              the right to access, correct or delete personal information, to object to or limit its use, and
              to opt out of personalized ads. To use any of these rights, email us. You can also complain to
              your local data protection authority.
            </p>

            <h2 className="font-bold mt-8 text-ink">8. Changes to this policy</h2>
            <p className="text-ink2">
              If we change this policy, we will update it on this page and change the date at the top.
            </p>

            <h2 className="font-bold mt-8 text-ink">9. Contact us</h2>
            <p className="text-ink2">
              Questions or requests about your privacy in Pip&apos;s Potions:{" "}
              <a href="mailto:support@rhythmiqcx.com">support@rhythmiqcx.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
