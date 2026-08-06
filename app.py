from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    }), 200


@app.route("/submit-business", methods=["POST"])
def submit_business():
    data = request.form

    business_data = {
        "business_name": data.get("business_name"),
        "category": data.get("category"),
        "subcategory": data.get("subcategory"),
        "description": data.get("description"),
        "years": data.get("years"),
        "employees": data.get("employees"),
        "website": data.get("website")
    }

    uploaded_files = []

    files = request.files.getlist("images")

    for file in files:
        if file.filename:
            filename = secure_filename(file.filename)
            path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(path)
            uploaded_files.append(filename)

    return jsonify({
        "status": "success",
        "business": business_data,
        "files": uploaded_files
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)