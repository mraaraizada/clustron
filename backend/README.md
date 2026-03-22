# Customer Segmentation API

## What This Is    
A Flask REST API for customer segmentation using clustering algorithms. Built to provide customer analytics through a clean API interface.

## What It Does
- **Clustering Methods**: KMeans, Agglomerative Clustering, and Gaussian Mixture Models
- **Visualizations Data**: PCA plots (2D & 3D) coordinates for frontend visualization
- **Metrics**: Silhouette scoring, cluster statistics, and elbow method data
- **Segments**: Pre-computed customer segments with detailed statistics

## How to Run It
1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Start the API server:
```bash
python api.py
```

The API will run on `http://localhost:5001`

## API Endpoints

### GET `/api/health`
Health check endpoint
```json
{ "status": "ok", "message": "Customer Segmentation API is running" }
```

### POST `/api/cluster`
Perform clustering on customer data
```json
// Request
{
  "method": "KMeans",  // or "Agglomerative", "GaussianMixture"
  "n_clusters": 4
}

// Response
{
  "method": "KMeans",
  "n_clusters": 4,
  "silhouette_score": 0.45,
  "cluster_counts": { "0": 250, "1": 180, "2": 320, "3": 150 },
  "total_customers": 900,
  "pca_2d": { "x": [...], "y": [...], "clusters": [...] },
  "pca_3d": { "x": [...], "y": [...], "z": [...], "clusters": [...] }
}
```

### GET `/api/elbow`
Get elbow method data for KMeans
```json
{
  "k_values": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  "sse_values": [12500, 8200, 5400, 3800, 2900, 2400, 2100, 1900, 1800, 1700]
}
```

### GET `/api/segments`
Get default customer segments with statistics
```json
{
  "segments": [
    {
      "id": 0,
      "name": "Segment 1",
      "count": 250,
      "percentage": 27.8,
      "color": "#7C3AED",
      "stats": {
        "age": { "mean": 35.5, "median": 34.0 },
        "spending": { "mean": 1250.75, "median": 1180.50 }
      }
    }
  ],
  "total_customers": 900
}
```

### GET `/api/data/preview?limit=20`
Get preview of customer data
```json
{
  "columns": ["customer_id", "age", "spending", ...],
  "data": [...],
  "total_rows": 900,
  "numeric_columns": ["age", "spending", ...]
}
```

## Clustering Methods

- **KMeans**: Fast, simple clustering for well-separated groups
- **Agglomerative**: Hierarchical clustering for nested relationships
- **Gaussian Mixture**: Probabilistic clustering for overlapping segments

## Technical Details
- Automatic feature scaling using StandardScaler
- PCA dimensionality reduction for visualization
- Silhouette score for cluster quality assessment
- Works with numeric customer data (purchase frequency, spending, demographics, etc.)
