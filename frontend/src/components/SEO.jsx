import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, keywords, image, robots }) {
  const location = useLocation();

  useEffect(() => {
    // 1. Title
    const formattedTitle = title ? `${title} | Praxire` : 'Praxire | Software & Web Development Company in Tiruvannamalai';
    document.title = formattedTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (nameAttr, attrVal, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[${nameAttr}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(nameAttr, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tags (e.g. canonical)
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description
    const defaultDesc = 'Praxire is a leading web development, mobile app development, UI/UX design, and custom software development company in Tiruvannamalai. We help startups and businesses build scalable digital solutions.';
    updateMetaTag('name', 'description', description || defaultDesc);

    // 3. Meta Keywords
    const defaultKeywords = 'Praxire, Web Development Company in Tiruvannamalai, App Development Company in Tiruvannamalai, Custom Software Development in Tiruvannamalai, Website Designers in Tiruvannamalai, Mobile App Developers in Tiruvannamalai, UI UX Design Services, SaaS Development Company, Startup Product Development, Software Development Agency in Tiruvannamalai, IT company, software companies in tamil nadu, IT companies in tamil nadu, web development in tiruvannamalai, IT service app development in tiruvannamalai, Best IT software company in tamilnadu, Best software company in Tiruvannamalai';
    updateMetaTag('name', 'keywords', keywords || defaultKeywords);

    // 4. Open Graph Tags
    updateMetaTag('property', 'og:title', title || 'Praxire | Software & Web Development Company in Tiruvannamalai');
    updateMetaTag('property', 'og:description', description || defaultDesc);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:url', window.location.href);

    // Set og:image and twitter:image
    const siteOrigin = window.location.origin;
    const defaultImage = '/logo.png';

    // Remove any existing dynamic og:image tags to prevent duplicates
    document.querySelectorAll('meta[property="og:image"]').forEach(el => el.remove());

    if (Array.isArray(image)) {
      image.forEach((img, idx) => {
        const ogImgUrl = img.startsWith('http') ? img : `${siteOrigin}${img}`;
        const newMeta = document.createElement('meta');
        newMeta.setAttribute('property', 'og:image');
        newMeta.setAttribute('content', ogImgUrl);
        document.head.appendChild(newMeta);

        if (idx === 0) {
          updateMetaTag('name', 'twitter:image', ogImgUrl);
        }
      });
    } else {
      const ogImage = image ? (image.startsWith('http') ? image : `${siteOrigin}${image}`) : `${siteOrigin}${defaultImage}`;
      updateMetaTag('property', 'og:image', ogImage);
      updateMetaTag('name', 'twitter:image', ogImage);
    }

    // 5. Twitter Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title || 'Praxire | Software & Web Development Company in Tiruvannamalai');
    updateMetaTag('name', 'twitter:description', description || defaultDesc);

    // 6. Robots Tag
    updateMetaTag('name', 'robots', robots || 'index, follow');

    // 7. Canonical link
    updateLinkTag('canonical', window.location.href);

  }, [title, description, keywords, image, robots, location]);

  return null;
}
