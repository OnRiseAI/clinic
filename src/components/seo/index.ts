// =============================================================================
// SEO COMPONENTS - CENTRAL EXPORTS
// =============================================================================

// Core components
export { AIAnswerBlock, generateProcedureAnswer, generateDestinationAnswer, generateDestinationProcedureAnswer, generateClinicAnswer, generateCategoryAnswer } from './ai-answer-block'
export { StatBlock, StatGrid, generateProcedureStats, generateClinicStats, generateDestinationStats } from './stat-block'
export { FAQSection, PeopleAlsoAsk, generateProcedureFAQs, generateClinicFAQs, generateDestinationFAQs } from './faq-section'
export { Breadcrumbs, generateClinicBreadcrumbs, generateProcedureBreadcrumbs, generateDestinationBreadcrumbs, generateBlogBreadcrumbs } from './breadcrumbs'
export { StructuredData } from './structured-data-component'

// Re-export structured data generators
export * from '@/lib/seo/structured-data'
export * from '@/lib/seo/metadata'
