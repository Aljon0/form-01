/** Shared canvas size for every sneaker render (width x height, px). */
export const RENDER_WIDTH = 2400;
export const RENDER_HEIGHT = 1400;

/** Shared canvas size for every detail crop (width x height, px). */
export const DETAIL_WIDTH = 1600;
export const DETAIL_HEIGHT = 1200;


/**
 * Contact-shadow placement as % of the render canvas (same framing for all colorways).
 * The sole sits at roughly 74% of the canvas height. Tweak these if your cutouts differ.
 */
export const SHADOW = { left: 20, right: 20, top: 72, height: 5 } as const;