from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

@app.route("/search", methods=["POST"])
def search():
    data = request.json

    latitude = data["latitude"]
    longitude = data["longitude"]
    keyword = data["keyword"]

    url = (
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        f"?location={latitude},{longitude}"
        f"&radius=5000"
        f"&keyword={keyword}"
        f"&key={GOOGLE_API_KEY}"
    )

    response = requests.get(url)
    result = response.json()

    places = []

    for item in result.get("results", []):
        places.append({
            "name": item.get("name"),
            "address": item.get("vicinity"),
            "rating": item.get("rating")
        })

    return jsonify({"results": places})

if __name__ == "__main__":
    app.run(debug=True)