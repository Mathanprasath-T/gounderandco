import { BUSINESS_INFO } from '../data/businessInfo';

/**
 * Builds a direct WhatsApp click-to-chat URL with prefilled enquiry text.
 * @param {Object} options
 * @param {string} [options.productName] - Name of the product
 * @param {string} [options.categoryName] - Name of the category
 * @param {string} [options.customMessage] - Specific custom inquiry
 * @param {string} [options.phone] - Override phone number (defaults to primary WhatsApp)
 * @returns {string} Fully qualified wa.me URL
 */
export function buildWhatsAppLink({ productName, categoryName, customMessage, phone } = {}) {
  const targetPhone = phone || BUSINESS_INFO.whatsapp.number;

  let text = '';
  if (customMessage) {
    text = customMessage;
  } else if (productName) {
    text = `Hello Gounder & Co., I am interested in ${productName}. Please share more details and available options.`;
  } else if (categoryName) {
    text = `Hello Gounder & Co., I am interested in your ${categoryName} collection. Please share more details.`;
  } else {
    text = `Hello Gounder & Co., I am interested in your products. Please share more details.`;
  }

  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a tel: link for phone dialers.
 * @param {string} [phoneNumber]
 * @returns {string}
 */
export function buildPhoneLink(phoneNumber) {
  const number = phoneNumber || BUSINESS_INFO.phones[0].number;
  // Strip non-digits and prepend country code +91 if needed
  const cleanNumber = number.replace(/\D/g, '');
  const dial = cleanNumber.startsWith('91') ? `+${cleanNumber}` : `+91${cleanNumber}`;
  return `tel:${dial}`;
}

