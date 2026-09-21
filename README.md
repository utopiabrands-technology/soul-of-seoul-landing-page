# Soul of Seoul - Full Interactive Landing Page V6.1

This is the V6 full landing page with a dependency compatibility fix. The visual/site implementation is unchanged: the approved V5 WebGL condensation hero remains the opening experience, followed by the complete Soul of Seoul sitemap sections.

## Important: first launch on Windows
Extract this ZIP into a NEW folder and double-click:

`FIX_DEPENDENCIES_AND_START.bat`

This specifically fixes the `npm ERR! ERESOLVE unable to resolve dependency tree` problem by clearing any stale dependency tree and installing a pinned React 18 / React Three Fiber 8 stack.

After the first successful install, use `START_DEV.bat` for normal launches.

## Pinned compatible stack
- React 18.3.1
- React DOM 18.3.1
- React Three Fiber 8.18.0
- Three.js 0.170.0
- GSAP 3.13.0
- Vite 5.4.14
- Vite React plugin 4.3.4

## Included
- Approved interactive condensation hero retained from V5
- Frosted/liquid-glass UI system
- Rooted in Seoul story section
- Scroll-driven Brand Philosophy section
- Ecommerce-style Collection gateway
- Interactive Choose Your Mask section with four approved formulas
- Ingredient hover/tap visuals within each formula
- Choose Your Toner Pad section
- Amazon closing CTA and footer
- Responsive desktop/tablet/mobile layouts
- Reduced-motion fallbacks

## Normal development launch
Double-click `START_DEV.bat`, or run:

    npm install
    npm run dev

Open the Vite address, normally `http://127.0.0.1:5173`.

## Production build
Double-click `BUILD_PRODUCTION.bat`, or run:

    npm run build

The deployable website will be created in `dist/`.

## Amazon links
Product CTAs are still placeholders until final Amazon URLs are supplied.

See `SITE_CONTENT.md` for the implemented sitemap/copy.


V6.3 update: Philosophy section redesigned into a 4-step storytelling flow with the supplied floating bubble PNG and light-theme motion treatment.


V6.4: The React/Vite hero now uses the same 2D condensation canvas engine as the approved offline preview, eliminating the WebGL/offline mismatch. Navbar CTA rendering has also been repaired.


V6.6: Re-condensation now begins automatically after 650ms of pointer inactivity and restores the fog at a frame-rate-independent rate.


V6.7 update: Our Approach renamed to Our Philosophy, added to navbar/footer, philosophy reduced to the three approved pillars, body copy enlarged, and Our Story spacing tightened.


V6.8 update: collection card text-panel heights normalized; The Range dropdown chevron aligned.


V6.9: The full React/Vite hero now ports the exact condensation/re-condensation engine from the supplied approved offline-preview index.html, including the 900ms idle delay and 0.0035 per-frame fog recovery.


V6.10: Hero re-condensation now fully restores the untouched fog after mouse inactivity, eliminating residual brush trails while preserving the approved brush feel.


V6.11 hero cleanup: removed the extra visual wash and legacy WebGL code. The hero now uses only one condensation canvas above the background image.


V7 update: refreshed supplied imagery across Masks, Toner Pads, Our Philosophy and Amazon CTA; added 3D tilt to ingredient/product preview cards; updated Our Story copy and square corners; added Philosophy Shop Now CTA; retained the approved offline-preview hero condensation behavior while changing only the hero CTA finish to the frosted-glass site system.


V7.2 update:
- Our Story vertically centered with added top breathing room.
- Heritage second image replaced with the supplied Second Pic for Heritage asset.
- Sodium DNA (PDRN) ingredient image replaced with supplied Sodium PDRN asset.
- Collection Masks/Toner Pads cards updated with supplied category imagery.
- Final Amazon banner updated with supplied Last Banner Pic.
- Mask/Toner main visual geometry locked to matching dimensions and bottom-right preview placement.
- Navbar CTA remains matched to the hero glass CTA.
- Toner Pad ingredient preview remains Vitamin C Complex.
- Footer retains centered brand block and black/white glass Shop Now CTA above social links.


V7.4 updates:
- Moved OUR STORY eyebrow into the story copy, directly above Rooted in Seoul.
- Restored compact Our Story CTA sizing.
- Shifted the full three-image Our Story collage 10px downward.
- Re-applied the supplied Hydrogel Mask and Toner Pads collection portraits under new cache-busted filenames.


V7.5 update:
- Hydrogel Masks left visual composition now exactly matches Toner Pads dimensions and bottom-right preview placement across desktop/tablet/mobile.
- Toner Pads Vitamin C ingredient preview now uses contain/center fitting so the full image is visible from all sides.

V7.9 update:
- Footer visible logo aligned to the left edge of the divider/content line.
- Amazon banner image/frame returned to fully static behavior.
- Only the inner liquid-glass Amazon CTA panel uses the reduced 25% tilt interaction.
