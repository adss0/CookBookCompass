import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

df = pd.read_csv('data/epi_r.csv')

# Preprocess the data
def preprocess_data(df):
    # Drop rows with missing calorie values
    df = df.dropna(subset=['calories'])
    
    # Add a 'calorie_category' column
    df['calorie_category'] = pd.cut(df['calories'], bins=[0, 300, 600, float('inf')], labels=['low', 'medium', 'high'])
    
    # Combine ingredient flags into a single text column
    ingredient_columns = [col for col in df.columns if col not in ['title', 'rating', 'calories', 'protein', 'fat', 'sodium', 'calorie_category']]
    df['ingredients'] = df.apply(lambda row: ' '.join([col for col in ingredient_columns if row[col] == 1]), axis=1)
    
    return df

# Rule-based recommendations
def recommend_recipes(bmi_category, df):
    if bmi_category == 'underweight':
        return df[df['calorie_category'] == 'high']
    elif bmi_category == 'healthy':
        return df[df['calorie_category'] == 'medium']
    elif bmi_category == 'overweight':
        return df[df['calorie_category'] == 'low']
    else:
        return df  # Default to all recipes

# Content-based recommendations
def recommend_similar_recipes(recipe_index, df, top_n=5):
    # Vectorize ingredients
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df['ingredients'])
    
    # Calculate similarity matrix
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # Get similar recipes
    sim_scores = list(enumerate(cosine_sim[recipe_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]  # Exclude the recipe itself
    recipe_indices = [i[0] for i in sim_scores]
    return df.iloc[recipe_indices]

# Preprocess the dataset
df = preprocess_data(df)
if __name__ == '__main__':
    print(df.head())