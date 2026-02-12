// lib/data/gallery.ts

/**
 * This file contains data specific to the "Gallery" section and page,
 * also used for the "Showcase" section on the homepage.
 * It defines the structure for gallery items and provides an array of
 * project examples, along with content for both sections.
 *
 * === How to Customize ===
 *
 * 1.  **Gallery Item Interface (`GalleryItem`):**
 *     -   Defines the properties for each gallery item (id, title, category, etc.).
 *
 * 2.  **Gallery Items Array (`galleryItems`):**
 *     -   Add, remove, or modify objects in this array to showcase your work.
 *     -   Ensure `image` paths correspond to images in the `public/gallery` directory.
 *
 * 3.  **Gallery Page Content (`galleryPageContent`):**
 *     -   Customize the `title` and `description` (for SEO) for the main
 *         gallery page.
 *
 * 4.  **Showcase Section Content (`showcaseSectionContent`):**
 *     -   Customize the `sectionTitle`, main `title`, `subtitle`, and the
 *         text/href for the "View Full Gallery" button, typically for a
 *         homepage showcase section.
 */

// ============================================================================
// Gallery Item Interface and Data
// ============================================================================

/**
 * @const showcaseSectionContent
 * An object containing the content for the showcase section, typically displayed
 * on the homepage to highlight featured projects.
 *
 * === How to Customize ===
 * - `sectionTitle`: The small title above the main heading.
 * - `title`: The main heading for the showcase section.
 * - `subtitle`: The descriptive text below the main heading.
 * - `button`: Customize the text and link for the call-to-action button
 *   at the bottom of the section.
 */
export const showcaseSectionContent = {
  sectionTitle: "Our Work",
  title: "Before & After Results",
  subtitle: "See the dramatic transformations we achieve for our customers. Our power washing services restore properties to their original beauty.",
  button: {
    text: "View Full Gallery",
    href: "/gallery"
  }
};

/**
 * @interface GalleryItem
 * Defines the structure for a gallery or portfolio item.
 *
 * @property {number} id - A unique identifier for the gallery item.
 * @property {string} title - The title of the project or work sample.
 * @property {string} category - The category of the work (e.g., "Category One").
 * @property {string} image - The path to the item's image (e.g., "/gallery/project-1.jpg").
 * @property {string} [beforeImage] - Optional path to a "before" image for comparison slider.
 * @property {string} description - A brief description of the project.
 */
export interface GalleryItem {
  id: number
  title: string
  category: string
  image: string
  beforeImage?: string
  description: string
}

/**
 * @const galleryItems
 * An array of gallery item objects to showcase your work.
 * This data is used to populate the gallery or portfolio section.
 *
 * === How to Customize ===
 * - Add your project details to this array.
 * - Ensure the `image` path corresponds to an image in `public/gallery`.
 *   You can use different categories to allow for filtering in the gallery page.
 */
export const galleryItems: GalleryItem[] = [
  // House Washing
  { id: 1, title: "Dormer Window Home Exterior", category: "House Washing", image: "/gallery/home1-after.png", beforeImage: "/gallery/home1-before.png", description: "Complete exterior cleaning of classic home with decorative dormers, removing dirt and algae buildup" },
  { id: 2, title: "Vinyl Siding Restoration", category: "House Washing", image: "/gallery/home2-after.png", beforeImage: "/gallery/home2-before.png", description: "Deep cleaning of vinyl siding to remove years of grime, mold, and environmental staining" },
  { id: 3, title: "Residential Exterior Refresh", category: "House Washing", image: "/gallery/home3-after.png", beforeImage: "/gallery/home3-before.png", description: "Full house wash bringing back the original beauty of the siding and trim" },
  { id: 4, title: "Home Siding Deep Clean", category: "House Washing", image: "/gallery/home4-after.png", beforeImage: "/gallery/home4-before.png", description: "Professional soft wash removing mildew and oxidation from exterior surfaces" },
  // Gutter Cleaning
  { id: 5, title: "Aluminum Gutter Brightening", category: "Gutter Cleaning", image: "/gallery/gutter1-after.png", beforeImage: "/gallery/gutter1-before.png", description: "Removal of black streaks and oxidation from aluminum gutters, restoring like-new appearance" },
  { id: 6, title: "Gutter Face Restoration", category: "Gutter Cleaning", image: "/gallery/gutter2-after.png", beforeImage: "/gallery/gutter2-before.png", description: "Deep cleaning of gutter exteriors to eliminate tiger striping and environmental staining" },
  { id: 7, title: "Seamless Gutter Revival", category: "Gutter Cleaning", image: "/gallery/gutter3-after.png", beforeImage: "/gallery/gutter3-before.png", description: "Professional gutter brightening service removing years of buildup and discoloration" },
  { id: 8, title: "Gutter System Detailing", category: "Gutter Cleaning", image: "/gallery/gutter4-after.png", beforeImage: "/gallery/gutter4-before.png", description: "Complete gutter exterior cleaning enhancing curb appeal and home appearance" },
  // Deck Cleaning
  { id: 9, title: "Wooden Walkway Revival", category: "Deck Cleaning", image: "/gallery/deck1-after.png", beforeImage: "/gallery/deck1-before.png", description: "Pressure washing of wooden deck walkway, removing weathered gray wood and restoring natural color" },
  { id: 10, title: "Backyard Deck Restoration", category: "Deck Cleaning", image: "/gallery/deck2-after.png", beforeImage: "/gallery/deck2-before.png", description: "Full deck cleaning with railing detail work, ready for staining or sealing" },
  // Camper/RV Washing
  { id: 11, title: "Travel Trailer Exterior Wash", category: "Camper/RV Washing", image: "/gallery/camper1-after.png", beforeImage: "/gallery/camper1-before.png", description: "Complete exterior cleaning of travel trailer, removing road grime and oxidation" },
  { id: 12, title: "RV Deep Cleaning", category: "Camper/RV Washing", image: "/gallery/camper2-after.png", beforeImage: "/gallery/camper2-before.png", description: "Thorough RV wash restoring shine and removing built-up dirt from extended travel" },
  // Vehicle Washing
  { id: 13, title: "Commercial Van Detailing", category: "Vehicle Washing", image: "/gallery/vehicle1-after.png", beforeImage: "/gallery/vehicle1-before.png", description: "Professional cleaning of work vehicle roof and exterior, removing heavy grime buildup" },
  { id: 14, title: "Fleet Vehicle Wash", category: "Vehicle Washing", image: "/gallery/vehicle2-after.png", beforeImage: "/gallery/vehicle2-before.png", description: "Thorough exterior wash for commercial vehicles, maintaining a professional appearance" }
]

// ============================================================================
// Gallery Page Content
// ============================================================================

/**
 * @const galleryPageContent
 * An object containing content specific to the Gallery page.
 * This includes metadata for SEO (title and description).
 *
 * === How to Customize ===
 * - `title`: The main title displayed on the gallery page (important for SEO).
 * - `description`: A brief summary of the gallery page content (important for SEO).
 */
export const galleryPageContent = {
  title: "Our Results",
  description: "Browse our gallery of power washing transformations. See the dramatic before and after results we achieve for homes and businesses throughout the Pittsfield area.",
};
