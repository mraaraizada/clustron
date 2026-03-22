import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans, DBSCAN, AgglomerativeClustering
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
from sklearn.decomposition import PCA

# Streamlit Page Config
st.set_page_config(page_title="Customer Segmentation Dashboard", layout="wide")
st.title("📊 Customer Segmentation Dashboard")

# Sidebar
st.sidebar.header("⚙️ Settings")
uploaded_file = st.sidebar.file_uploader("Upload your CSV file", type=["csv"])

# Clustering method selection 
method = st.sidebar.selectbox(
    "Select Clustering Algorithm", 
    ["KMeans", "Agglomerative", "Gaussian Mixture"]
)

# Hyperparameters
if method == "KMeans":
    n_clusters = st.sidebar.slider("Number of Clusters (k)", 2, 10, 4)
elif method == "Agglomerative":
    n_clusters = st.sidebar.slider("Number of Clusters", 2, 10, 4)
else:  # Gaussian Mixture
    n_clusters = st.sidebar.slider("Number of Components", 2, 10, 4)

if uploaded_file:
    # Load dataset
    df = pd.read_csv(uploaded_file)
    st.subheader("🔍 Data Preview")
    st.dataframe(df.head(), use_container_width=True)

    # Select numeric data for scaling
    df_numeric = df.select_dtypes(include=['int64', 'float64']).dropna()
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(df_numeric)

    # Apply clustering
    if method == "KMeans":
        model = KMeans(n_clusters=n_clusters, n_init=10, random_state=42)
        clusters = model.fit_predict(scaled_data)

    elif method == "Agglomerative":
        model = AgglomerativeClustering(n_clusters=n_clusters)
        clusters = model.fit_predict(scaled_data)

    elif method == "DBSCAN":
        model = DBSCAN(eps=eps, min_samples=min_samples)
        clusters = model.fit_predict(scaled_data)

    elif method == "Gaussian Mixture":
        model = GaussianMixture(n_components=n_clusters, random_state=42)
        clusters = model.fit_predict(scaled_data)

    # Add cluster labels
    df["Cluster"] = clusters
    unique_clusters = sorted(set(clusters))
    labels = {c: f"Cluster {c}" if c != -1 else "Noise" for c in unique_clusters}
    df["Cluster_Label"] = df["Cluster"].map(labels)

    # Compute silhouette score if valid
    silhouette = None
    if len(set(clusters)) > 1 and -1 not in set(clusters):
        try:
            silhouette = silhouette_score(scaled_data, clusters)
        except Exception:
            silhouette = None

    # Show metrics
    if silhouette is not None:
        st.metric(label="Silhouette Score", value=round(silhouette, 3))
    st.success(f"✅ Clustering complete using {method}!")

    # Tabs for results
    tab1, tab2, tab3, tab4, tab5 = st.tabs([
        "🎨 PCA Visualizations", 
        "📊 Distribution", 
        "📈 Elbow Method (KMeans only)", 
        "🔗 Pair Plot", 
        "🗂 Data Preview"
    ])

    # =========================
    # PCA Tab
    # =========================
    with tab1:
        st.subheader("PCA Visualizations")
        col1, col2 = st.columns(2)

        # PCA 2D
        pca_2d = PCA(n_components=2).fit_transform(scaled_data)
        fig, ax = plt.subplots()
        for label in unique_clusters:
            ax.scatter(
                pca_2d[df["Cluster"] == label, 0],
                pca_2d[df["Cluster"] == label, 1],
                label=labels[label]
            )
        ax.legend()
        ax.set_title("PCA - 2D Projection")
        col1.pyplot(fig)

        # PCA 3D
        pca_3d = PCA(n_components=3).fit_transform(scaled_data)
        fig = plt.figure()
        ax = fig.add_subplot(111, projection='3d')
        for label in unique_clusters:
            ax.scatter(
                pca_3d[df["Cluster"] == label, 0],
                pca_3d[df["Cluster"] == label, 1],
                pca_3d[df["Cluster"] == label, 2],
                label=labels[label]
            )
        ax.set_title("PCA - 3D Projection")
        ax.legend()
        col2.pyplot(fig)

    # =========================
    # Distribution Tab
    # =========================
    with tab2:
        st.subheader("Cluster Distribution")
        cluster_counts = df["Cluster_Label"].value_counts()

        col1, col2 = st.columns(2)

        # Pie Chart
        fig, ax = plt.subplots()
        ax.pie(cluster_counts, labels=cluster_counts.index, autopct='%1.1f%%', startangle=140, colors=plt.cm.Set3.colors)
        ax.set_title("Customer Distribution (Pie Chart)")
        col1.pyplot(fig)

        # Bar Chart
        fig, ax = plt.subplots()
        ax.bar(cluster_counts.index, cluster_counts.values, color=plt.cm.Set3.colors)
        ax.set_title("Customer Count per Cluster")
        ax.set_xticks(range(len(cluster_counts.index)))
        ax.set_xticklabels(cluster_counts.index, rotation=20)
        col2.pyplot(fig)

    # =========================
    # Elbow Method Tab
    # =========================
    with tab3:
        if method == "KMeans":
            st.subheader("Elbow Method")
            sse = []
            for k in range(1, 11):
                km = KMeans(n_clusters=k, n_init=10, random_state=42)
                km.fit(scaled_data)
                sse.append(km.inertia_)
            fig, ax = plt.subplots()
            ax.plot(range(1, 11), sse, marker='o', linestyle='--', color="blue")
            ax.set_xlabel("Number of Clusters (k)")
            ax.set_ylabel("SSE")
            ax.set_title("Elbow Curve")
            st.pyplot(fig)
        else:
            st.info("Elbow method is only applicable for KMeans.")

    # =========================
    # Pair Plot Tab
    # =========================
    with tab4:
        st.subheader("Pair Plot of Features")
        plot_data = df_numeric.copy()
        plot_data["Cluster"] = df["Cluster"].astype(str)

        # Limit to avoid heavy plots
        if plot_data.shape[0] > 500:
            st.warning("Dataset too large, showing sample of 500 rows for pair plot.")
            plot_data = plot_data.sample(n=500, random_state=42)

        pairplot_fig = sns.pairplot(plot_data, hue="Cluster", palette="Set2", diag_kind="hist")
        st.pyplot(pairplot_fig.figure)

    # =========================
    # Data Preview Tab
    # =========================
    with tab5:
        st.subheader("Clustered Data Sample")
        st.dataframe(df.head(20), use_container_width=True)

        # Download button
        csv = df.to_csv(index=False).encode("utf-8")
        st.download_button("⬇️ Download Clustered Data", csv, "clustered_customers.csv", "text/csv")
