from flask import Flask, request, jsonify
from flask_cors import CORS
import main as re

app = Flask(__name__)
CORS(app) 

# Endpoint for rule-based recommendations
@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    bmi_category = request.args.get('bmi_category')
    if not bmi_category:
        return jsonify({'error': 'BMI category is required'}), 400

    # Get recommendations based on BMI category
    recommendations = re.recommend_recipes(bmi_category, re.df)
    return jsonify(recommendations[['title', 'calories', 'calorie_category']].to_dict(orient='records'))

# Endpoint for content-based recommendations
@app.route('/api/similar_recipes', methods=['GET'])
def get_similar_recipes():
    recipe_index = request.args.get('recipe_index', type=int)
    if recipe_index is None:
        return jsonify({'error': 'recipe_index is required'}), 400

    # Get similar recipes
    similar_recipes = re.recommend_similar_recipes(recipe_index, re.df)
    return jsonify(similar_recipes[['title', 'calories', 'calorie_category']].to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)