const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dpopq3gmp";

/**
 * Generates an optimized Cloudinary URL for a given public ID or URL.
 *
 * @param {string} source - The Cloudinary public ID, full URL, or relative local path.
 * @param {Object} options - Optimization options.
 * @param {number} [options.width] - Desired width.
 * @param {number} [options.height] - Desired height.
 * @param {string} [options.crop] - Crop mode (default: 'fill').
 * @param {string} [options.apiBaseUrl] - Base URL for local relative paths.
 * @returns {string} The optimized URL.
 */
export const getOptimizedImageUrl = (source, options = {}) => {
  if (!source) return "";

  const { width, height, crop = "fill", apiBaseUrl = "" } = options;

  // Handle local relative paths (not from Cloudinary)
  if (source.startsWith("/") && !source.includes("cloudinary.com")) {
    return `${apiBaseUrl}${source}`;
  }

  // If it's already a full URL and not from Cloudinary, return as is
  if (source.startsWith("http") && !source.includes("cloudinary.com")) {
    return source;
  }

  let publicId = source;

  // If it's a full Cloudinary URL, extract the public ID
  if (source.includes("cloudinary.com")) {
    const parts = source.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex !== -1) {
      // Find the start of the public ID after version (if present)
      let startIndex = uploadIndex + 1;
      if (
        parts[startIndex] &&
        parts[startIndex].startsWith("v") &&
        !isNaN(parts[startIndex].substring(1))
      ) {
        startIndex++;
      }
      publicId = parts.slice(startIndex).join("/");
    }
  }

  const transformations = ["f_auto", "q_auto"];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join(",")}/${publicId}`;
};
