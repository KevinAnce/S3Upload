/**
 * Manages a loading overlay for a specific section or the entire document body
 */
class SectionLoaderManager {
    /**
     * Initialize the loader manager
     * @param {string|null} sectionId - ID of the section to apply the loader to (optional)
     * @param {number} [opacity=0.5] - Opacity for content elements when loader is shown (optional, default: 0.5)
     * @param {string} [color='fill-primary'] - Tailwind CSS color class for the loader's fill (optional, default: fill-secondary-500)
     */
    constructor(sectionId = null, opacity = 0.5, color = 'fill-primary') {
        // Target specific section by ID or entire document body if no ID is provided
        this.section = sectionId ? document.getElementById(sectionId) : document.body;
        if (!this.section) {
            throw new Error(`Section with ID ${sectionId} not found`);
        }
        // Store content elements (all children of the section)
        this.contentElements = Array.from(this.section.children);
        // Initialize loader as null (will be created dynamically)
        this.loader = null;
        // Define loader ID
        this.loaderId = 'section-loader';
        // Store opacity value
        this.opacity = opacity;
        // Store color value
        this.color = color;
    }

    /**
     * Create and show the loader with specific ID
     */
    showLoader() {
        // Create loader element dynamically
        this.loader = document.createElement('div');
        this.loader.id = this.loaderId;
        this.loader.setAttribute('role', 'status');
        this.loader.className = `${this.section === document.body ? 'fixed' : "absolute"} -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2`;
        this.loader.innerHTML = `
            <svg aria-hidden="true" class="w-12 h-12 text-gray-200 animate-spin ${this.color}" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">${gettext('Loading...')}</span>
        `;
        // Append loader to section
        this.section.appendChild(this.loader);
        // Dim content elements using provided opacity
        this.contentElements.forEach(element => {
            element.style.opacity = this.opacity;
        });
    }

    /**
     * Hide and remove the loader from DOM
     */
    hideLoader() {
        if (this.loader) {
            // Remove loader from DOM
            this.section.removeChild(this.loader);
            this.loader = null;
        }
        // Restore content opacity
        this.contentElements.forEach(element => {
            element.style.opacity = '1';
        });
    }

    /**
     * Check if the loader is currently visible
     * @returns {boolean} True if loader is visible
     */
    isLoading() {
        return this.loader !== null && document.getElementById(this.loaderId) !== null;
    }
}
