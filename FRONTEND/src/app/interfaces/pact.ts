export interface Pact {
                            
    consumer: string;                    // Consumer application name
    provider: string;                    // Provider application name
    latestPactPublishedDate: string;     // The date the latest pact was published
    webhookStatus: string;               // Status of the webhook (e.g., 'success', 'failed')
    lastVerifiedDate: string;            // The date the pact was last verified
  }