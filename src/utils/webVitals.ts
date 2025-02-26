import { onCLS, onFID, onLCP, onTTFB, onINP, Metric } from 'web-vitals';

/**
 * Interface for web vitals reporting options
 */
interface ReportWebVitalsOptions {
  /** Whether to report to console (default: true in development) */
  reportToConsole?: boolean;
  /** Custom reporter function */
  reporter?: (metric: Metric) => void;
}

/**
 * Reports web vitals metrics
 * @param options Configuration options for reporting
 */
export function reportWebVitals(options: ReportWebVitalsOptions = {}) {
  const { 
    reportToConsole = import.meta.env.DEV,
    reporter
  } = options;
  
  // Create a metric handler
  const handleMetric = (metric: Metric) => {
    // Log to console if enabled
    if (reportToConsole) {
      console.log(metric);
    }
    
    // Send to custom reporter if provided
    if (reporter) {
      reporter(metric);
    }
    
    // Here you could also send to an analytics service
    // Example: sendToAnalytics(metric);
  };
  
  // Register all web vitals metrics
  onCLS(handleMetric);
  onFID(handleMetric);
  onLCP(handleMetric);
  onTTFB(handleMetric);
  onINP(handleMetric);
}