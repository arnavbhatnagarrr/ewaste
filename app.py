import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client

# ---------------- Load environment variables ---------------- #
from dotenv import load_dotenv
load_dotenv()

# ---------------- Create Flask App ---------------- #
app = Flask(__name__)
CORS(app)

# ---------------- Supabase connection ---------------- #
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise Exception("Missing Supabase credentials in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ---------------- ROUTES ---------------- #

@app.route("/")
def home():
    return {
        "status": "Pavitra Foundation API is running 🚀"
    }


# ---------------- CONTACT FORM API ---------------- #
@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()

        # -------- Validate input -------- #
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        user_type = data.get("type", "")
        message = data.get("message", "").strip()

        if not name:
            return {"success": False, "error": "Name is required"}, 400

        if not email:
            return {"success": False, "error": "Email is required"}, 400

        if not message:
            return {"success": False, "error": "Message is required"}, 400

        # -------- Insert into Supabase -------- #
        new_entry = {
            "name": name,
            "email": email,
            "type": user_type,
            "message": message
        }

        res = supabase.table("contacts").insert(new_entry).execute()

        return {
            "success": True,
            "data": res.data
        }, 201

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }, 500


# ---------------- OPTIONAL: GET ALL CONTACTS ---------------- #
@app.route("/api/contact", methods=["GET"])
def get_contacts():
    res = supabase.table("contacts").select("*").order("id", desc=True).execute()

    return {
        "contacts": res.data
    }


# ---------------- Run App ---------------- #
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)