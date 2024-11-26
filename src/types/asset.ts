export type AssetSource = 'manual' | 'template';
export type KpiSource = 'manual' | 'linkedin' | 'twitter';
export type WorkflowStatus = 'draft' | 'in_review' | 'approved' | 'published';

export interface AssetKpi {
  id: string;
  name: string;
  value: string;
  source: KpiSource;
  sourceUrl?: string;
  timestamp: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface Asset {
  id: string;
  title: string;
  type: 'article' | 'image' | 'video' | 'email' | 'social' | 'document';
  content: string;
  folder: string;
  tags: string[];
  campaign?: string;
  
  // Source tracking
  source: AssetSource;
  templateId?: string;
  templateName?: string;
  version: number;
  
  // KPIs
  kpis: AssetKpi[];
  
  // Workflow
  status: WorkflowStatus;
  reviewers?: string[];
  reviewComments?: Array<{
    id: string;
    userId: string;
    comment: string;
    timestamp: string;
  }>;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  
  // Relations
  relatedAssets?: string[];
  parentAssetId?: string; // For versioning
}

export interface AssetVersion {
  id: string;
  assetId: string;
  version: number;
  content: string;
  updatedAt: string;
  updatedBy: string;
  changeDescription?: string;
}