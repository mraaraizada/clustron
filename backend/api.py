from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
CORS(app, origins=cors_origins)

DATA_PATH = os.path.join(os.path.dirname(__file__), 'realistic_customers.csv')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Customer Segmentation API is running'})

@app.route('/api/cluster', methods=['POST'])
def cluster_data():
    """
    Perform clustering on customer data
    Body: { method: 'KMeans'|'Agglomerative'|'GaussianMixture', n_clusters: int }
    """
    try:
        data = request.json
        method = data.get('method', 'KMeans')
        n_clusters = data.get('n_clusters', 4)
        
        df = pd.read_csv(DATA_PATH)
        df_numeric = df.select_dtypes(include=['int64', 'float64']).dropna()
        
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df_numeric)
        
        # Apply clustering
        if method == 'KMeans':
            model = KMeans(n_clusters=n_clusters, n_init=10, random_state=42)
        elif method == 'Agglomerative':
            model = AgglomerativeClustering(n_clusters=n_clusters)
        elif method == 'GaussianMixture':
            model = GaussianMixture(n_components=n_clusters, random_state=42)
        else:
            return jsonify({'error': 'Invalid method. Use KMeans, Agglomerative, or GaussianMixture'}), 400
        
        clusters = model.fit_predict(scaled_data)
        
        # Silhouette score
        silhouette = None
        if len(set(clusters)) > 1 and -1 not in set(clusters):
            try:
                silhouette = float(silhouette_score(scaled_data, clusters))
            except:
                pass
        
        # PCA 2D and 3D
        pca_2d = PCA(n_components=2).fit_transform(scaled_data)
        pca_3d = PCA(n_components=3).fit_transform(scaled_data)
        
        # Cluster distribution
        unique_clusters = sorted(set(clusters))
        cluster_counts = {int(c): int((clusters == c).sum()) for c in unique_clusters}
        
        response = {
            'method': method,
            'n_clusters': n_clusters,
            'silhouette_score': silhouette,
            'cluster_counts': cluster_counts,
            'total_customers': len(df),
            'pca_2d': {
                'x': pca_2d[:, 0].tolist(),
                'y': pca_2d[:, 1].tolist(),
                'clusters': clusters.tolist()
            },
            'pca_3d': {
                'x': pca_3d[:, 0].tolist(),
                'y': pca_3d[:, 1].tolist(),
                'z': pca_3d[:, 2].tolist(),
                'clusters': clusters.tolist()
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/elbow', methods=['GET'])
def elbow_method():
    """
    Calculate SSE for elbow method (KMeans only)
    """
    try:
        df = pd.read_csv(DATA_PATH)
        df_numeric = df.select_dtypes(include=['int64', 'float64']).dropna()
        
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df_numeric)
        
        sse = []
        k_range = range(1, 11)
        
        for k in k_range:
            km = KMeans(n_clusters=k, n_init=10, random_state=42)
            km.fit(scaled_data)
            sse.append(float(km.inertia_))
        
        return jsonify({
            'k_values': list(k_range),
            'sse_values': sse
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/segments', methods=['GET'])
def get_segments():
    """
    Get default customer segments with statistics
    """
    try:
        df = pd.read_csv(DATA_PATH)
        df_numeric = df.select_dtypes(include=['int64', 'float64']).dropna()
        
        scaler = StandardScaler()
        scaled_data = scaler.fit_transform(df_numeric)
        
        model = KMeans(n_clusters=4, n_init=10, random_state=42)
        clusters = model.fit_predict(scaled_data)
        df['Cluster'] = clusters
        
        segments = []
        colors = ['#7C3AED', '#A855F7', '#C084FC', '#E9D5FF']
        
        for cluster_id in sorted(set(clusters)):
            cluster_data = df[df['Cluster'] == cluster_id]
            cluster_numeric = cluster_data[df_numeric.columns]
            
            segments.append({
                'id': int(cluster_id),
                'name': f'Segment {cluster_id + 1}',
                'count': int(len(cluster_data)),
                'percentage': round(len(cluster_data) / len(df) * 100, 1),
                'color': colors[cluster_id % len(colors)],
                'stats': {
                    col: {
                        'mean': round(float(cluster_numeric[col].mean()), 2),
                        'median': round(float(cluster_numeric[col].median()), 2)
                    } for col in cluster_numeric.columns
                }
            })
        
        return jsonify({
            'segments': segments,
            'total_customers': len(df)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/data/preview', methods=['GET'])
def data_preview():
    """
    Get preview of customer data
    """
    try:
        df = pd.read_csv(DATA_PATH)
        limit = request.args.get('limit', 20, type=int)
        
        return jsonify({
            'columns': df.columns.tolist(),
            'data': df.head(limit).to_dict(orient='records'),
            'total_rows': len(df),
            'numeric_columns': df.select_dtypes(include=['int64', 'float64']).columns.tolist()
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    host = os.getenv('HOST', '127.0.0.1')
    debug = os.getenv('FLASK_ENV', 'development') == 'development'
    
    app.run(debug=debug, port=port, host=host)
