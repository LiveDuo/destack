import { source as tsm1 } from './testimonial-1'
import tsm1s from './testimonial-1.png'
import { source as tsm2 } from './testimonial-2'
import tsm2s from './testimonial-2.png'
import { source as tsm3 } from './testimonial-3'
import tsm3s from './testimonial-3.png'
import { source as tsm4 } from './testimonial-4'
import tsm4s from './testimonial-4.png'
import { source as tsm5 } from './testimonial-5'
import tsm5s from './testimonial-5.png'
import { source as tsm6 } from './testimonial-6'
import tsm6s from './testimonial-6.png'
import { source as tsm7 } from './testimonial-7'
import tsm7s from './testimonial-7.png'
import { source as tsm8 } from './testimonial-8'
import tsm8s from './testimonial-8.png'

import { source as nav1 } from './navigation-1'
import nav1s from './navigation-1.png'
import { source as nav2 } from './navigation-2'
import nav2s from './navigation-2.png'
import { source as nav3 } from './navigation-3'
import nav3s from './navigation-3.png'
import { source as nav4 } from './navigation-4'
import nav4s from './navigation-4.png'
import { source as nav5 } from './navigation-5'
import nav5s from './navigation-5.png'
import { source as nav6 } from './navigation-6'
import nav6s from './navigation-6.png'
import { source as nav7 } from './navigation-7'
import nav7s from './navigation-7.png'
import { source as nav8 } from './navigation-8'
import nav8s from './navigation-8.png'
import { source as nav9 } from './navigation-9'
import nav9s from './navigation-9.png'
import { source as nav10 } from './navigation-10'
import nav10s from './navigation-10.png'

import { source as form1 } from './form-1'
import form1s from './form-1.png'
import { source as form2 } from './form-2'
import form2s from './form-2.png'
import { source as form3 } from './form-3'
import form3s from './form-3.png'
import { source as form4 } from './form-4'
import form4s from './form-4.png'

import { source as footer1 } from './footer-1'
import footer1s from './footer-1.png'
import { source as footer2 } from './footer-2'
import footer2s from './footer-2.png'
import { source as footer3 } from './footer-3'
import footer3s from './footer-3.png'
import { source as footer4 } from './footer-4'
import footer4s from './footer-4.png'
import { source as footer5 } from './footer-5'
import footer5s from './footer-5.png'
import { source as footer6 } from './footer-6'
import footer6s from './footer-6.png'
import { source as footer7 } from './footer-7'
import footer7s from './footer-7.png'
import { source as footer8 } from './footer-8'
import footer8s from './footer-8.png'
import { source as footer9 } from './footer-9'
import footer9s from './footer-9.png'
import { source as footer10 } from './footer-10'
import footer10s from './footer-10.png'
import { source as footer11 } from './footer-11'
import footer11s from './footer-11.png'
import { source as footer12 } from './footer-12'
import footer12s from './footer-12.png'
import { source as footer13 } from './footer-13'
import footer13s from './footer-13.png'
import { source as footer14 } from './footer-14'
import footer14s from './footer-14.png'
import { source as footer15 } from './footer-15'
import footer15s from './footer-15.png'
import { source as footer16 } from './footer-16'
import footer16s from './footer-16.png'
import { source as footer17 } from './footer-17'
import footer17s from './footer-17.png'
import { source as footer18 } from './footer-18'
import footer18s from './footer-18.png'
import { source as footer19 } from './footer-19'
import footer19s from './footer-19.png'
import { source as footer20 } from './footer-20'
import footer20s from './footer-20.png'
import { source as footer21 } from './footer-21'
import footer21s from './footer-21.png'
import { source as footer22 } from './footer-22'
import footer22s from './footer-22.png'
import { source as footer23 } from './footer-23'
import footer23s from './footer-23.png'

import { source as banner1 } from './banner-1'
import banner1s from './banner-1.png'
import { source as banner2 } from './banner-2'
import banner2s from './banner-2.png'
import { source as banner3 } from './banner-3'
import banner3s from './banner-3.png'

import { source as cta1 } from './cta-1'
import cta1s from './cta-1.png'
import { source as cta2 } from './cta-2'
import cta2s from './cta-2.png'
import { source as cta3 } from './cta-3'
import cta3s from './cta-3.png'
import { source as cta4 } from './cta-4'
import cta4s from './cta-4.png'
import { source as cta5 } from './cta-5'
import cta5s from './cta-5.png'
import { source as cta6 } from './cta-6'
import cta6s from './cta-6.png'

import { source as faq1 } from './faq-1'
import faq1s from './faq-1.png'
import { source as faq2 } from './faq-2'
import faq2s from './faq-2.png'
import { source as faq3 } from './faq-3'
import faq3s from './faq-3.png'
import { source as faq4 } from './faq-4'
import faq4s from './faq-4.png'

import { source as review1 } from './review-1'
import review1s from './review-1.png'

import { source as section1 } from './section-1'
import section1s from './section-1.png'
import { source as section2 } from './section-2'
import section2s from './section-2.png'
import { source as section3 } from './section-3'
import section3s from './section-3.png'
import { source as section4 } from './section-4'
import section4s from './section-4.png'
import { source as section5 } from './section-5'
import section5s from './section-5.png'
import { source as section6 } from './section-6'
import section6s from './section-6.png'

import { source as stat1 } from './stat-1'
import stat1s from './stat-1.png'
import { source as stat2 } from './stat-2'
import stat2s from './stat-2.png'

import { getPngHtml } from '../../../utils'

const sources = [
  {
    id: 'banner-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(banner1s),
    // label: 'b2s().outerHTML',
    content: banner1,
    category: 'Banner',
    // order: 1
  },
  {
    id: 'banner-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(banner2s),
    // label: 'b2s().outerHTML',
    content: banner2,
    category: 'Banner',
    // order: 1
  },
  {
    id: 'banner-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(banner3s),
    // label: 'b2s().outerHTML',
    content: banner3,
    category: 'Banner',
    // order: 1
  },
  {
    id: 'section-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section1s),
    // label: 'b2s().outerHTML',
    content: section1,
    category: 'Content',
    // order: 1
  },
  {
    id: 'section-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section2s),
    // label: 'b2s().outerHTML',
    content: section2,
    category: 'Content',
    // order: 1
  },
  {
    id: 'section-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section3s),
    // label: 'b2s().outerHTML',
    content: section3,
    category: 'Content',
    // order: 1
  },
  {
    id: 'section-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section4s),
    // label: 'b2s().outerHTML',
    content: section4,
    category: 'Content',
    // order: 1
  },
  {
    id: 'section-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section5s),
    // label: 'b2s().outerHTML',
    content: section5,
    category: 'Content',
    // order: 1
  },
  {
    id: 'section-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(section6s),
    // label: 'b2s().outerHTML',
    content: section6,
    category: 'Content',
    // order: 1
  },
  {
    id: 'cta-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta1s),
    // label: 'b2s().outerHTML',
    content: cta1,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta2s),
    // label: 'b2s().outerHTML',
    content: cta2,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta3s),
    // label: 'b2s().outerHTML',
    content: cta3,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta4s),
    // label: 'b2s().outerHTML',
    content: cta4,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta5s),
    // label: 'b2s().outerHTML',
    content: cta5,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'cta-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(cta6s),
    // label: 'b2s().outerHTML',
    content: cta6,
    category: 'CTA',
    // order: 1
  },
  {
    id: 'faq-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(faq1s),
    // label: 'b2s().outerHTML',
    content: faq1,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(faq2s),
    // label: 'b2s().outerHTML',
    content: faq2,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(faq3s),
    // label: 'b2s().outerHTML',
    content: faq3,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'faq-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(faq4s),
    // label: 'b2s().outerHTML',
    content: faq4,
    category: 'FAQ',
    // order: 1
  },
  {
    id: 'footer-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer1s),
    // label: 'b2s().outerHTML',
    content: footer1,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer2s),
    // label: 'b2s().outerHTML',
    content: footer2,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer3s),
    // label: 'b2s().outerHTML',
    content: footer3,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer4s),
    // label: 'b2s().outerHTML',
    content: footer4,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer5s),
    // label: 'b2s().outerHTML',
    content: footer5,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer6s),
    // label: 'b2s().outerHTML',
    content: footer6,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer7s),
    // label: 'b2s().outerHTML',
    content: footer7,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-8',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer8s),
    // label: 'b2s().outerHTML',
    content: footer8,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-9',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer9s),
    // label: 'b2s().outerHTML',
    content: footer9,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-10',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer10s),
    // label: 'b2s().outerHTML',
    content: footer10,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-11',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer11s),
    // label: 'b2s().outerHTML',
    content: footer11,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-12',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer12s),
    // label: 'b2s().outerHTML',
    content: footer12,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-13',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer13s),
    // label: 'b2s().outerHTML',
    content: footer13,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-14',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer14s),
    // label: 'b2s().outerHTML',
    content: footer14,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-15',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer15s),
    // label: 'b2s().outerHTML',
    content: footer15,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-16',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer16s),
    // label: 'b2s().outerHTML',
    content: footer16,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-17',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer17s),
    // label: 'b2s().outerHTML',
    content: footer17,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-18',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer18s),
    // label: 'b2s().outerHTML',
    content: footer18,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-19',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer19s),
    // label: 'b2s().outerHTML',
    content: footer19,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-20',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer20s),
    // label: 'b2s().outerHTML',
    content: footer20,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-21',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer21s),
    // label: 'b2s().outerHTML',
    content: footer21,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-22',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer22s),
    // label: 'b2s().outerHTML',
    content: footer22,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'footer-23',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(footer23s),
    // label: 'b2s().outerHTML',
    content: footer23,
    category: 'Footer',
    // order: 1
  },
  {
    id: 'form-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(form1s),
    // label: 'b2s().outerHTML',
    content: form1,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(form2s),
    // label: 'b2s().outerHTML',
    content: form2,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(form3s),
    // label: 'b2s().outerHTML',
    content: form3,
    category: 'Form',
    // order: 1
  },
  {
    id: 'form-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(form4s),
    // label: 'b2s().outerHTML',
    content: form4,
    category: 'Form',
    // order: 1
  },
  {
    id: 'navigation-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav1s),
    // label: 'b2s().outerHTML',
    content: nav1,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav2s),
    // label: 'b2s().outerHTML',
    content: nav2,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav3s),
    // label: 'b2s().outerHTML',
    content: nav3,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav4s),
    // label: 'b2s().outerHTML',
    content: nav4,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav5s),
    // label: 'b2s().outerHTML',
    content: nav5,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav6s),
    // label: 'b2s().outerHTML',
    content: nav6,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav7s),
    // label: 'b2s().outerHTML',
    content: nav7,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-8',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav8s),
    // label: 'b2s().outerHTML',
    content: nav8,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-9',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav9s),
    // label: 'b2s().outerHTML',
    content: nav9,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'navigation-10',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(nav10s),
    // label: 'b2s().outerHTML',
    content: nav10,
    category: 'Navigation',
    // order: 1
  },
  {
    id: 'review-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(review1s),
    // label: 'b2s().outerHTML',
    content: review1,
    category: 'Reviews',
    // order: 1
  },
  {
    id: 'stat-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(stat1s),
    // label: 'b2s().outerHTML',
    content: stat1,
    category: 'Stats',
    // order: 1
  },
  {
    id: 'stat-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(stat2s),
    // label: 'b2s().outerHTML',
    content: stat2,
    category: 'Stats',
    // order: 1
  },
  {
    id: 'testimonial-1',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm1s),
    // label: 'b2s().outerHTML',
    content: tsm1,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-2',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm2s),
    // label: 'b2s().outerHTML',
    content: tsm2,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-3',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm3s),
    // label: 'b2s().outerHTML',
    content: tsm3,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-4',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm4s),
    // label: 'b2s().outerHTML',
    content: tsm4,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-5',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm5s),
    // label: 'b2s().outerHTML',
    content: tsm5,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-6',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm6s),
    // label: 'b2s().outerHTML',
    content: tsm6,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-7',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm7s),
    // label: 'b2s().outerHTML',
    content: tsm7,
    category: 'Testimonials',
    // order: 1
  },
  {
    id: 'testimonial-8',
    // class: 'fa fa-map-o',
    class: '',
    label: getPngHtml(tsm8s),
    // label: 'b2s().outerHTML',
    content: tsm8,
    category: 'Testimonials',
    // order: 1
  },
]

const loadHyperUiBlocks = (newEditor: { BlockManager: any }): void => {
  const blockManager = newEditor.BlockManager

  sources.forEach((s) => {
    blockManager.add(s.id, {
      label: s.label,
      attributes: { class: s.class },
      content: s.content,
      category: { label: s.category, open: s.category === 'Banner' },
    })
  })
}
export { loadHyperUiBlocks }
