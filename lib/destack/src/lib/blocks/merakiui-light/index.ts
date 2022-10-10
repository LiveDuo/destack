import c1s from '../tailblocks/blog-1.svg'

import { source as b1 } from './blog-1'
import b1s from './blog-1.png'
import { source as b2 } from './blog-2'
import b2s from './blog-2.png'
import { source as b3 } from './blog-3'
import b3s from './blog-3.png'
import { source as b4 } from './blog-4'
import b4s from './blog-4.png'
import { source as b5 } from './blog-5'
import b5s from './blog-5.png'
import { source as b6 } from './blog-6'
import b6s from './blog-6.png'

import { source as ctc1 } from './contact-1'
import { source as ctc2 } from './contact-2'
import { source as ctc3 } from './contact-3'
import { source as ctc4 } from './contact-4'
import { source as ctc5 } from './contact-5'
import { source as ctc6 } from './contact-6'

import { source as cta1 } from './cta-1'
import { source as cta2 } from './cta-2'
import { source as cta3 } from './cta-3'
import { source as cta4 } from './cta-4'
import { source as cta5 } from './cta-5'
import { source as cta6 } from './cta-6'

import { source as faq1 } from './faq-1'
import { source as faq2 } from './faq-2'
import { source as faq3 } from './faq-3'
import { source as faq4 } from './faq-4'
import { source as faq5 } from './faq-5'

import { source as features1 } from './features-1'
import { source as features2 } from './features-2'
import { source as features3 } from './features-3'
import { source as features4 } from './features-4'
import { source as features5 } from './features-5'
import { source as features6 } from './features-6'
import { source as features7 } from './features-7'

import { source as footer1 } from './footer-1'
import { source as footer2 } from './footer-2'
import { source as footer3 } from './footer-3'
import { source as footer4 } from './footer-4'
import { source as footer5 } from './footer-5'

import { source as form1 } from './form-1'
import { source as form2 } from './form-2'
import { source as form3 } from './form-3'
import { source as form4 } from './form-4'

import { source as hero1 } from './hero-1'
import { source as hero2 } from './hero-2'
import { source as hero3 } from './hero-3'
import { source as hero4 } from './hero-4'
import { source as hero5 } from './hero-5'
import { source as hero6 } from './hero-6'
import { source as hero7 } from './hero-7'
import { source as hero8 } from './hero-8'
import { source as hero9 } from './hero-9'
import { source as hero10 } from './hero-10'
import { source as hero11 } from './hero-11'

import { source as nav1 } from './navigation-1'
import { source as nav2 } from './navigation-2'
import { source as nav3 } from './navigation-3'
import { source as nav4 } from './navigation-4'
import { source as nav5 } from './navigation-5'
import { source as nav6 } from './navigation-6'

import { source as prf1 } from './portfolio-1'
import { source as prf2 } from './portfolio-2'
import { source as prf3 } from './portfolio-3'
import { source as prf4 } from './portfolio-4'
import { source as prf5 } from './portfolio-5'

import { source as prc1 } from './pricing-1'
import { source as prc2 } from './pricing-2'
import { source as prc3 } from './pricing-3'
import { source as prc4 } from './pricing-4'
import { source as prc5 } from './pricing-5'
import { source as prc6 } from './pricing-6'
import { source as prc7 } from './pricing-7'

import { source as team1 } from './team-1'
import { source as team2 } from './team-2'
import { source as team3 } from './team-3'
import { source as team4 } from './team-4'
import { source as team5 } from './team-5'
import { source as team6 } from './team-6'

import { source as tsm1 } from './testimonial-1'
import { source as tsm2 } from './testimonial-2'
import { source as tsm3 } from './testimonial-3'
import { source as tsm4 } from './testimonial-4'
import { source as tsm5 } from './testimonial-5'
import { source as tsm6 } from './testimonial-6'

import { getSvgHtml, getPngHtml } from '../../../utils'

const sources = [
  {
    id: 'blog-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b1s),
    // label: 'b2s().outerHTML',
    content: b1,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'blog-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b2s),
    // label: 'b2s().outerHTML',
    content: b2,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'blog-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b3s),
    // label: 'b2s().outerHTML',
    content: b3,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'blog-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b4s),
    // label: 'b2s().outerHTML',
    content: b4,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'blog-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b5s),
    // label: 'b2s().outerHTML',
    content: b5,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'blog-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(b6s),
    // label: 'b2s().outerHTML',
    content: b6,
    category: 'Blog',
    // order: 1
  },
  {
    id: 'contact-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc1,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'contact-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc2,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'contact-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc3,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'contact-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc4,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'contact-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc5,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'contact-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: ctc6,
    category: 'Contact',
    // order: 1
  },
  {
    id: 'cta-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta1,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta2,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta3,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta4,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta5,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: cta6,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'faq-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: faq1,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: faq2,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: faq3,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: faq4,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: faq5,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'features-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features1,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features2,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features3,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features4,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features5,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features6,
    category: 'Features',
    // order: 1
  },
  {
    id: 'features-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: features7,
    category: 'Features',
    // order: 1
  },
  {
    id: 'footer-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: footer1,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: footer2,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: footer3,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: footer4,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: footer5,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'form-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: form1,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: form2,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: form3,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: form4,
    category: 'Form',
    // order: 1
  },
  {
    id: 'hero-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero1,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero2,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero3,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero4,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero5,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero6,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero7,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-8',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero8,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-9',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero9,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-10',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero10,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'hero-11',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: hero11,
    category: 'Hero',
    // order: 1
  },
  {
    id: 'navigation-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav1,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav2,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav3,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav4,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav5,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: nav6,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'portfolio-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prf1,
    category: 'Portfolio',
    // order: 1
  },
  {
    id: 'portfolio-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prf2,
    category: 'Portfolio',
    // order: 1
  },
  {
    id: 'portfolio-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prf3,
    category: 'Portfolio',
    // order: 1
  },
  {
    id: 'portfolio-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prf4,
    category: 'Portfolio',
    // order: 1
  },
  {
    id: 'portfolio-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prf5,
    category: 'Portfolio',
    // order: 1
  },
  {
    id: 'pricing-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc1,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc2,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc3,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc4,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc5,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc6,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'pricing-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: prc7,
    category: 'Pricing',
    // order: 1
  },
  {
    id: 'team-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team1,
    category: 'Team',
    // order: 1
  },
  {
    id: 'team-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team2,
    category: 'Team',
    // order: 1
  },
  {
    id: 'team-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team3,
    category: 'Team',
    // order: 1
  },
  {
    id: 'team-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team4,
    category: 'Team',
    // order: 1
  },
  {
    id: 'team-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team5,
    category: 'Team',
    // order: 1
  },
  {
    id: 'team-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: team6,
    category: 'Team',
    // order: 1
  },
  {
    id: 'testimonial-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm1,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm2,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm3,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm4,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm5,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getSvgHtml(c1s),
    // label: 'b2s().outerHTML',
    content: tsm6,
    category: 'Testimonials',
    // order: 1
  },
]

const loadMerakiUiLightBlocks = (newEditor: { BlockManager: any }): void => {
  const blockManager = newEditor.BlockManager

  sources.forEach((s) => {
    blockManager.add(s.id, {
      label: s.label,
      attributes: { class: s.class },
      content: s.content,
      category: { label: s.category, open: s.category === 'Blog' },
    })
  })
}
export { loadMerakiUiLightBlocks }
